import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { Wellness } from '@/components/home/Wellness';

export const metadata: Metadata = {
  title: 'Wellness · Spa & Yoga',
  description:
    'Atlantic salt scrubs, palm-oil massages, sound baths and yoga by the sea wellness rituals at KO-SA Beach Resort.',
};

export default function WellnessPage() {
  return (
    <>
      <PageHero
        eyebrow="The Spa & Yoga"
        title="Simply, Breathe."
        subtitle="Rituals of return to the body, the breath, the shoreline."
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000"
      />
      <Wellness />
    </>
  );
}
