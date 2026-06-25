import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { EventEnquiryForm } from '@/components/marketing/EventEnquiryForm';
import { EventsExplorer } from '@/components/events/EventsExplorer';
import { listPublicEvents } from '@/lib/cms/events';

export const metadata: Metadata = {
  title: 'Events & Activities',
  description:
    'Cooking classes, drumming and dancing, batik and bead making, castle and Kakum tours, naming ceremonies and more at Ko Sa Beach Resort, Ghana.',
};

export const dynamic = 'force-dynamic';

const MEDIA = 'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/media/events';

export default async function EventsPage() {
  const { t } = getT();
  const events = await listPublicEvents();

  return (
    <>
      <PageHero
        eyebrow={t('nav.events')}
        title={t('eventsPage.headline')}
        image={`${MEDIA}/special-events-img_1181.webp`}
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl text-center mx-auto">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">
            {t('eventsPage.intro')}
          </p>
        </div>
      </section>

      {events.length > 0 && (
        <section className="pb-20 md:pb-28 bg-sand-light">
          <div className="container-page">
            <EventsExplorer
              events={events.map((e) => ({
                id: e.id,
                slug: e.slug,
                title: e.title,
                category: e.category,
                description: e.description,
                image: e.image,
                transportIncluded: e.transportIncluded,
                priceNote: e.priceNote,
              }))}
              labels={{
                all: t('rooms.filter.all'),
                enquire: t('eventsPage.enquire'),
                transport: t('eventsPage.transport'),
                empty: t('eventsPage.empty'),
              }}
            />
          </div>
        </section>
      )}

      {/* Group bookings / celebrations enquiry */}
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
