import type { Metadata } from 'next';
import Link from 'next/link';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { MapPin, Plane } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { listPublicExperiences } from '@/lib/cms/experiences';
import { site } from '@/lib/site';
import { packageLine, waLink, waPrefill, type PackageKey } from '@/lib/pricing';

const ITINERARIES: {
  key: PackageKey;
  labelKey: 'home.itineraries.weekend' | 'home.itineraries.short' | 'home.itineraries.full';
  titleKey: 'home.itineraries.weekend.title' | 'home.itineraries.short.title' | 'home.itineraries.full.title';
  bodyKey: 'home.itineraries.weekend.body' | 'home.itineraries.short.body' | 'home.itineraries.full.body';
}[] = [
  { key: 'weekend', labelKey: 'home.itineraries.weekend', titleKey: 'home.itineraries.weekend.title', bodyKey: 'home.itineraries.weekend.body' },
  { key: 'short', labelKey: 'home.itineraries.short', titleKey: 'home.itineraries.short.title', bodyKey: 'home.itineraries.short.body' },
  { key: 'full', labelKey: 'home.itineraries.full', titleKey: 'home.itineraries.full.title', bodyKey: 'home.itineraries.full.body' },
];

export const metadata: Metadata = {
  title: 'Plan Your Stay',
  description:
    'Everything you need to arrive ready what to do, getting here, airport transfers and FAQs for KO-SA Beach Resort, Ghana',
};

export const dynamic = 'force-dynamic';

const FAQS = [
  { q: 'planPage.faq.checkin.q', a: 'planPage.faq.checkin.a' },
  { q: 'planPage.faq.cancellation.q', a: 'planPage.faq.cancellation.a' },
  { q: 'planPage.faq.airport.q', a: 'planPage.faq.airport.a' },
  { q: 'planPage.faq.halal.q', a: 'planPage.faq.halal.a' },
  { q: 'planPage.faq.children.q', a: 'planPage.faq.children.a' },
  { q: 'planPage.faq.payment.q', a: 'planPage.faq.payment.a' },
  { q: 'planPage.faq.swim.q', a: 'planPage.faq.swim.a' },
  { q: 'planPage.faq.wellness.q', a: 'planPage.faq.wellness.a' },
] as const;

export default async function PlanPage() {
  const { t } = getT();
  const wa = `${site.socials.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;
  const experiences = await listPublicExperiences();

  return (
    <>
      <PageHero
        eyebrow={t('nav.plan')}
        title={t('planPage.headline')}
        image="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/beach/1-772A1842.webp"
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">{t('planPage.intro')}</p>
        </div>
      </section>

      {/* What to do here — real experiences from the CMS */}
      {experiences.length > 0 && (
        <section className="pb-8 bg-sand-light">
          <div className="container-page">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-2">
              {t('planPage.experiences.eyebrow')}
            </p>
            <p className="font-raleway text-forest/75 max-w-2xl leading-relaxed mb-10">
              {t('planPage.experiences.body')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {experiences.map((e) => (
                <Link
                  key={e.id}
                  href={`/experiences/${e.slug}`}
                  className="group relative aspect-[3/4] rounded-md overflow-hidden branded-img flex items-end shadow-sm"
                >
                  {e.image && (
                    <Image
                      src={e.image}
                      alt={e.title}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-umber/85 via-umber/20 to-transparent" />
                  <div className="relative p-5 text-cream">
                    <p className="font-opensans uppercase tracking-tracked text-[10px] text-sunshine">{e.label}</p>
                    <h3 className="mt-1 font-playfair text-xl leading-tight">{e.title}</h3>
                    <span className="mt-2 inline-block font-opensans uppercase tracking-tracked-sm text-[10px] text-cream/80 group-hover:text-sunshine transition-colors">
                      {t('experiences.discover')} →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/experiences" className="text-xs font-opensans uppercase tracking-tracked-sm text-cream bg-coral rounded-full px-5 py-2.5 hover:bg-coral-600 transition-colors">
                {t('planPage.experiences.cta')}
              </Link>
              <a href={wa} target="_blank" rel="noreferrer" className="text-xs font-opensans uppercase tracking-tracked-sm text-teal border border-teal/40 rounded-full px-5 py-2.5 hover:border-coral hover:text-coral transition-colors">
                {t('planPage.itineraries.cta2')}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Getting here */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 text-coral">
              <MapPin size={18} />
              <span className="font-opensans uppercase tracking-tracked text-xs">{t('nav.plan')}</span>
            </div>
            <h2 className="mt-3 font-playfair text-display-sm text-teal">{t('planPage.getting.title')}</h2>
            <p className="mt-4 font-raleway text-forest/80 leading-relaxed">{t('planPage.getting.body')}</p>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
            >
              <Plane size={14} /> {t('planPage.getting.cta')}
            </a>
          </div>
          <div className="rounded-md overflow-hidden shadow-sm aspect-[4/3] bg-sand">
            <iframe
              title={t('contactPage.mapTitle')}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${site.location.lat},${site.location.lng}&z=10&output=embed`}
            />
          </div>
        </div>
      </section>

      {/* Your Stay, Your Way — full itineraries above the FAQ (Change Request §Page 07) */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container-page">
          <div className="max-w-2xl mb-12">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-2">
              {t('planPage.itineraries.eyebrow')}
            </p>
            <h2 className="font-playfair text-display-sm text-teal">{t('planPage.itineraries.heading')}</h2>
            <p className="mt-4 font-raleway text-forest/75 leading-relaxed">{t('planPage.itineraries.body')}</p>
          </div>

          <div className="space-y-6">
            {ITINERARIES.map((it) => (
              <article key={it.key} className="bg-sand-light rounded-md p-8 md:p-10 shadow-sm">
                <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral">{t(it.labelKey)}</p>
                <h3 className="mt-2 font-playfair text-2xl text-teal">{t(it.titleKey)}</h3>
                <p className="mt-4 font-raleway text-forest/85 leading-relaxed">{t(it.bodyKey)}</p>
                <p className="mt-5 font-opensans text-sm text-forest font-medium">{packageLine(it.key)}</p>
                <p className="mt-4 font-raleway italic text-forest/60">{t('planPage.itineraries.eachClose')}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
                  >
                    {t('planPage.itineraries.bookThis')} →
                  </a>
                  <a
                    href={waLink(waPrefill.customiseStay())}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-teal/40 text-teal font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:border-coral hover:text-coral transition-colors"
                  >
                    {t('planPage.itineraries.cta2')} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <h2 className="font-playfair text-display-sm text-teal mb-8 text-center">{t('planPage.faqs.title')}</h2>
          <FaqAccordion items={FAQS.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
        </div>
      </section>
    </>
  );
}
