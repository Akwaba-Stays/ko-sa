import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { Experiences } from '@/components/home/Experiences';
import { Rooms } from '@/components/home/Rooms';
import { VirtualTourTeaser } from '@/components/home/VirtualTourTeaser';
import { Wellness } from '@/components/home/Wellness';
import { Cultural } from '@/components/home/Cultural';
import { Gallery } from '@/components/home/Gallery';
import { Testimonials } from '@/components/home/Testimonials';
import { BookingCTA } from '@/components/home/BookingCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Experiences />
      <Rooms />
      <VirtualTourTeaser />
      <Wellness />
      <Cultural />
      <Gallery />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
