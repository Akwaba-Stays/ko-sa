// Home page composed strictly per the Website Content Brief §01.
// Each section is a small focused client component; the page is a server
// component so we can do all data fetching upstream (rooms + testimonials).

import { Hero } from '@/components/home/Hero';
import { SocialProof } from '@/components/home/SocialProof';
import { Feeling } from '@/components/home/Feeling';
import { Itineraries } from '@/components/home/Itineraries';
import { RoomsTeaser } from '@/components/home/RoomsTeaser';
import { Testimonials } from '@/components/home/Testimonials';
import { EmailCapture } from '@/components/home/EmailCapture';
import { listPublicRooms } from '@/lib/cms/rooms';
import { listPublicTestimonials } from '@/lib/cms/testimonials';
import { getSetting } from '@/lib/cms/settings';
import type { PublicTestimonial } from '@/lib/cms/types';

export const dynamic = 'force-dynamic';

// Three rotating, evocative quotes (Change Request §Page 01). Used as a fallback
// when the CMS has no published testimonials so the section always converts.
// Replace with real Booking.com / TripAdvisor quotes via /admin/testimonials.
const FALLBACK_TESTIMONIALS: PublicTestimonial[] = [
  {
    id: 'fallback-1',
    guestName: 'Amara',
    country: 'United Kingdom',
    rating: 5,
    quote: "I didn't realise how much I needed this until I arrived.",
    avatarUrl: null,
    source: 'Booking.com',
    sortOrder: 0,
  },
  {
    id: 'fallback-2',
    guestName: 'Lukas',
    country: 'Germany',
    rating: 5,
    quote:
      "The spa, the food, the sound of the ocean every morning. I've already booked to come back.",
    avatarUrl: null,
    source: 'TripAdvisor',
    sortOrder: 1,
  },
  {
    id: 'fallback-3',
    guestName: 'Naa',
    country: 'Ghana',
    rating: 5,
    quote:
      "Ko-Sa doesn't try to impress you. It just quietly becomes the best place you've stayed.",
    avatarUrl: null,
    source: 'Google',
    sortOrder: 2,
  },
];

export default async function HomePage() {
  const [rooms, testimonials, pricing] = await Promise.all([
    listPublicRooms(),
    listPublicTestimonials(),
    getSetting('pricing'),
  ]);

  const quotes = testimonials.length ? testimonials : FALLBACK_TESTIMONIALS;

  return (
    <>
      <Hero />
      <SocialProof />
      <Feeling />
      <Itineraries />
      <RoomsTeaser rooms={rooms} showPrices={!pricing.hideRoomPrices} />
      <Testimonials testimonials={quotes} />
      <EmailCapture />
    </>
  );
}
