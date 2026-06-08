import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { listPublicRooms, getPublicRoomBySlug, displayCategory } from '@/lib/cms/rooms';
import { Button } from '@/components/shared/Button';
import { Carousel } from '@/components/shared/Carousel';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { site } from '@/lib/site';
import { getT } from '@/lib/i18n/server';
import { roomFromPerNight } from '@/lib/pricing';
import { getSetting } from '@/lib/cms/settings';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const room = await getPublicRoomBySlug(params.slug);
  if (!room) return {};
  return {
    title: `${room.name} · Rooms`,
    description: `${room.tagline ?? room.description ?? ''} ${room.name} at KO-SA Beach Resort, Elmina, Ghana.`.trim(),
    openGraph: { images: room.image ? [{ url: room.image, width: 1400, height: 900 }] : undefined },
  };
}

const DEFAULT_AMENITY_KEYS = [
  'roomDetail.amenity.balcony',
  'roomDetail.amenity.bed',
  'roomDetail.amenity.shower',
  'roomDetail.amenity.local',
  'roomDetail.amenity.wifi',
  'roomDetail.amenity.ac',
  'roomDetail.amenity.breakfast',
  'roomDetail.amenity.welcome',
] as const;

export default async function RoomDetailPage({ params }: Props) {
  const room = await getPublicRoomBySlug(params.slug);
  if (!room) notFound();

  const { t } = getT();
  const cat = displayCategory(room.category);
  const categoryDictKey: Record<string, 'rooms.filter.suite' | 'rooms.filter.palmSide' | 'rooms.filter.beachView'> = {
    'Garden View': 'rooms.filter.suite',
    'Palm Side': 'rooms.filter.palmSide',
    'Sea View': 'rooms.filter.beachView',
  };

  const amenities = room.amenities.length ? room.amenities : DEFAULT_AMENITY_KEYS.map((k) => t(k));
  const pricing = await getSetting('pricing');
  const showPrices = !pricing.hideRoomPrices;
  const allRooms = await listPublicRooms();
  const related = allRooms.filter((r) => r.slug !== room.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    image: room.image ?? undefined,
    description: room.tagline ?? room.description ?? undefined,
    occupancy: { '@type': 'QuantitativeValue', maxValue: room.maxGuests },
    amenityFeature: amenities.map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
    })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${site.url}/rooms/${room.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden pt-20">
        {room.image && (
          <Image src={room.image} alt={room.name} fill priority sizes="100vw" className="object-cover branded-img" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-umber/30 to-umber/70" />
        <div className="absolute inset-0 container-page flex flex-col justify-end pb-16 text-cream">
          <span className="font-poppins uppercase tracking-tracked text-xs text-primary mb-3">
            {t(categoryDictKey[cat])}
          </span>
          <h1 className="font-belleza text-display-lg">{room.name}</h1>
          {room.tagline && <p className="font-beth text-3xl text-primary/90 mt-2">{room.tagline}</p>}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-bg-orange">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8 max-w-prose">
            {room.description ? (
              <div className="font-raleway text-lg text-umber/85 leading-relaxed whitespace-pre-line">
                {room.description}
              </div>
            ) : (
              <p className="font-raleway text-lg text-umber/85 leading-relaxed">
                {t('roomDetail.descFallback')}
              </p>
            )}
            <div className="flex items-center gap-4 py-4">
              <span className="h-px flex-1 bg-primary/40" />
              <AdinkraIcon name="asetena" size={36} className="text-primary" />
              <span className="h-px flex-1 bg-primary/40" />
            </div>
            <div>
              <h2 className="font-belleza text-2xl text-umber mb-5">{t('roomDetail.amenities')}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-umber/80">
                {amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" /> {a}
                  </li>
                ))}
              </ul>
            </div>
            {room.gallery.length > 1 && (
              <div className="pt-8">
                <Carousel
                  images={room.gallery}
                  alt={room.name}
                  aspect="aspect-[3/2]"
                  autoplay
                  sizes="(min-width:1024px) 58vw, 100vw"
                />
              </div>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 bg-cream rounded-md p-6 shadow-xl">
              <p className="font-poppins uppercase tracking-tracked text-xs text-umber/60">{t('nav.stay')}</p>
              <p className="font-belleza text-3xl text-umber mt-1 leading-tight">{room.name}</p>
              {room.tagline && (
                <p className="font-raleway italic text-sm text-umber/70 mt-2">{room.tagline}</p>
              )}
              {/* Starting price (Change Request §Page 02) - hidden when admin toggles off */}
              {showPrices && (
                <p className="mt-4 font-belleza text-2xl text-primary">
                  {roomFromPerNight(room.slug, room.price)}
                </p>
              )}
              <div className="mt-6 space-y-3">
                <Button href={site.bookingUrl} target="_blank" rel="noreferrer" fullWidth size="lg">
                  {t('roomDetail.reserve')} {room.name}
                </Button>
                <Button href="/contact" variant="gold-outline" fullWidth>
                  {t('roomDetail.askConcierge')}
                </Button>
              </div>
              <p className="text-xs text-umber/50 mt-4 text-center">
                {t('roomDetail.freeCancellation')}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-sand-light">
          <div className="container-page">
            <h2 className="font-belleza text-2xl text-umber mb-8">{t('roomDetail.otherRooms')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <div key={r.id} className="card-3d card-3d-lift">
                  <Link
                    href={`/rooms/${r.slug}`}
                    className="card-3d-inner group block bg-cream rounded-sm overflow-hidden shadow-sm"
                  >
                    <div className="branded-img card-shine relative aspect-[4/3]">
                      {r.image && (
                        <Image src={r.image} alt={r.name} fill sizes="33vw" className="card-3d-img object-cover" />
                      )}
                    </div>
                    <div className="card-3d-float p-5">
                      <h3 className="font-belleza text-xl text-umber group-hover:text-primary line-clamp-1">{r.name}</h3>
                      <p className="text-xs text-umber/60 mt-1 line-clamp-1">{r.tagline ?? displayCategory(r.category)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
