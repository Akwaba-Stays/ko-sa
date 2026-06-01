// Seed the real KO-SA Beach Resort room inventory into the CMS, with the
// owner's own high-res room photography (files/Kosa-Images/Rooms/*) optimized to
// WebP and stored in Supabase Storage.
//
// Folder → room mapping (from visual review of the owner's sorted photos):
//   Room A         → Sea View Honeymoon Chalet (cosy, decorated double)
//   Room C         → Sea View Family Chalet     (double + extra beds)
//   Room B         → Sea View Standard Chalet   (spacious, A/C)
//   Room D         → Garden Chalet              (double, garden side)
//   Room E         → Standard Room              (twin)
//   Rooms(Others)  → Budget Room + Dormitory    (simple doubles / twin)
//
// Copy follows the owner's Website Content Brief voice. Every room is fully
// editable afterwards at /admin/rooms and renders on the public site from the DB.
//
// Idempotent: upserts each Room by slug, removes any room not in this set, and
// upserts each image by storage path. Safe to re-run.
//
//   npm run seed:rooms

import './_env';
import fs from 'node:fs';
import path from 'node:path';
import { prisma } from '../lib/prisma';
import { getSupabaseAdmin } from '../lib/supabase';
import { ingestLocalImage } from './lib/ingest';

const ROOMS_DIR = 'files/Kosa-Images/Rooms';

type SeedRoom = {
  slug: string;
  name: string;
  category: 'SUITE' | 'PALM_SIDE' | 'BEACH_VIEW' | 'BUNGALOW' | 'VILLA';
  price: number; // EUR/night (stored, hidden on the public site)
  maxGuests: number;
  bedConfig: string;
  tagline: string;
  description: string;
  amenities: string[];
  features: string[];
  srcDir: string; // folder under ROOMS_DIR
  files?: string[]; // specific filenames; otherwise all (capped by `take`)
  take?: number;
  translations: Record<string, { name?: string; tagline?: string }>;
};

