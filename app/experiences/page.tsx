import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/shared/PageHero';
import { experiences } from '@/lib/content/home';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';

export const metadata: Metadata = {
  title: 'Experiences',
  description:
    'Wellness, ocean activities, cultural rituals and editorial dining curated experiences at KO-SA Beach Resort, Elmina.',
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Curated Days"
        title="Experiences"
        subtitle="Four kinds of slow choose one, or weave them together."
        image="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=2000"
      />
      <section className="py-20 md:py-28 bg-bg-orange">
        <div className="container-page space-y-20">
          {experiences.map((e, i) => (
            <article
              key={e.slug}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}
            >
              <div className="lg:col-span-7 branded-img relative aspect-[16/10] overflow-hidden rounded-sm">
                <Image src={e.image} alt={e.title} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
              </div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 text-primary">
                  <AdinkraIcon name={e.adinkra} size={28} />
                  <span className="font-poppins uppercase tracking-tracked text-xs">{e.label}</span>
                </div>
                <h2 className="mt-4 font-belleza text-display-sm text-umber">{e.title}</h2>
                <p className="mt-4 text-umber/75 leading-relaxed">{e.description}</p>
                <Link
                  href={`/experiences/${e.slug}`}
                  className="mt-6 inline-block font-poppins text-xs uppercase tracking-tracked text-primary border-b border-primary/60 pb-0.5 hover:text-umber hover:border-umber"
                >
                  Explore →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
