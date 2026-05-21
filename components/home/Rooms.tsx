'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { rooms, CATEGORY_DICT_KEY, type Room } from '@/lib/content/home';
import { formatCurrency } from '@/lib/utils';
import { BRAND_LQIP } from '@/lib/image';
import { useT } from '@/lib/i18n';
import type { DictKey } from '@/lib/i18n/dictionaries';

const filters = ['All', 'Beach View', 'Palm Side', 'Suite'] as const;
const FILTER_DICT_KEY: Record<(typeof filters)[number], DictKey> = {
  All: 'rooms.filter.all',
  'Beach View': 'rooms.filter.beachView',
  'Palm Side': 'rooms.filter.palmSide',
  Suite: 'rooms.filter.suite',
};

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

export function Rooms() {
  const { t } = useT();
  const [active, setActive] = useState<(typeof filters)[number]>('All');
  const filtered = useMemo<Room[]>(
    () => (active === 'All' ? rooms : rooms.filter((r: Room) => r.category === active)),
    [active],
  );

  return (
    <section className="relative bg-bg-orange">
      <div
        className="relative h-[55vh] min-h-[420px] w-full overflow-hidden bg-cover bg-center bg-fixed branded-img"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=2000')",
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
              { n: 12, l: t('rooms.statRooms') },
              { n: 4, l: t('rooms.statSuites') },
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
              key={room.slug}
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
                className="card-3d-inner group block bg-cream rounded-lg overflow-hidden shadow-sm transition-all duration-500"
              >
                <div className="branded-img card-shine relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={t(`rooms.${room.slug}.name` as DictKey)}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="card-3d-img object-cover"
                    placeholder="blur"
                    blurDataURL={BRAND_LQIP}
                  />
                </div>
                <div className="card-3d-float p-6 flex flex-col gap-2">
                  <span className="font-poppins uppercase tracking-tracked text-[10px] text-primary">
                    {t(CATEGORY_DICT_KEY[room.category])}
                  </span>
                  <h3 className="font-belleza text-2xl text-umber group-hover:text-primary transition-colors">
                    {t(`rooms.${room.slug}.name` as DictKey)}
                  </h3>
                  <p className="font-beth text-xl text-umber/70">{t(`rooms.${room.slug}.tagline` as DictKey)}</p>
                  <div className="mt-3 flex items-end justify-between">
                    <span className="text-xs font-poppins uppercase tracking-tracked text-umber/60">
                      {t('rooms.priceFrom')} {formatCurrency(room.price, room.currency)} / {t('rooms.perNight')}
                    </span>
                    <span className="text-xs font-poppins uppercase tracking-tracked-sm text-primary border-b border-primary/40 pb-0.5 transition-transform group-hover:translate-x-1">
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
