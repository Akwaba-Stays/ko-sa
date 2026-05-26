import type { Metadata } from 'next';
import Image from 'next/image';
import { MessageCircle, Sparkles, HeartHandshake, Flower2, CupSoda } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { listPublicTreatments } from '@/lib/cms/treatments';
import { formatCurrency } from '@/lib/utils';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Wellness',
  description:
    'Well-being, the Ko-Sa way. Wellness journeys, coaching, spa services and the KOSA Tea Bar at KO-SA Beach Resort, Ghana.',
};

export const dynamic = 'force-dynamic';

const PILLARS = [
  { icon: Sparkles, titleKey: 'wellnessPage.journeys.title', bodyKey: 'wellnessPage.journeys.body' },
  { icon: HeartHandshake, titleKey: 'wellnessPage.coaching.title', bodyKey: 'wellnessPage.coaching.body' },
  { icon: Flower2, titleKey: 'wellnessPage.spa.title', bodyKey: 'wellnessPage.spa.body' },
  { icon: CupSoda, titleKey: 'wellnessPage.tea.title', bodyKey: 'wellnessPage.tea.body' },
] as const;

export default async function WellnessPage() {
  const { t } = getT();
  const treatments = await listPublicTreatments();
  const wa = `${site.socials.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;

  return (
    <>
      <PageHero
        eyebrow={t('nav.wellness')}
        title={t('wellnessPage.headline')}
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">
            {t('wellnessPage.intro')}
          </p>
        </div>
      </section>

      <section className="pb-8 bg-sand-light">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.titleKey} className="bg-cream rounded-md p-8 shadow-sm">
                <Icon size={28} className="text-coral" />
                <h2 className="mt-4 font-playfair text-2xl text-teal">{t(p.titleKey)}</h2>
                <p className="mt-3 font-raleway text-forest/80 leading-relaxed">{t(p.bodyKey)}</p>
              </article>
            );
          })}
        </div>
      </section>

      {treatments.length > 0 && (
        <section className="py-16 md:py-24 bg-sand-light">
          <div className="container-page">
            <h2 className="font-playfair text-display-sm text-teal mb-8 text-center">{t('wellnessPage.treatmentsHeading')}</h2>
            <div className="max-w-3xl mx-auto divide-y divide-sand-300/60 bg-cream rounded-md shadow-sm">
              {treatments.map((tr) => (
                <div key={tr.id} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div>
                    <p className="font-playfair text-lg text-teal">{tr.name}</p>
                    <p className="text-xs font-opensans uppercase tracking-tracked text-forest/50">
                      {tr.durationMin} min{tr.category ? ` · ${tr.category}` : ''}
                    </p>
                  </div>
                  <span className="font-opensans text-coral">{formatCurrency(tr.price, tr.currency)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-teal-700 text-cream py-16">
        <div className="container-page max-w-2xl text-center">
          <h2 className="font-playfair text-display-sm">{t('wellnessPage.beginHeadline')}</h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
            >
              {t('wellnessPage.cta.book')}
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/60 text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-cream hover:text-teal transition-colors"
            >
              <MessageCircle size={14} /> {t('wellnessPage.cta.ask')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
