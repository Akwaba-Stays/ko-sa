'use client';

import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { useT } from '@/lib/i18n';

export function VirtualTourTeaser() {
  const { t } = useT();
  return (
    <section className="relative py-24 md:py-32 bg-bg-orange">
      <div className="container-page">
        <div className="text-center mb-14">
          <span className="font-poppins uppercase tracking-tracked text-xs text-primary">
            {t('tour.eyebrow')}
          </span>
          <h2 className="mt-4 font-belleza text-display-md text-umber">
            {t('tour.headline')}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto font-raleway text-umber/75">
            {t('tour.description')}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-md branded-img group"
        >
          <Image
            src="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/rooms/luxury-double-sea-view/0-LDRWSV.webp"
            alt="360° preview of the Kosa beachfront suite"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-umber/70 via-umber/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-cream">
            <div className="grid place-items-center h-20 w-20 rounded-full bg-primary/20 backdrop-blur-md border border-cream/40 mb-6">
              <Play size={32} className="text-cream ml-1" />
            </div>
            <Button href="/virtual-tour" size="lg">
              {t('tour.cta')}
            </Button>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-cream/90 text-xs font-poppins uppercase tracking-tracked">
            <AdinkraIcon name="palm" size={20} className="text-primary" />
            {t('tour.footer')}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
