import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/shared/PageHero';
import { rooms, CATEGORY_DICT_KEY } from '@/lib/content/home';
import { formatCurrency } from '@/lib/utils';
import { getT } from '@/lib/i18n/server';
import type { DictKey } from '@/lib/i18n/dictionaries';

export const metadata: Metadata = {
  title: 'Rooms & Villas',
  description:
    'Beachfront suites, palm-side villas and garden rooms luxury accommodation at KO-SA Beach Resort, Elmina, Ghana.',
};

export default function RoomsPage() {
  const { t } = getT();
  return (
    <>
      <PageHero
        eyebrow={t('rooms.eyebrow')}
        title={t('rooms.headline')}
        subtitle={t('rooms.headline')}
        image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-20 md:py-28 bg-bg-orange">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rooms.map((r) => (
              <div key={r.slug} className="card-3d">
                <Link
                  href={`/rooms/${r.slug}`}
                  className="card-3d-inner group block bg-cream rounded-sm overflow-hidden shadow-sm transition-colors duration-500"
                >
                  <div className="branded-img card-shine relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={t(`rooms.${r.slug}.name` as DictKey)}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="card-3d-img object-cover"
                    />
                  </div>
                  <div className="card-3d-float p-6">
                    <span className="font-poppins uppercase tracking-tracked text-[10px] text-primary">
                      {t(CATEGORY_DICT_KEY[r.category])}
                    </span>
                    <h2 className="mt-2 font-belleza text-2xl text-umber group-hover:text-primary transition-colors">
                      {t(`rooms.${r.slug}.name` as DictKey)}
                    </h2>
                    <p className="font-beth text-xl text-umber/70 mt-1">{t(`rooms.${r.slug}.tagline` as DictKey)}</p>
                    <div className="mt-4 flex justify-between items-end">
                      <span className="text-xs font-poppins uppercase tracking-tracked text-umber/60">
                        {t('rooms.priceFrom')} {formatCurrency(r.price, r.currency)} / {t('rooms.perNight')}
                      </span>
                      <span className="text-xs font-poppins uppercase tracking-tracked-sm text-primary transition-transform group-hover:translate-x-1">
                        {t('rooms.view')} →
                      </span>
                    </div>
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
