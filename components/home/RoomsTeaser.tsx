'use client';

// Rooms teaser content brief §01.

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useT } from '@/lib/i18n';
import type { PublicRoom } from '@/lib/cms/types';

export function RoomsTeaser({ rooms }: { rooms: PublicRoom[] }) {
  const { t } = useT();
  const featured = rooms.slice(0, 3);
  return (
    <section className="relative bg-teal-50 py-24 md:py-32">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">{t('nav.stay')}</p>
            <h2 className="font-playfair text-display-md text-teal leading-tight">
              {t('home.roomsTeaser.headline')}
            </h2>
          </div>
          <p className="lg:col-span-5 font-raleway text-forest/80 leading-relaxed">
            {t('home.roomsTeaser.body')}
          </p>
        </div>

        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featured.map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={`/rooms/${room.slug}`}
                  className="group block bg-cream rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-[4/5] branded-img overflow-hidden">
                    {room.image && (
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        sizes="(min-width:768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-xl text-teal group-hover:text-coral transition-colors">
                      {room.name}
                    </h3>
                    {room.tagline && (
                      <p className="mt-2 font-raleway text-sm text-forest/75 italic">{room.tagline}</p>
                    )}
                    <span className="mt-4 inline-block text-xs font-opensans uppercase tracking-tracked-sm text-coral">
                      {t('roomsPage.cardCta')} →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 font-opensans uppercase tracking-tracked-sm text-xs text-teal border-b border-teal/40 hover:text-coral hover:border-coral pb-1"
          >
            {t('home.roomsTeaser.cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
