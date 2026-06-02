import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import Link from 'next/link';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { listPublicExperiences } from '@/lib/cms/experiences';
import { AdinkraIcon, type AdinkraName } from '@/components/shared/AdinkraIcon';

export const metadata: Metadata = {
  title: 'Experiences & Activities',
  description:
    'Ghana begins here · On-property calm and guided journeys into Cape Coast, Elmina, Kakum and the fishing villages from KO-SA Beach Resort',
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
        image="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/resort/0-772A4907.webp"
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
              src="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/resort/11-772A4926.webp"
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
              src="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/resort/12-772A4928.webp"
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

      {/* Signature experiences real activities at Ko-Sa */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">
              {t('experiencesPage.signature.eyebrow')}
            </p>
            <h2 className="font-playfair text-display-sm text-teal">
              {t('experiencesPage.signature.headline')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(
              [
                { t: 'experiencesPage.signature.ampenyi.title', b: 'experiencesPage.signature.ampenyi.body' },
                { t: 'experiencesPage.signature.turtle.title', b: 'experiencesPage.signature.turtle.body' },
                { t: 'experiencesPage.signature.capeCoast.title', b: 'experiencesPage.signature.capeCoast.body' },
                { t: 'experiencesPage.signature.elmina.title', b: 'experiencesPage.signature.elmina.body' },
                { t: 'experiencesPage.signature.kakum.title', b: 'experiencesPage.signature.kakum.body' },
                { t: 'experiencesPage.signature.massage.title', b: 'experiencesPage.signature.massage.body' },
                { t: 'experiencesPage.signature.horse.title', b: 'experiencesPage.signature.horse.body' },
              ] as const
            ).map((item) => (
              <article key={item.t} className="bg-sand-light rounded-md p-6 shadow-sm">
                <h3 className="font-playfair text-xl text-teal">{t(item.t)}</h3>
                <p className="mt-3 font-raleway text-sm text-forest/80 leading-relaxed">{t(item.b)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
