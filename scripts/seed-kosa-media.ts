// Seed the public Gallery (and Supabase Storage) with the owner's own KO-SA
// photography: Spa, Food & Drinks, Highlights, Randoms (from files/Kosa-Images),
// plus the room imagery already ingested by `seed:rooms`.
//
//   npm run seed:media
//
// Idempotent: resets the gallery, clears the gallery/* storage prefix, then
// re-ingests. Safe to re-run after `seed:rooms`.

import './_env';
import fs from 'node:fs';
import path from 'node:path';
import { prisma } from '../lib/prisma';
import { getSupabaseAdmin } from '../lib/supabase';
import { ingestLocalImage } from './lib/ingest';

const ROOT = 'files/Kosa-Images';

const CATEGORIES: { dir: string; category: string; caption: string; cap: number }[] = [
  { dir: 'Highlights', category: 'beach', caption: 'KO-SA Beach Resort', cap: 31 },
  { dir: 'Randoms', category: 'resort', caption: 'Life at KO-SA', cap: 24 },
  { dir: 'Food & Drinks', category: 'dining', caption: 'Fresh from the coast', cap: 18 },
  { dir: 'Spa', category: 'wellness', caption: 'Well-being, the KO-SA way', cap: 8 },
];

function listFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
}

async function clearGalleryStorage() {
  const old = await prisma.mediaAsset.findMany({
    where: { folder: { startsWith: 'gallery/' } },
    select: { path: true },
  });
  if (old.length) {
    const client = getSupabaseAdmin();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'kosa-public';
    if (client) await client.storage.from(bucket).remove(old.map((o) => o.path));
    await prisma.mediaAsset.deleteMany({ where: { folder: { startsWith: 'gallery/' } } });
  }
}

async function main() {
  await prisma.galleryItem.deleteMany({});
  await clearGalleryStorage();
  console.log('Gallery reset.');

  let sortOrder = 0;

  // 1. Categorised lifestyle photography.
  for (const c of CATEGORIES) {
    const dir = path.join(ROOT, c.dir);
    const files = listFiles(dir).slice(0, c.cap);
    console.log(`\n${c.dir} → "${c.category}": ${files.length} image(s)…`);
    for (let i = 0; i < files.length; i++) {
      const asset = await ingestLocalImage(path.join(dir, files[i]), {
        folder: `gallery/${c.category}`,
        name: `${i}-${path.parse(files[i]).name}`,
        alt: `${c.caption} KO-SA Beach Resort`,
        maxEdge: 2200,
        quality: 82,
      });
      await prisma.galleryItem.create({
        data: {
          imageUrl: asset.url,
          alt: `${c.caption} KO-SA Beach Resort`,
          caption: c.caption,
          category: c.category,
          width: asset.width,
          height: asset.height,
          status: 'PUBLISHED',
          sortOrder: sortOrder++,
        },
      });
      process.stdout.write(`  ✓ ${asset.width}x${asset.height}\n`);
    }
  }

  // 2. Mirror the already-ingested room imagery (category "rooms").
  const roomAssets = await prisma.mediaAsset.findMany({
    where: { folder: { startsWith: 'rooms/' } },
    orderBy: [{ folder: 'asc' }, { path: 'asc' }],
  });
  console.log(`\nMirroring ${roomAssets.length} room image(s) into the gallery…`);
  for (const a of roomAssets) {
    await prisma.galleryItem.create({
      data: {
        imageUrl: a.url,
        alt: a.alt ?? 'KO-SA Beach Resort room',
        caption: 'Rooms & Chalets',
        category: 'rooms',
        width: a.width,
        height: a.height,
        status: 'PUBLISHED',
        sortOrder: sortOrder++,
      },
    });
  }

  const total = await prisma.galleryItem.count();
  console.log(`\nDone. ${total} gallery items (real KO-SA photography).`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('FAILED:', e);
    process.exit(1);
  });