const ROOMS: SeedRoom[] = [
  {
    slug: 'sea-view-honeymoon-chalet',
    name: 'Sea View Honeymoon Chalet',
    category: 'SUITE',
    price: 110,
    maxGuests: 2,
    bedConfig: 'One double bed',
    tagline: 'Just the two of you, and the tide',
    description:
      'A private beachfront chalet made for closeness. Wake to the sea, watch the sun fall into it, and let the days go slow',
    amenities: ['Air-conditioning', 'Ceiling fan', 'Private bathroom', 'Hot shower', 'Mosquito net', 'Private terrace', 'Sea view'],
    features: ['Beachfront', 'For two'],
    srcDir: 'Room A',
    take: 6,
    translations: {
      fr: { name: 'Chalet lune de miel vue mer', tagline: 'Rien que vous deux, et la marée.' },
      es: { name: 'Chalet luna de miel con vista al mar', tagline: 'Solo ustedes dos y la marea.' },
      de: { name: 'Honeymoon-Chalet mit Meerblick', tagline: 'Nur ihr beide und die Gezeiten.' },
      nl: { name: 'Huwelijksreischalet met zeezicht', tagline: 'Alleen jullie twee en het tij.' },
    },
  },
  {
    slug: 'sea-view-family-chalet',
    name: 'Sea View Family Chalet',
    category: 'VILLA',
    price: 130,
    maxGuests: 4,
    bedConfig: 'One double bed + additional beds',
    tagline: 'Room to breathe, together',
    description:
      'Our most spacious beachfront chalet, with room for the whole family. The Atlantic is your front garden, and the children will never forget it',
    amenities: ['Air-conditioning', 'Ceiling fan', 'Private bathroom', 'Hot shower', 'Mosquito net', 'Private terrace', 'Sea view'],
    features: ['Beachfront', 'Family-friendly', 'Self-contained'],
    srcDir: 'Room C',
    translations: {
      fr: { name: 'Chalet familial vue mer', tagline: "De l'espace pour respirer, ensemble." },
      es: { name: 'Chalet familiar con vista al mar', tagline: 'Espacio para respirar, en familia.' },
      de: { name: 'Familien-Chalet mit Meerblick', tagline: 'Raum zum Atmen, gemeinsam.' },
      nl: { name: 'Familiechalet met zeezicht', tagline: 'Ruimte om te ademen, samen.' },
    },
  },
  {
    slug: 'sea-view-standard-chalet',
    name: 'Sea View Standard Chalet',
    category: 'BEACH_VIEW',
    price: 95,
    maxGuests: 2,
    bedConfig: 'One double bed',
    tagline: 'Wake where the waves begin',
    description:
      'A bright, comfortable chalet on the beachfront. Step off your terrace and the ocean is already there',
    amenities: ['Air-conditioning', 'Ceiling fan', 'Private bathroom', 'Hot shower', 'Mosquito net', 'Private terrace', 'Sea view'],
    features: ['Beachfront'],
    srcDir: 'Room B',
    take: 6,
    translations: {
      fr: { name: 'Chalet standard vue mer', tagline: 'Réveillez-vous où naissent les vagues.' },
      es: { name: 'Chalet estándar con vista al mar', tagline: 'Despierta donde nacen las olas.' },
      de: { name: 'Standard-Chalet mit Meerblick', tagline: 'Erwache, wo die Wellen beginnen.' },
      nl: { name: 'Standaardchalet met zeezicht', tagline: 'Word wakker waar de golven beginnen.' },
    },
  },
  {
    slug: 'garden-chalet',
    name: 'Garden Chalet',
    category: 'BUNGALOW',
    price: 75,
    maxGuests: 2,
    bedConfig: 'One double bed',
    tagline: 'Garden-facing calm for those who came to be still',
    description:
      'Tucked among the palms and bougainvillea, a short barefoot walk from the beach. Shade, birdsong, and the quiet you didn’t realise you needed',
    amenities: ['Ceiling fan', 'Private bathroom', 'Hot shower', 'Mosquito net', 'Garden setting'],
    features: ['Garden', 'Standalone'],
    srcDir: 'Room D',
    translations: {
      fr: { name: 'Chalet jardin', tagline: 'Le calme du jardin, pour qui vient se poser.' },
      es: { name: 'Chalet jardín', tagline: 'La calma del jardín, para quien viene a calmarse.' },
      de: { name: 'Garten-Chalet', tagline: 'Gartenruhe für alle, die zur Ruhe kommen wollen.' },
      nl: { name: 'Tuinchalet', tagline: 'Tuinrust voor wie tot stilstand wil komen.' },
    },
  },
  {
    slug: 'standard-room',
    name: 'Standard Room',
    category: 'PALM_SIDE',
    price: 55,
    maxGuests: 2,
    bedConfig: 'Twin beds (or double)',
    tagline: 'Simple comfort, wrapped in green',
    description:
      'A calm room among the gardens, a few steps from the sea. Everything you need, nothing you don’t',
    amenities: ['Ceiling fan', 'Private bathroom', 'Hot shower', 'Mosquito net'],
    features: ['Garden', 'Value'],
    srcDir: 'Room E',
    translations: {
      fr: { name: 'Chambre standard', tagline: 'Un confort simple, entouré de verdure.' },
      es: { name: 'Habitación estándar', tagline: 'Comodidad sencilla, rodeada de verde.' },
      de: { name: 'Standardzimmer', tagline: 'Schlichter Komfort, umgeben von Grün.' },
      nl: { name: 'Standaardkamer', tagline: 'Eenvoudig comfort, omringd door groen.' },
    },
  },
  {
    slug: 'budget-room',
    name: 'Budget Room',
    category: 'PALM_SIDE',
    price: 40,
    maxGuests: 2,
    bedConfig: 'Double bed',
    tagline: 'Light on the wallet, easy on the soul',
    description:
      'A clean, simple room for the unfussy traveller. Spend less time in your room and more by the water',
    amenities: ['Ceiling fan', 'Mosquito net', 'Private bathroom'],
    features: ['Value'],
    srcDir: 'Rooms(Others)',
    files: ['IMG_3384.jpeg', 'IMG_3385.jpeg', 'IMG_3460.jpeg'],
    translations: {
      fr: { name: 'Chambre économique', tagline: 'Léger pour le portefeuille, doux pour l’âme.' },
      es: { name: 'Habitación económica', tagline: 'Ligera para el bolsillo, suave para el alma.' },
      de: { name: 'Budget-Zimmer', tagline: 'Leicht für den Geldbeutel, gut für die Seele.' },
      nl: { name: 'Budgetkamer', tagline: 'Licht voor de portemonnee, goed voor de ziel.' },
    },
  },
  {
    slug: 'dormitory',
    name: 'Dormitory',
    category: 'PALM_SIDE',
    price: 20,
    maxGuests: 1,
    bedConfig: 'Shared room (price per bed)',
    tagline: 'Good company, by the sea',
    description:
      'A simple shared room the social heart of Ko-Sa. Perfect for backpackers and friends travelling far',
    amenities: ['Ceiling fan', 'Mosquito net', 'Shared bathroom'],
    features: ['Backpacker', 'Shared room', 'Per bed'],
    srcDir: 'Rooms(Others)',
    files: ['IMG_3491.jpeg', 'IMG_3461.jpeg'],
    translations: {
      fr: { name: 'Dortoir', tagline: 'De la bonne compagnie, au bord de la mer.' },
      es: { name: 'Dormitorio compartido', tagline: 'Buena compañía, junto al mar.' },
      de: { name: 'Schlafsaal', tagline: 'Gute Gesellschaft, am Meer.' },
      nl: { name: 'Slaapzaal', tagline: 'Goed gezelschap, aan zee.' },
    },
  },
];

