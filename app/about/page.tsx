import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/shared/PageHero';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { Cultural } from '@/components/home/Cultural';

export const metadata: Metadata = {
  title: 'About · Our Story',
  description: 'The story, philosophy and sustainability of KO-SA Beach Resort, Elmina eco-luxury, Ghanaian-rooted.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A house built by the shore, for those who return."
        image="https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-20 md:py-28 bg-bg-orange">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 max-w-prose">
            <p className="font-raleway text-lg leading-relaxed text-umber/85">
              KO-SA began as a small house on the Elmina coast. A family table, a few palms, the sound of
              the Atlantic. Over the years it became a place that returning friends asked to share, and so
              we widened the doors.
            </p>
            <p className="text-umber/75 leading-relaxed">
              We build with local timber and stone, weave with local hands, cook with local soil. Nothing
              about KO-SA is imported except, perhaps, the sense of pause our guests carry home.
            </p>
            <p className="font-beth text-3xl text-primary">Akwaaba you are welcome here.</p>
          </div>
          <div className="lg:col-span-5 branded-img relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=80&w=1400"
              alt="KO-SA founders welcoming guests"
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-umber text-cream">
        <div className="container-page max-w-3xl text-center">
          <AdinkraIcon name="denkyem" size={48} className="text-primary mx-auto mb-6" />
          <h2 className="font-belleza text-display-md">Sustainability</h2>
          <p className="mt-6 text-cream/80 leading-relaxed">
            Solar-augmented power, grey-water gardens, plastic-free guest amenities, and a kitchen sourced
            from farms within 40km. Our coastline cleanup happens twice weekly guests are invited.
          </p>
        </div>
      </section>

      <Cultural />
    </>
  );
}
