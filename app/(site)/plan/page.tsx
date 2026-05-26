import type { Metadata } from 'next';
import { MapPin, Plane } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Plan Your Stay',
  description:
    'Everything you need to arrive ready sample itineraries, getting here, airport transfers and FAQs for KO-SA Beach Resort, Ghana.',
};

export const dynamic = 'force-dynamic';

const ITINERARIES = [
  { labelKey: 'home.itineraries.weekend', titleKey: 'home.itineraries.weekend.title', bodyKey: 'home.itineraries.weekend.body' },
  { labelKey: 'home.itineraries.short', titleKey: 'home.itineraries.short.title', bodyKey: 'home.itineraries.short.body' },
  { labelKey: 'home.itineraries.full', titleKey: 'home.itineraries.full.title', bodyKey: 'home.itineraries.full.body' },
] as const;

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

export default function PlanPage() {
  const { t } = getT();
  const wa = `${site.socials.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;

  return (
    <>
      <PageHero
        eyebrow={t('nav.plan')}
        title={t('planPage.headline')}
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">{t('planPage.intro')}</p>
        </div>
      </section>

      {/* Sample itineraries */}
      <section className="pb-8 bg-sand-light">
        <div className="container-page">
          <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-2">
            {t('planPage.itineraries.eyebrow')}
          </p>
          <p className="font-raleway text-forest/75 max-w-2xl leading-relaxed mb-10">
            {t('planPage.itineraries.body')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ITINERARIES.map((it) => (
              <article key={it.titleKey} className="bg-cream rounded-md p-6 shadow-sm flex flex-col">
                <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral">{t(it.labelKey)}</p>
                <h3 className="mt-2 font-playfair text-xl text-teal">{t(it.titleKey)}</h3>
                <p className="mt-3 text-sm font-raleway text-forest/75 leading-relaxed flex-1">{t(it.bodyKey)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="text-[10px] font-opensans uppercase tracking-tracked-sm text-cream bg-coral rounded-full px-3 py-2 hover:bg-coral-600">
                    {t('planPage.itineraries.cta1')}
                  </a>
                  <a href={wa} target="_blank" rel="noreferrer" className="text-[10px] font-opensans uppercase tracking-tracked-sm text-teal border border-teal/40 rounded-full px-3 py-2 hover:border-coral hover:text-coral">
                    {t('planPage.itineraries.cta2')}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
