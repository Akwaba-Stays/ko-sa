import type { Metadata } from 'next';
import { MessageCircle, Check } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { RoomsExplorer } from '@/components/rooms/RoomsExplorer';
import { listPublicRooms } from '@/lib/cms/rooms';
import { getT } from '@/lib/i18n/server';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Rooms & Accommodation',
  description:
    'Your place by the sea · Garden retreats to ocean-facing suites at KO-SA Beach Resort, Elmina, Ghana designed for true rest',
};

export const dynamic = 'force-dynamic';

export default async function RoomsPage() {
  const { t } = getT();
  const rooms = await listPublicRooms();
  const wa = `${site.socials.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;

  return (
    <>
      <PageHero
        eyebrow={t('nav.stay')}
        title={t('roomsPage.headline')}
        image="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/rooms/luxury-double-sea-view/0-LDRWSV.webp"
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">
            {t('roomsPage.intro')}
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-sand-light">
        <div className="container-page">
          <RoomsExplorer
            rooms={rooms}
            labels={{
              searchPlaceholder: t('roomsPage.searchPlaceholder'),
              all: t('rooms.filter.all'),
              suite: t('rooms.filter.suite'),
              palmSide: t('rooms.filter.palmSide'),
              beachView: t('rooms.filter.beachView'),
              upTo: t('roomsPage.upTo'),
              guestsUnit: t('roomsPage.guestsUnit'),
              cardCta: t('roomsPage.cardCta'),
              view: t('rooms.view'),
              resultsOne: t('roomsPage.resultsOne'),
              resultsMany: t('roomsPage.resultsMany'),
              empty: t('roomsPage.searchEmpty'),
              bookingUrl: site.bookingUrl,
            }}
          />
        </div>
      </section>

      {/* Booking confidence copy (brief §02) */}
      <section className="bg-teal-700 text-cream py-16">
        <div className="container-page max-w-3xl text-center">
          <p className="font-raleway text-lg leading-relaxed text-cream/90">{t('roomsPage.trust')}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
            >
              {t('common.bookYourStay')}
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/60 text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-cream hover:text-teal transition-colors"
            >
              <MessageCircle size={14} /> {t('common.whatsapp')}
            </a>
          </div>
        </div>
      </section>

      {/* Booking confidence strip (Change Request §Page 02) */}
      <section className="bg-sand-light border-t border-sand-300/60 py-8">
        <div className="container-page">
          <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
            {[
              t('roomsPage.confidence.rate'),
              t('roomsPage.confidence.cancel'),
              t('roomsPage.confidence.welcome'),
              t('roomsPage.confidence.desk'),
            ].map((item) => (
              <li key={item} className="inline-flex items-center gap-2 font-opensans text-sm text-forest/80">
                <Check size={16} className="text-coral shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
