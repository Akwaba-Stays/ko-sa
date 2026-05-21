import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _browser: SupabaseClient | null = null;
let _admin: SupabaseClient | null = null;

/** Browser-safe client (anon key). Safe to import in client components. */
export function getSupabaseBrowser(): SupabaseClient | null {
  if (_browser) return _browser;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _browser = createClient(url, key, { auth: { persistSession: true } });
  return _browser;
}

/** Server-only client (service-role). NEVER import in client components. */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (_admin) return _admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  _admin = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _admin;
}

/** Public URL for an object in the configured storage bucket. */
export function publicAssetUrl(path: string, bucket?: string): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const b = bucket || process.env.SUPABASE_STORAGE_BUCKET || 'kosa-public';
  if (!url) return null;
  const clean = path.replace(/^\/+/, '');
  return `${url}/storage/v1/object/public/${b}/${clean}`;
}

/**
 * Server-side upload helper. Returns the public URL on success.
 * Bucket must exist and be public, or use Storage policies for fine-grained access.
 */
export async function uploadAsset(
  path: string,
  data: Blob | ArrayBuffer | Buffer,
  contentType: string,
  bucket?: string,
): Promise<{ url: string } | { error: string }> {
  const client = getSupabaseAdmin();
  if (!client) return { error: 'Supabase admin not configured' };
  const b = bucket || process.env.SUPABASE_STORAGE_BUCKET || 'kosa-public';
  const { error } = await client.storage.from(b).upload(path, data, {
    contentType,
    upsert: true,
  });
  if (error) return { error: error.message };
  const url = publicAssetUrl(path, b);
  return url ? { url } : { error: 'Could not resolve public URL' };
}
