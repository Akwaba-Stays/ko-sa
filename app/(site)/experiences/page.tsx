import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { listPublicExperiences } from '@/lib/cms/experiences';
import { AdinkraIcon, type AdinkraName } from '@/components/shared/AdinkraIcon';

export const metadata: Metadata = {
  title: 'Experiences & Activities',
  description:
    'Ghana begins here. On-property calm and guided journeys into Cape Coast, Elmina, Kakum and the fishing villages from KO-SA Beach Resort.',
};

export const dynamic = 'force-dynamic';

export default async function ExperiencesPage() {
  const { t } = getT();
  const experiences = await listPublicExperiences();

  return (
    <>
      <PageHero
        eyebrow={t('nav.experiences')}
        title={t('experiencesPage.headline')}
        image="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">
            {t('experiencesPage.intro')}
          </p>
        </div>
      </section>

      <section className="pb-12 bg-sand-light">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <article className="relative rounded-md overflow-hidden min-h-[320px] flex items-end branded-img">
            <Image
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1400"
              alt={t('experiencesPage.property.title')}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent" />
            <div className="relative p-8 text-cream">
              <h2 className="font-playfair text-2xl md:text-3xl">{t('experiencesPage.property.title')}</h2>
              <p className="mt-3 font-raleway text-cream/85 leading-relaxed">{t('experiencesPage.property.body')}</p>
            </div>
          </article>
          <article className="relative rounded-md overflow-hidden min-h-[320px] flex items-end branded-img">
            <Image
              src="https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=80&w=1400"
              alt={t('experiencesPage.ghana.title')}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent" />
            <div className="relative p-8 text-cream">
              <h2 className="font-playfair text-2xl md:text-3xl">{t('experiencesPage.ghana.title')}</h2>
              <p className="mt-3 font-raleway text-cream/85 leading-relaxed">{t('experiencesPage.ghana.body')}</p>
            </div>
          </article>
        </div>
      </section>

      {experiences.length > 0 && (
        <section className="pb-20 md:pb-28 bg-sand-light">
          <div className="container-page space-y-16">
            {experiences.map((e, i) => (
              <article
                key={e.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-md overflow-hidden branded-img">
                  {e.image && (
                    <Image src={e.image} alt={e.title} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
                  )}
                </div>
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 text-coral">
                    {e.adinkra && <AdinkraIcon name={e.adinkra as AdinkraName} size={26} />}
                    <span className="font-opensans uppercase tracking-tracked text-xs">{e.label}</span>
                  </div>
                  <h3 className="mt-4 font-playfair text-display-sm text-teal">{e.title}</h3>
                  <p className="mt-4 font-raleway text-forest/80 leading-relaxed">{e.description}</p>
                  <Link
                    href={`/experiences/${e.slug}`}
                    className="mt-6 inline-block font-opensans text-xs uppercase tracking-tracked text-coral border-b border-coral/60 pb-0.5 hover:text-teal hover:border-teal"
                  >
                    {t('experiences.discover')} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="bg-teal-700 text-cream py-16 text-center">
        <div className="container-page max-w-2xl">
          <p className="font-raleway text-lg text-cream/90 leading-relaxed">
            {t('experiencesPage.buildDay')}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
          >
            {t('experiencesPage.cta')}
          </Link>
        </div>
      </section>
    </>
  );
}
