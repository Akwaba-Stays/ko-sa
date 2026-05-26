// Server-side upload helpers write to Supabase Storage and record a row in
// `MediaAsset`. Browser code never imports this; it talks to /api/admin/upload.

import { randomBytes } from 'crypto';
import { uploadAsset } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';

const SAFE_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'application/pdf',
]);

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

  const path = buildPath(input.folder, input.filename);
  const buffer = Buffer.from(await input.file.arrayBuffer());
  const result = await uploadAsset(path, buffer, input.contentType);
  if ('error' in result) {
    throw Object.assign(new Error(result.error), { status: 500 });
  }

  const asset = await prisma.mediaAsset.create({
    data: {
      path,
      url: result.url,
      bucket: process.env.SUPABASE_STORAGE_BUCKET || 'kosa-public',
      filename: sanitizeFilename(input.filename),
      mimeType: input.contentType,
      size: input.size,
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
