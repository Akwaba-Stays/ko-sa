import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { rooms } from '@/lib/content/home';
import { Button } from '@/components/shared/Button';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { formatCurrency } from '@/lib/utils';
import { site } from '@/lib/site';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const room = rooms.find((r) => r.slug === params.slug);
  if (!room) return {};
  return {
    title: `${room.name} · Rooms`,
    description: `${room.tagline} From ${formatCurrency(room.price, room.currency)}/night at KO-SA Beach Resort.`,
    openGraph: { images: [{ url: room.image, width: 1400, height: 900 }] },
  };
}

const amenities = [
  'Beachfront balcony',
  'King-size bed with linen sheets',
  'Open-air rain shower',
  'Locally sourced amenities',
  'High-speed WiFi',
  'Air conditioning + ceiling fan',
  'Daily breakfast included',
  'Welcome rituals',
];

export default function RoomDetailPage({ params }: Props) {
  const room = rooms.find((r) => r.slug === params.slug);
  if (!room) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: room.name,
    image: room.image,
    description: room.tagline,
    occupancy: { '@type': 'QuantitativeValue', maxValue: 4 },
    amenityFeature: amenities.map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
    })),
    offers: {
      '@type': 'Offer',
      price: room.price,
      priceCurrency: room.currency,
      url: `${site.url}/rooms/${room.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden pt-20">
        <Image src={room.image} alt={room.name} fill priority sizes="100vw" className="object-cover branded-img" />
        <div className="absolute inset-0 bg-gradient-to-b from-umber/30 to-umber/70" />
        <div className="absolute inset-0 container-page flex flex-col justify-end pb-16 text-cream">
          <span className="font-poppins uppercase tracking-tracked text-xs text-primary mb-3">{room.category}</span>
          <h1 className="font-belleza text-display-lg">{room.name}</h1>
          <p className="font-beth text-3xl text-primary/90 mt-2">{room.tagline}</p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-bg-orange">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8 max-w-prose">
            <p className="font-raleway text-lg text-umber/85 leading-relaxed">
              A composed retreat soft linen, woven palm, hand-thrown ceramics. The {room.name.toLowerCase()} is
              for those who want a room that breathes with the tide.
            </p>
            <p className="text-umber/75 leading-relaxed">
              West African textiles meet contemporary architecture. Open-air showers, balconies that catch the
              evening trade winds, and morning rituals that begin with hibiscus tea on the veranda.
            </p>
            <div className="flex items-center gap-4 py-4">
              <span className="h-px flex-1 bg-primary/40" />
              <AdinkraIcon name="asetena" size={36} className="text-primary" />
              <span className="h-px flex-1 bg-primary/40" />
            </div>
            <div>
              <h2 className="font-belleza text-2xl text-umber mb-5">Amenities</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-umber/80">
                {amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 bg-cream rounded-md p-6 shadow-xl">
              <p className="font-poppins uppercase tracking-tracked text-xs text-umber/60">From</p>
              <p className="font-belleza text-4xl text-umber mt-1">
                {formatCurrency(room.price, room.currency)}
                <span className="text-base text-umber/60"> / night</span>
              </p>
              <p className="text-xs text-umber/60 mt-1">Taxes & breakfast included.</p>
              <div className="mt-6 space-y-3">
                <Button href={`/book?room=${room.slug}`} fullWidth size="lg">
                  Reserve {room.name}
                </Button>
                <Button href="/contact" variant="gold-outline" fullWidth>
                  Ask the concierge
                </Button>
              </div>
              <p className="text-xs text-umber/50 mt-4 text-center">
                Free cancellation up to 48 hours before arrival.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16 bg-sand-light">
        <div className="container-page">
          <h2 className="font-belleza text-2xl text-umber mb-8">Other rooms you might love</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.filter((r) => r.slug !== room.slug).slice(0, 3).map((r) => (
              <div key={r.slug} className="card-3d card-3d-lift">
                <Link
                  href={`/rooms/${r.slug}`}
                  className="card-3d-inner group block bg-cream rounded-sm overflow-hidden shadow-sm"
                >
                  <div className="branded-img card-shine relative aspect-[4/3]">
                    <Image src={r.image} alt={r.name} fill sizes="33vw" className="card-3d-img object-cover" />
                  </div>
                  <div className="card-3d-float p-5">
                    <h3 className="font-belleza text-xl text-umber group-hover:text-primary">{r.name}</h3>
                    <p className="text-xs text-umber/60 mt-1">From {formatCurrency(r.price, r.currency)}/night</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
