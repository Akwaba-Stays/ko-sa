import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/shared/PageHero';
import { Button } from '@/components/shared/Button';

export const metadata: Metadata = {
  title: 'Dining',
  description:
    'Open-fire West African cuisine, beachside breakfasts, and private dinners under the palms at KO-SA Beach Resort.',
};

const courses = [
  {
    title: 'The Hearth',
    desc: 'Open-fire mains: grouper, jollof, palm-oil glazed lamb, smoked plantain.',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'Sunrise Table',
    desc: 'Hibiscus tea, sourdough with shea butter, papaya, fonio porridge.',
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'The Beach Bar',
    desc: 'Palm wine spritz, hibiscus negroni, salt-rim cocktails, light shareables.',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=1400',
  },
];

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="A Coast on the Plate"
        title="Dining at KO-SA"
        subtitle="West African ingredients, editorial restraint. Stories told slowly across three settings."
        image="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000"
      />
      <section className="py-20 md:py-28 bg-bg-orange">
        <div className="container-page grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((c) => (
            <article key={c.title} className="bg-cream rounded-sm overflow-hidden shadow-sm">
              <div className="branded-img relative aspect-[4/3]">
                <Image src={c.image} alt={c.title} fill sizes="33vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h2 className="font-belleza text-2xl text-umber">{c.title}</h2>
                <p className="mt-2 text-sm text-umber/75 leading-relaxed">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="container-page mt-16 text-center">
          <Button href="/contact">Reserve a Private Beach Dinner</Button>
        </div>
      </section>
    </>
  );
}
