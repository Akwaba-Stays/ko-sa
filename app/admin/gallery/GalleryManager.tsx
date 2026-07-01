'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Upload, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/admin/Button';
import { useToast } from '@/components/admin/Toast';
import { StatusBadge } from '@/components/admin/DataTable';
import { uploadMedia } from '@/lib/admin/uploadMedia';

interface Item {
  id: string;
  imageUrl: string;
  caption: string | null;
  alt: string | null;
  category: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  sortOrder: number;
}

export function GalleryManager({ initial }: { initial: Item[] }) {
  const toast = useToast();
  const [items, setItems] = useState<Item[]>(initial);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [pasteUrl, setPasteUrl] = useState('');

  async function createFromUrl(url: string) {
    if (!url.trim()) return;
    setBusy(true);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          imageUrl: url,
          status: 'PUBLISHED',
          sortOrder: items.length,
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || 'Failed');
      setItems((s) => [...s, j.item]);
      toast.push('success', 'Image added');
    } catch (e) {
      toast.push('error', (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function uploadFiles(files: FileList) {
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        const { url } = await uploadMedia(file, { folder: 'gallery' });
        await createFromUrl(url);
      }
    } catch (e) {
      toast.push('error', (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function patch(id: string, patch: Partial<Item>) {
    setItems((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error('Failed');
    } catch (e) {
      toast.push('error', (e as Error).message);
    }
  }

  async function remove(id: string) {
    if (!confirm('Remove from gallery? The file stays in your media library.')) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      setItems((s) => s.filter((x) => x.id !== id));
      toast.push('success', 'Removed');
    } catch (e) {
      toast.push('error', (e as Error).message);
    }
  }

  async function move(id: string, dir: -1 | 1) {
    const idx = items.findIndex((x) => x.id === id);
    const target = idx + dir;
    if (idx === -1 || target < 0 || target >= items.length) return;
    const next = [...items];
    [next[idx], next[target]] = [next[target], next[idx]];
    setItems(next.map((x, i) => ({ ...x, sortOrder: i })));
    // Persist new sortOrder for the two affected rows
    await Promise.all([
      fetch(`/api/admin/gallery/${next[idx].id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sortOrder: idx }),
      }),
      fetch(`/api/admin/gallery/${next[target].id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ sortOrder: target }),
      }),
    ]);
  }

  return (
    <div className="space-y-6">
      <div className="bg-cream border border-warm-grey/40 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-stretch">
        <input
          value={pasteUrl}
          onChange={(e) => setPasteUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              createFromUrl(pasteUrl);
              setPasteUrl('');
            }
          }}
          placeholder="Paste image URL and press enter"
          className="flex-1 bg-bg-orange border border-warm-grey/30 rounded-md px-3 py-2 text-sm text-umber"
        />
        <Button
          type="button"
          onClick={() => {
            createFromUrl(pasteUrl);
            setPasteUrl('');
          }}
          disabled={busy}
        >
          <Plus size={14} /> Add by URL
        </Button>
        <Button type="button" variant="secondary" onClick={() => fileRef.current?.click()} disabled={busy}>
          <Upload size={14} /> Upload
        </Button>
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          ref={fileRef}
          onChange={(e) => {
            if (e.target.files?.length) uploadFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {items.length === 0 ? (
        <div className="bg-cream border border-warm-grey/40 rounded-md p-12 text-center text-umber/60 text-sm">
          No gallery images yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <article key={it.id} className="bg-cream border border-warm-grey/40 rounded-md overflow-hidden">
              <div className="relative aspect-[4/3] bg-sand-light">
                <Image src={it.imageUrl} alt={it.alt ?? it.caption ?? ''} fill sizes="400px" className="object-cover" />
              </div>
              <div className="p-4 space-y-3">
                <input
                  value={it.caption ?? ''}
                  onChange={(e) => patch(it.id, { caption: e.target.value || null })}
                  placeholder="Caption (optional)"
                  className="w-full bg-bg-orange border border-warm-grey/30 rounded px-3 py-1.5 text-sm"
                />
                <input
                  value={it.alt ?? ''}
                  onChange={(e) => patch(it.id, { alt: e.target.value || null })}
                  placeholder="Alt text (accessibility)"
                  className="w-full bg-bg-orange border border-warm-grey/30 rounded px-3 py-1.5 text-sm"
                />
                <input
                  value={it.category ?? ''}
                  onChange={(e) => patch(it.id, { category: e.target.value || null })}
                  placeholder="Category (e.g. rooms, beach)"
                  className="w-full bg-bg-orange border border-warm-grey/30 rounded px-3 py-1.5 text-xs"
                />
                <div className="flex flex-wrap items-center gap-2 justify-between">
                  <StatusBadge status={it.status} />
                  <div className="flex gap-1">
                    <Button type="button" size="sm" variant="secondary" onClick={() => move(it.id, -1)} disabled={i === 0}>
                      <ArrowUp size={12} />
                    </Button>
                    <Button type="button" size="sm" variant="secondary" onClick={() => move(it.id, 1)} disabled={i === items.length - 1}>
                      <ArrowDown size={12} />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        patch(it.id, { status: it.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED' })
                      }
                    >
                      {it.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button type="button" size="sm" variant="danger" onClick={() => remove(it.id)}>
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
