'use client';

// Home hero content brief §01.
// Full-screen video/image with the brief's headline + sub-headline + dual CTA.

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { useT } from '@/lib/i18n';
import { site } from '@/lib/site';

export function Hero() {
  const { t } = useT();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden text-cream"
      aria-label={t('home.hero.headline')}
    >
      <div className="absolute inset-0 branded-img">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000"
          className="hidden md:block h-full w-full object-cover"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-aerial-view-of-a-tropical-beach-3024/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1400"
          alt={t('alt.heroShoreline')}
          className="md:hidden h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-teal-900/20 to-teal-900/70" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-opensans uppercase tracking-tracked text-xs md:text-sm text-sunshine mb-6"
        >
          {t('home.hero.location')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-playfair text-display-xl text-cream drop-shadow-[0_2px_30px_rgba(0,0,0,0.4)] max-w-5xl"
        >
          {t('home.hero.headline')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-6 font-raleway text-cream/85 text-sm md:text-base"
        >
          {t('home.hero.subhead')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button href={site.bookingUrl} target="_blank" rel="noreferrer" size="lg" className="bg-coral text-cream hover:bg-coral-600 border-coral">
            {t('home.hero.ctaPrimary')}
          </Button>
          <Button href="/about" variant="ghost" size="lg">
            {t('home.hero.ctaSecondary')}
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#feeling"
        aria-label={t('a11y.scrollNext')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/80 hover:text-sunshine"
      >
        <span className="h-10 w-px bg-sunshine/60" />
        <ChevronDown size={20} className="animate-scroll-indicator text-sunshine" />
      </motion.a>
    </section>
  );
}
