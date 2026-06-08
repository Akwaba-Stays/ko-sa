'use client';

// "Feeling" section the Holistika moment. Editorial photography +
// atmospheric copy that describes a *feeling*, not amenities. Content brief
// §01 → The Feeling Section.

import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { motion } from 'framer-motion';
import { useT } from '@/lib/i18n';

export function Feeling() {
  const { t } = useT();
  return (
    <section id="feeling" className="relative bg-sand-light py-24 md:py-36">
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 relative aspect-[4/3] rounded-md overflow-hidden branded-img"
        >
          <Image
            src="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/media/feeling/slowingdown.webp"
            alt={t('alt.feelingHammock')}
            fill
            sizes="(min-width:1024px) 58vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">
            {t('intro.eyebrow')}
          </p>
          <h2 className="font-playfair text-display-md text-teal leading-tight">
            {t('home.feeling.headline')}
          </h2>
          <p className="mt-6 font-raleway text-forest/85 leading-relaxed max-w-md">
            {t('home.feeling.body')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
