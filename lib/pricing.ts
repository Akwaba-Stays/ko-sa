// ─────────────────────────────────────────────────────────────────────────────
// Ko Sa pricing & bookable-content config (Website Change Request, June 2026)
//
// ROOM_RATES_GHS below are Ko Sa's CONFIRMED starting nightly rates, taken from
// the resort's official "Rooms & Rates" sheet (files/Rooms-&-Rates.jpeg, June
// 2026). Centralised here so a future rate change is a one-place edit. A live DB
// price (> 0) on a room always overrides the value here.
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
// Keyed by room slug (see scripts/seed-kosa-rooms.ts). Confirmed rates from
// the official Rooms & Rates sheet (June 2026).
export const ROOM_RATES_GHS: Record<string, number> = {
  'luxury-double-sea-view': 1275,
  'deluxe-double-sea-view': 1425,
  'deluxe-twin-sea-view': 1275,
  'family-room-private-bathroom': 1575,
  'triple-room-private-bathroom': 1425,
  'double-room-garden-view': 825,
  'twin-room-garden-view': 825,
  'traveling-palm-double-garden': 450,
  'traveling-palm-twin-garden': 450,
};

/** Lowest fallback so a room without an explicit rate still shows a price. */
const ROOM_RATE_FALLBACK_GHS = 450;

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

/** e.g. "Book 2 nights from GHS 2,400 - welcome drink, daily breakfast, one spa treatment" */
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

// Real Ko Sa spa menu (used only if the CMS has no treatments). Mirrors the
// live data so the page never shows services the resort does not offer.
export const TREATMENTS_FALLBACK: TreatmentSeed[] = [
  { slug: 'deepcore-massage', name: 'Deepcore Massage', durationMin: 45, priceGhs: 350, category: 'Ko Sa Health Spa' },
  { slug: 'deepcore-massage-60', name: 'Deepcore Massage (60 min)', durationMin: 60, priceGhs: 400, category: 'Ko Sa Health Spa' },
  { slug: 'couples-massage', name: 'Couples Massage', durationMin: 45, priceGhs: 550, category: 'Ko Sa Health Spa' },
  { slug: 'couples-massage-60', name: 'Couples Massage (60 min)', durationMin: 60, priceGhs: 700, category: 'Ko Sa Health Spa' },
  { slug: 'swedish-massage', name: 'Swedish Massage', durationMin: 45, priceGhs: 300, category: 'Ko Sa Health Spa' },
  { slug: 'swedish-massage-60', name: 'Swedish Massage (60 min)', durationMin: 60, priceGhs: 350, category: 'Ko Sa Health Spa' },
  { slug: 'holistic-massage', name: 'Holistic Massage', durationMin: 45, priceGhs: 330, category: 'Ko Sa Health Spa' },
  { slug: 'holistic-massage-60', name: 'Holistic Massage (60 min)', durationMin: 60, priceGhs: 380, category: 'Ko Sa Health Spa' },
  { slug: 'reflexology', name: 'Reflexology', durationMin: 30, priceGhs: 200, category: 'Ko Sa Health Spa' },
  { slug: 'reflexology-45', name: 'Reflexology (45 min)', durationMin: 45, priceGhs: 250, category: 'Ko Sa Health Spa' },
  { slug: 'pedicure', name: 'Pedicure', durationMin: 45, priceGhs: 150, category: 'Ko Sa Health Spa' },
  { slug: 'herbal-detox-steam', name: 'Herbal Detox Steam Ritual', durationMin: 60, priceGhs: 264, category: 'O2 Wellness' },
  { slug: 'glow-polish-facial', name: 'Glow Polish Facial Ritual', durationMin: 60, priceGhs: 302, category: 'O2 Wellness' },
  { slug: 'full-body-glow-polish', name: 'Full Body Glow Polish', durationMin: 75, priceGhs: 672, category: 'O2 Wellness' },
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
  capeCoast: { duration: 'Full day · 8 hours', fromGhs: 550 },
  elmina: { duration: 'Half day · 4 hours', fromGhs: 420 },
  kakum: { duration: 'Full day · 8 hours', fromGhs: 600 },
  horse: { duration: '2 hours', fromGhs: 320 },
};

// ── WhatsApp helpers ─────────────────────────────────────────────────────────
/** Build a wa.me link with a pre-filled message. */
export function waLink(message: string): string {
  return `${site.socials.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const waPrefill = {
  treatment: (name: string) => `Hi Ko Sa! I'd like to book a ${name}.`,
  experience: (name: string) => `Hi Ko Sa! I'd like to book the ${name} experience.`,
  reserveTable: () =>
    "Hi Ko Sa! I'd like to reserve a table for [date] at [time] for [X] people.",
  privateDining: () =>
    "Hi Ko Sa! I'd like to enquire about private beach dining for a special occasion.",
  planMyStay: () => "Hi Ko Sa! I'd like help planning my stay.",
  turtleWalk: () => 'Hi Ko Sa! I’d like to ask about the sea turtle night walks.',
  customiseStay: () => "Hi Ko Sa! I'd like to customise my stay.",
};
