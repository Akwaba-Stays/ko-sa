import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { EventEnquiryForm } from '@/components/marketing/EventEnquiryForm';

export const metadata: Metadata = {
  title: 'Events & Gatherings',
  description:
    "Make it unforgettable · Weddings, wellness retreats and corporate offsites at KO-SA Beach Resort between the ocean and the garden",
};

export const dynamic = 'force-dynamic';

const MEDIA = 'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/media/events';

// Real KO-SA beach-event photography (ceremonies, gatherings, celebrations).
const BLOCKS = [
  {
    key: 'weddings',
    titleKey: 'eventsPage.weddings.title',
    bodyKey: 'eventsPage.weddings.body',
    ctaKey: 'eventsPage.weddings.cta',
    image: `${MEDIA}/special-events-img_1141.webp`,
  },
  {
    key: 'retreats',
    titleKey: 'eventsPage.retreats.title',
    bodyKey: 'eventsPage.retreats.body',
    image: `${MEDIA}/special-events-img_1126.webp`,
  },
  {
    key: 'corporate',
    titleKey: 'eventsPage.corporate.title',
    bodyKey: 'eventsPage.corporate.body',
    image: `${MEDIA}/special-events-img_1113.webp`,
  },
] as const;

export default function EventsPage() {
  const { t } = getT();
  return (
    <>
      <PageHero
        eyebrow={t('nav.events')}
        title={t('eventsPage.headline')}
        image={`${MEDIA}/special-events-img_1181.webp`}
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">
            {t('eventsPage.intro')}
          </p>
        </div>
      </section>

      <section className="pb-12 bg-sand-light">
        <div className="container-page space-y-16 md:space-y-24">
          {BLOCKS.map((b, i) => (
            <article
              key={b.key}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}
            >
              <div className="lg:col-span-6 relative aspect-[4/3] rounded-md overflow-hidden branded-img">
                <Image src={b.image} alt={t(b.titleKey)} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="lg:col-span-6">
                <h2 className="font-playfair text-display-sm text-teal">{t(b.titleKey)}</h2>
                <p className="mt-4 font-raleway text-forest/80 leading-relaxed">{t(b.bodyKey)}</p>
                {'ctaKey' in b && b.ctaKey && (
                  <a
                    href="#enquiry"
                    className="mt-6 inline-flex items-center gap-2 font-opensans uppercase tracking-tracked text-xs text-coral hover:text-coral-700"
                  >
                    {t(b.ctaKey)} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="enquiry" className="py-16 md:py-24 bg-teal-700 text-cream">
        <div className="container-page max-w-2xl">
          <h2 className="font-playfair text-display-sm text-center">{t('eventsPage.corporate.cta')}</h2>
          <p className="mt-3 text-center font-opensans text-sm text-cream/70 uppercase tracking-tracked-sm">
            {t('eventsPage.form.response')}
          </p>
          <div className="mt-10">
            <EventEnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