function listFiles(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort();
}

/** Remove all previously-ingested room images (storage objects + MediaAsset rows). */
async function clearRoomMedia() {
  const old = await prisma.mediaAsset.findMany({
    where: { folder: { startsWith: 'rooms/' } },
    select: { path: true },
  });
  if (!old.length) return;
  const client = getSupabaseAdmin();
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'kosa-public';
  if (client) {
    await client.storage.from(bucket).remove(old.map((o) => o.path));
  }
  await prisma.mediaAsset.deleteMany({ where: { folder: { startsWith: 'rooms/' } } });
  console.log(`Cleared ${old.length} previous room image(s) from storage.`);
}

async function main() {
  const keepSlugs = ROOMS.map((r) => r.slug);
  let sortOrder = 0;

  await clearRoomMedia();

  for (const room of ROOMS) {
    const dir = path.join(ROOMS_DIR, room.srcDir);
    const files = (room.files ?? listFiles(dir)).slice(0, room.take ?? 99);
    console.log(`\n${room.name} (${room.srcDir}): ingesting ${files.length} image(s)…`);

    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const asset = await ingestLocalImage(path.join(dir, files[i]), {
        folder: `rooms/${room.slug}`,
        name: `${i}-${path.parse(files[i]).name}`,
        alt: `${room.name} KO-SA Beach Resort`,
        maxEdge: 2200,
        quality: 82,
      });
      urls.push(asset.url);
      process.stdout.write(`  ✓ ${asset.width}x${asset.height}\n`);
    }

    const data = {
      name: room.name,
      tagline: room.tagline,
      category: room.category,
      description: room.description,
      price: room.price,
      currency: 'EUR',
      maxGuests: room.maxGuests,
      bedConfig: room.bedConfig,
      image: urls[0] ?? null,
      gallery: urls,
      amenities: room.amenities,
      features: room.features,
      status: 'PUBLISHED' as const,
      sortOrder: sortOrder++,
      translations: room.translations,
    };

    await prisma.room.upsert({
      where: { slug: room.slug },
      update: data,
      create: { slug: room.slug, ...data },
    });
    console.log(`  → upserted "${room.slug}" with ${urls.length} image(s).`);
  }

  // Remove any prior images for these rooms that we no longer reference, plus
  // stale rooms not in this set.
  const removed = await prisma.room.deleteMany({ where: { slug: { notIn: keepSlugs } } });
  console.log(`\nRemoved ${removed.count} stale room(s).`);
  const total = await prisma.room.count();
  console.log(`Done. ${total} rooms in the database.`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('FAILED:', e);
    process.exit(1);
  });
