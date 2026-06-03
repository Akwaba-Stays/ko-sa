// ─────────────────────────────────────────────────────────────────────────────
// KO-SA pricing & bookable-content config (Website Change Request, June 2026)
//
// ⚠️  PLACEHOLDER RATES — CONFIRM WITH KO-SA BEFORE GO-LIVE.
// The Change Request requires a visible "From GHS X" on every room, package,
// treatment and experience. The resort's live rates were not available in the
// repo (rooms seed ships price: 0, "price hidden → Cloudbeds"), so the figures
// below are realistic, clearly-marked PLACEHOLDERS. They are intentionally
// centralised here so the real numbers can be dropped in one place.
//
// To go live with real pricing:
//   1. Replace the GHS amounts below with Ko-Sa's confirmed starting rates.
//   2. (Optional) wire ROOM_RATES_GHS to Cloudbeds live rates instead.
//
// Safe to import from both server and client components (no server-only deps).
// ─────────────────────────────────────────────────────────────────────────────

import { site } from '@/lib/site';

export const PRICING_CURRENCY = 'GHS';

/** Format a GHS amount as e.g. "GHS 1,850" (no decimals). */
export function formatGhs(amount: number): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: PRICING_CURRENCY,
    maximumFractionDigits: 0,
  })
    .format(amount)
    // Normalise the symbol to the ISO code the brief uses ("GHS 1,850").
    .replace(/^GH₵\s?/, 'GHS ');
}

// ── Room starting rates (GHS / night) ───────────────────────────────────────
// Keyed by room slug (see scripts/seed-kosa-rooms.ts). PLACEHOLDER values.
export const ROOM_RATES_GHS: Record<string, number> = {
  'luxury-double-sea-view': 1850,
  'deluxe-double-sea-view': 1450,
  'deluxe-twin-sea-view': 1450,
  'family-room-private-bathroom': 1650,
  'triple-room-private-bathroom': 1250,
  'double-room-garden-view': 980,
  'twin-room-garden-view': 980,
  'traveling-palm-double-garden': 680,
  'traveling-palm-twin-garden': 680,
};

/** Lowest fallback so a room without an explicit rate still shows a price. */
const ROOM_RATE_FALLBACK_GHS = 680;

/**
 * Starting nightly rate in GHS for a room. Prefers a live DB price when one is
 * set (> 0), then the per-slug placeholder, then a safe fallback.
 */
export function roomStartingRateGhs(slug: string, dbPrice?: number): number {
  if (typeof dbPrice === 'number' && dbPrice > 0) return dbPrice;
  return ROOM_RATES_GHS[slug] ?? ROOM_RATE_FALLBACK_GHS;
}

/** "From GHS 1,850 per night" for a room card. */
export function roomFromPerNight(slug: string, dbPrice?: number): string {
  return `From ${formatGhs(roomStartingRateGhs(slug, dbPrice))} per night`;
}

// ── Sample-itinerary packages (home + plan) ─────────────────────────────────
export type PackageKey = 'weekend' | 'short' | 'full';

export const PACKAGES: Record<
  PackageKey,
  { nights: number; fromGhs: number; inclusions: string }
> = {
  weekend: {
    nights: 2,
    fromGhs: 2400,
    inclusions: 'welcome drink, daily breakfast, one spa treatment',
  },
  short: {
    nights: 4,
    fromGhs: 4600,
    inclusions: 'welcome drink, daily breakfast, one excursion',
  },
  full: {
    nights: 7,
    fromGhs: 7900,
    inclusions: 'all of the above plus one private beach dinner',
  },
};

/** e.g. "Book 2 nights from GHS 2,400 — welcome drink, daily breakfast, one spa treatment" */
export function packageLine(key: PackageKey): string {
  const p = PACKAGES[key];
  return `Book ${p.nights} nights from ${formatGhs(p.fromGhs)} - ${p.inclusions}`;
}

// ── Spa treatments (fallback list when the CMS has none) ─────────────────────
// durationMin + GHS price. Names mirror the existing dictionary treatment keys.
export type TreatmentSeed = {
  slug: string;
  name: string;
  durationMin: number;
  priceGhs: number;
  category?: string;
};

export const TREATMENTS_FALLBACK: TreatmentSeed[] = [
  { slug: 'atlantic-salt-scrub', name: 'Atlantic Salt Scrub', durationMin: 60, priceGhs: 380, category: 'Body' },
  { slug: 'palm-oil-deep-tissue', name: 'Palm Oil Deep Tissue', durationMin: 90, priceGhs: 520, category: 'Massage' },
  { slug: 'shea-honey-wrap', name: 'Shea & Honey Wrap', durationMin: 75, priceGhs: 460, category: 'Body' },
  { slug: 'sound-bath', name: 'Sound Bath by the Sea', durationMin: 60, priceGhs: 350, category: 'Mind' },
  { slug: 'kente-crystal', name: 'Kente Crystal Healing', durationMin: 75, priceGhs: 420, category: 'Energy' },
  { slug: 'coastal-yoga', name: 'Coastal Yoga (Group)', durationMin: 60, priceGhs: 180, category: 'Movement' },
];

/** PLACEHOLDER treatment price by slug; falls back to a sensible default. */
export function treatmentPriceGhs(slug: string, dbPrice?: number): number {
  if (typeof dbPrice === 'number' && dbPrice > 0) return dbPrice;
  return TREATMENTS_FALLBACK.find((t) => t.slug === slug)?.priceGhs ?? 350;
}

// ── Signature experiences (duration + GHS per person) ────────────────────────
// Keyed to the dictionary "experiencesPage.signature.*" tiles.
export const EXPERIENCE_DETAILS: Record<string, { duration: string; fromGhs: number }> = {
  ampenyi: { duration: 'Half day · 3 hours', fromGhs: 180 },
  turtle: { duration: 'Evening · 2 hours', fromGhs: 150 },
  capeCoast: { duration: 'Full day · 8 hours', fromGhs: 550 },
  elmina: { duration: 'Half day · 4 hours', fromGhs: 420 },
  kakum: { duration: 'Full day · 8 hours', fromGhs: 600 },
  massage: { duration: '60 min', fromGhs: 380 },
  horse: { duration: '2 hours', fromGhs: 320 },
};

// ── WhatsApp helpers ─────────────────────────────────────────────────────────
/** Build a wa.me link with a pre-filled message. */
export function waLink(message: string): string {
  return `${site.socials.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const waPrefill = {
  treatment: (name: string) => `Hi Ko-Sa! I'd like to book a ${name}.`,
  experience: (name: string) => `Hi Ko-Sa! I'd like to book the ${name} experience.`,
  reserveTable: () =>
    "Hi Ko-Sa! I'd like to reserve a table for [date] at [time] for [number] people.",
  privateDining: () =>
    "Hi Ko-Sa! I'd like to enquire about private beach dining for a special occasion.",
  planMyStay: () => "Hi Ko-Sa! I'd like help planning my stay.",
  turtleWalk: () => 'Hi Ko-Sa! I’d like to ask about the sea turtle night walks.',
  customiseStay: () => "Hi Ko-Sa! I'd like to customise my stay.",
};
