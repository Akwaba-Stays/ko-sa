// Server-side upload helpers write to Supabase Storage and record a row in
// `MediaAsset`. Browser code never imports this; it talks to /api/admin/upload.

import { randomBytes } from 'crypto';
import sharp from 'sharp';
import { uploadAsset } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';

const SAFE_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
  'image/heic',
  'image/heif',
  'video/mp4',
  'video/webm',
  'application/pdf',
]);

// Raster images we optimize to WebP on upload. (SVG/GIF kept as-is to preserve
// vectors/animation; video/pdf untouched.)
const OPTIMIZE_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/heic', 'image/heif']);

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB

export interface UploadInput {
  file: Blob | File;
  filename: string;
  contentType: string;
  size: number;
  folder?: string;
  alt?: string | null;
  uploadedBy?: string | null;
}

export interface UploadResult {
  id: string;
  url: string;
  path: string;
  filename: string;
  mimeType: string;
  size: number;
}

function sanitizeFilename(name: string): string {
  const stripped = name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-');
  return stripped.replace(/^-|-$/g, '').slice(0, 120) || 'file';
}

function buildPath(folder: string | undefined, filename: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const safe = sanitizeFilename(filename);
  const rand = randomBytes(4).toString('hex');
  const cleanFolder = (folder || 'uploads').replace(/(^\/+|\/+$)/g, '');
  return `${cleanFolder}/${today}/${rand}-${safe}`;
}

/**
 * Validate, persist to Supabase Storage, and create a MediaAsset row.
 */
export async function handleUpload(input: UploadInput): Promise<UploadResult> {
  if (!SAFE_MIME.has(input.contentType)) {
    throw Object.assign(new Error('Unsupported file type'), { status: 415 });
  }
  if (input.size <= 0) {
    throw Object.assign(new Error('Empty file'), { status: 400 });
  }
  if (input.size > MAX_BYTES) {
    throw Object.assign(new Error('File too large (max 25MB)'), { status: 413 });
  }

  let buffer: Buffer = Buffer.from(new Uint8Array(await input.file.arrayBuffer()));
  let contentType = input.contentType;
  let filename = sanitizeFilename(input.filename);
  let width: number | null = null;
  let height: number | null = null;

  // Optimize raster images → WebP, capped at 2200px long edge.
  if (OPTIMIZE_MIME.has(input.contentType)) {
    try {
      const out = await sharp(buffer, { failOn: 'none' })
        .rotate()
        .resize({ width: 2200, height: 2200, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 84 })
        .toBuffer({ resolveWithObject: true });
      buffer = Buffer.from(out.data);
      width = out.info.width;
      height = out.info.height;
      contentType = 'image/webp';
      filename = filename.replace(/\.[a-z0-9]+$/i, '') + '.webp';
    } catch {
      // HEIC is normally converted to JPEG in the browser before upload (see
      // lib/admin/heic.ts), so it rarely reaches here. If a raw HEIC still
      // arrives (e.g. JS disabled), the serverless runtime has no libheif
      // decoder - ask for JPEG/PNG rather than failing silently.
      if (input.contentType === 'image/heic' || input.contentType === 'image/heif') {
        throw Object.assign(
          new Error('This HEIC image could not be converted - please try again or upload a JPEG/PNG'),
          { status: 415 },
        );
      }
      // For other raster types, fall back to storing the original bytes.
    }
  }

  const path = buildPath(input.folder, filename);
  const result = await uploadAsset(path, buffer, contentType);
  if ('error' in result) {
    throw Object.assign(new Error(result.error), { status: 500 });
  }

  const asset = await prisma.mediaAsset.create({
    data: {
      path,
      url: result.url,
      bucket: process.env.SUPABASE_STORAGE_BUCKET || 'kosa-public',
      filename,
      mimeType: contentType,
      size: buffer.byteLength,
      width,
      height,
      alt: input.alt ?? null,
      folder: input.folder ?? null,
      uploadedBy: input.uploadedBy ?? null,
    },
  });

  return {
    id: asset.id,
    url: asset.url,
    path: asset.path,
    filename: asset.filename,
    mimeType: asset.mimeType,
    size: asset.size,
  };
}
