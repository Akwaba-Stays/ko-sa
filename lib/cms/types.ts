// Shared CMS types and helpers that are safe to import from both server *and*
// client components. Nothing in here touches `next/headers`, Prisma, or the
// filesystem those live in their respective server-only modules.

export interface PublicRoom {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  category: string;
  description: string | null;
  price: number;
  currency: string;
  maxGuests: number;
  bedConfig: string | null;
  sizeSqm: number | null;
  image: string | null;
  gallery: string[];
  amenities: string[];
  features: string[];
  sortOrder: number;
}

const CATEGORY_TO_DISPLAY: Record<string, 'Suite' | 'Palm Side' | 'Beach View'> = {
  SUITE: 'Suite',
  PALM_SIDE: 'Palm Side',
  BEACH_VIEW: 'Beach View',
  VILLA: 'Suite',
  BUNGALOW: 'Beach View',
};

export function displayCategory(cat: string): 'Suite' | 'Palm Side' | 'Beach View' {
  return CATEGORY_TO_DISPLAY[cat] ?? 'Beach View';
}

export interface PublicTreatment {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  durationMin: number;
  price: number;
  currency: string;
  image: string | null;
  category: string | null;
  sortOrder: number;
}

export interface PublicExperience {
  id: string;
  slug: string;
  label: string;
  title: string;
  description: string;
  longBody: string | null;
  image: string | null;
  gallery: string[];
  adinkra: string | null;
  duration: string | null;
  sortOrder: number;
}

export interface PublicGalleryItem {
  id: string;
  imageUrl: string;
  caption: string | null;
  alt: string | null;
  category: string | null;
  width: number | null;
  height: number | null;
  sortOrder: number;
}

export interface PublicTestimonial {
  id: string;
  guestName: string;
  country: string | null;
  rating: number;
  quote: string;
  avatarUrl: string | null;
  source: string | null;
  sortOrder: number;
}
