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

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [rooms, testimonials] = await Promise.all([
    listPublicRooms(),
    listPublicTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <SocialProof />
      <Feeling />
      <Itineraries />
      <RoomsTeaser rooms={rooms} />
      <Testimonials testimonials={testimonials} />
      <EmailCapture />
    </>
  );
}
