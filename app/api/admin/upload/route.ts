// POST /api/admin/upload multipart form upload to Supabase Storage.
//
// Body: multipart/form-data with `file`, optional `folder`, optional `alt`.
// Response: { id, url, path, filename, mimeType, size }

import { NextResponse, type NextRequest } from 'next/server';
import { requireRole } from '@/lib/admin/auth';
import { handleUpload } from '@/lib/admin/upload';
import { badRequest, ok, serverError } from '@/lib/admin/response';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const guard = await requireRole(['OWNER', 'EDITOR']);
  if (guard instanceof NextResponse) return guard;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return badRequest('Invalid multipart payload');
  }

  const file = form.get('file');
  if (!(file instanceof Blob)) return badRequest('Missing file');
  const filename =
    (form.get('filename') as string | null)?.toString() ||
    (file instanceof File ? file.name : 'upload.bin');
  const folder = (form.get('folder') as string | null)?.toString() || undefined;
  const alt = (form.get('alt') as string | null)?.toString() || undefined;

  try {
    const result = await handleUpload({
      file,
      filename,
      contentType: file.type || 'application/octet-stream',
      size: file.size,
      folder,
      alt: alt ?? null,
      uploadedBy: guard.user.id,
    });
    return ok(result, 201);
  } catch (err) {
    const e = err as Error & { status?: number };
    if (e.status && e.status < 500) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return serverError(e.message);
  }
}
