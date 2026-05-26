import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { listPublicRooms, displayCategory } from '@/lib/cms/rooms';
import { formatCurrency } from '@/lib/utils';
import { getT } from '@/lib/i18n/server';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Rooms & Accommodation',
  description:
    'Your place by the sea. Garden retreats to ocean-facing suites at KO-SA Beach Resort, Elmina, Ghana designed for true rest.',
};

export const dynamic = 'force-dynamic';

export default async function RoomsPage() {
  const { t } = getT();
  const rooms = await listPublicRooms();
  const categoryDictKey: Record<string, 'rooms.filter.suite' | 'rooms.filter.palmSide' | 'rooms.filter.beachView'> = {
    Suite: 'rooms.filter.suite',
    'Palm Side': 'rooms.filter.palmSide',
    'Beach View': 'rooms.filter.beachView',
  };
  const wa = `${site.socials.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;

  return (
    <>
      <PageHero
        eyebrow={t('nav.stay')}
        title={t('roomsPage.headline')}
        image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2000"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rooms.map((r) => {
              const cat = displayCategory(r.category);
              return (
                <article key={r.id} className="group bg-cream rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col">
                  <Link href={`/rooms/${r.slug}`} className="block relative aspect-[4/3] branded-img overflow-hidden">
                    {r.image && (
                      <Image
                        src={r.image}
                        alt={r.name}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-opensans uppercase tracking-tracked text-[10px] text-coral">
                      {t(categoryDictKey[cat])}
                    </span>
                    <h2 className="mt-2 font-playfair text-2xl text-teal group-hover:text-coral transition-colors">
                      <Link href={`/rooms/${r.slug}`}>{r.name}</Link>
                    </h2>
                    {r.tagline && <p className="font-raleway italic text-forest/70 mt-1">{r.tagline}</p>}
                    {r.description && (
                      <p className="mt-3 text-sm text-forest/70 leading-relaxed line-clamp-3">{r.description}</p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-opensans text-forest/60">
                      <span>{t('roomsPage.upTo')} {r.maxGuests} {t('roomsPage.guestsUnit')}</span>
                      {r.sizeSqm ? <span>· {r.sizeSqm} m²</span> : null}
                      {r.bedConfig ? <span>· {r.bedConfig}</span> : null}
                    </div>
                    <div className="mt-6 pt-4 border-t border-sand-300/60 flex items-end justify-between">
                      <span className="font-opensans text-sm text-forest/70">
                        {t('rooms.priceFrom')}{' '}
                        <span className="text-teal font-semibold">{formatCurrency(r.price, r.currency)}</span>
                        {' '}/ {t('rooms.perNight')}
                      </span>
                      <a
                        href={site.bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-opensans uppercase tracking-tracked-sm text-cream bg-coral hover:bg-coral-600 transition-colors rounded-full px-4 py-2"
                      >
                        {t('roomsPage.cardCta')}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
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
    </>
  );
}
