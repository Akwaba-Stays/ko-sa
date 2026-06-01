'use client';

import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import Link from 'next/link';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { BRAND_LQIP } from '@/lib/image';
import { useT } from '@/lib/i18n';
import type { DictKey } from '@/lib/i18n/dictionaries';
import type { PublicRoom } from '@/lib/cms/types';
import { displayCategory } from '@/lib/cms/types';

type DisplayCategory = 'Suite' | 'Palm Side' | 'Beach View';
const FILTER_DICT_KEY: Record<'All' | DisplayCategory, DictKey> = {
  All: 'rooms.filter.all',
  'Beach View': 'rooms.filter.beachView',
  'Palm Side': 'rooms.filter.palmSide',
  Suite: 'rooms.filter.suite',
};
const filters = ['All', 'Beach View', 'Palm Side', 'Suite'] as const;

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function Rooms({ rooms = [] }: { rooms?: PublicRoom[] }) {
  const { t } = useT();
  const [active, setActive] = useState<(typeof filters)[number]>('All');
  const filtered = useMemo(() => {
    if (active === 'All') return rooms;
    return rooms.filter((r) => displayCategory(r.category) === active);
  }, [active, rooms]);

  const suiteCount = rooms.filter((r) => r.category === 'SUITE' || r.category === 'VILLA').length;

  return (
    <section className="relative bg-bg-orange">
      <div
        className="relative h-[55vh] min-h-[420px] w-full overflow-hidden bg-cover bg-center bg-fixed branded-img"
        style={{
          backgroundImage:
            "url('https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/rooms/sea-view-family-chalet/0-IMG_3338.webp')",
        }}
      >
        <div className="absolute inset-0 bg-umber/40" />
        <div className="container-page relative h-full flex flex-col items-center justify-center text-center text-cream">
          <span className="font-poppins uppercase tracking-tracked text-xs text-primary">
            {t('rooms.eyebrow')}
          </span>
          <h2 className="mt-4 font-belleza text-display-lg">{t('rooms.headline')}</h2>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 justify-center text-cream/90">
            {[
              { n: rooms.length || 12, l: t('rooms.statRooms') },
              { n: suiteCount || 4, l: t('rooms.statSuites') },
              { n: 1, l: t('rooms.statBeach') },
            ].map((s) => (
              <p key={s.l} className="font-belleza text-3xl md:text-4xl">
                <Counter to={s.n} />
                <span className="ml-2 font-poppins text-xs uppercase tracking-tracked text-cream/75 align-middle">
                  {s.l}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page py-20 md:py-28">
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full font-poppins text-xs uppercase tracking-tracked-sm border transition-all ${
                active === f
                  ? 'bg-umber text-cream border-umber'
                  : 'border-umber/30 text-umber hover:border-primary hover:text-primary'
              }`}
            >
              {t(FILTER_DICT_KEY[f])}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filtered.map((room, i) => (
            <motion.div
              key={room.id}
              layout
              initial={{ opacity: 0, y: 30, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="card-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link
                href={`/rooms/${room.slug}`}
                className="card-3d-inner group flex flex-col h-full bg-cream rounded-lg overflow-hidden shadow-sm transition-all duration-500"
              >
                <div className="branded-img card-shine relative aspect-[3/4] overflow-hidden">
                  {room.image && (
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="card-3d-img object-cover"
                      placeholder="blur"
                      blurDataURL={BRAND_LQIP}
                    />
                  )}
                </div>
                <div className="card-3d-float p-6 flex flex-col flex-1 gap-2">
                  <span className="font-poppins uppercase tracking-tracked text-[10px] text-primary">
                    {displayCategory(room.category)}
                  </span>
                  <h3 className="font-belleza text-2xl text-umber group-hover:text-primary transition-colors line-clamp-1 min-h-[2rem]">
                    {room.name}
                  </h3>
                  <p className="font-beth text-xl text-umber/70 line-clamp-1 min-h-[1.75rem]">
                    {room.tagline || ' '}
                  </p>
                  <div className="mt-auto pt-4">
                    <span className="inline-flex w-full items-center justify-center rounded-full bg-primary/10 text-primary font-poppins text-xs uppercase tracking-tracked-sm px-4 py-2.5 transition-colors group-hover:bg-primary group-hover:text-cream">
                      {t('rooms.view')} →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
