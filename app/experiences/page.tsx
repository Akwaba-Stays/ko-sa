import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/shared/PageHero';
import { experiences } from '@/lib/content/home';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { getT } from '@/lib/i18n/server';
import type { DictKey } from '@/lib/i18n/dictionaries';

export const metadata: Metadata = {
  title: 'Experiences',
  description:
    'Wellness, ocean activities, cultural rituals and editorial dining curated experiences at KO-SA Beach Resort, Elmina.',
};

export default function ExperiencesPage() {
  const { t } = getT();
  return (
    <>
      <PageHero
        eyebrow={t('experiences.eyebrow')}
        title={t('nav.experiences')}
        subtitle={t('experiences.blurb')}
        image="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=2000"
      />
      <section className="py-20 md:py-28 bg-bg-orange">
        <div className="container-page space-y-20">
          {experiences.map((e, i) => {
            const title = t(`experiences.${e.slug}.title` as DictKey);
            const label = t(`experiences.${e.slug}.label` as DictKey);
            const description = t(`experiences.${e.slug}.description` as DictKey);
            return (
              <article
                key={e.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="lg:col-span-7 branded-img relative aspect-[16/10] overflow-hidden rounded-sm">
                  <Image src={e.image} alt={title} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
                </div>
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 text-primary">
                    <AdinkraIcon name={e.adinkra} size={28} />
                    <span className="font-poppins uppercase tracking-tracked text-xs">{label}</span>
                  </div>
                  <h2 className="mt-4 font-belleza text-display-sm text-umber">{title}</h2>
                  <p className="mt-4 text-umber/75 leading-relaxed">{description}</p>
                  <Link
                    href={`/experiences/${e.slug}`}
                    className="mt-6 inline-block font-poppins text-xs uppercase tracking-tracked text-primary border-b border-primary/60 pb-0.5 hover:text-umber hover:border-umber"
                  >
                    {t('experiences.discover')} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
