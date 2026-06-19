'use client';

// Home hero content brief §01.
// Full-screen video/image with the brief's headline + sub-headline + dual CTA.

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { SmoothImage } from '@/components/shared/SmoothImage';
import { SmoothVideo } from '@/components/shared/SmoothVideo';
import { useT } from '@/lib/i18n';
import { site } from '@/lib/site';

const BANNER =
  'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/media/banner/banner1.webp';

export function Hero({ videoUrl, posterUrl }: { videoUrl?: string; posterUrl?: string } = {}) {
  const { t } = useT();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[520px] w-full overflow-hidden text-cream"
      aria-label={t('home.hero.headline')}
    >
      <div className="absolute inset-0 branded-img">
        {/* A 30s slow-motion clip transforms the first impression. When an admin
            sets a hero video URL (Site Settings → Hero), it autoplays muted/looped
            with the banner as its poster; otherwise the banner image shows. */}
        {videoUrl ? (
          <SmoothVideo
            wrapperClassName="absolute inset-0 h-full w-full"
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterUrl || BANNER}
          >
            <source src={videoUrl} />
          </SmoothVideo>
        ) : (
          <SmoothImage
            src={posterUrl || BANNER}
            alt={t('alt.heroShoreline')}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-teal-900/20 to-teal-900/70" />
      </div>

      <motion.div
        style={{ y, opacity }}
        // py clears the fixed navbar at top and the floating CTAs at bottom, and
        // justify-center keeps the block centred. Compact spacing + a clamped
        // headline guarantee every element fits inside the viewport.
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-6 py-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-opensans uppercase tracking-tracked text-[10px] md:text-xs text-sunshine mb-3 md:mb-4"
        >
          {t('home.hero.location')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-playfair text-[clamp(2.25rem,5.2vw,4.5rem)] leading-[1.06] text-cream drop-shadow-[0_2px_30px_rgba(0,0,0,0.4)] max-w-4xl"
        >
          {t('home.hero.headline')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-4 md:mt-5 font-raleway text-cream/85 text-sm md:text-base max-w-xl"
        >
          {t('home.hero.subhead')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        >
          <Button href={site.bookingUrl} target="_blank" rel="noreferrer" size="lg" className="bg-coral text-cream hover:bg-coral-600 border-coral">
            {t('home.hero.ctaPrimary')}
          </Button>
          <Button href="/about" variant="ghost" size="lg">
            {t('home.hero.ctaSecondary')}
          </Button>
        </motion.div>

        {/* Urgency nudge beneath the CTAs (Change Request §Page 01).
            Translucent pill keeps it legible over any hero image; constrained
            width so it wraps cleanly on small screens. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-4 md:mt-5 max-w-[22rem] sm:max-w-none inline-flex items-center gap-2 rounded-full bg-teal-900/45 backdrop-blur-sm px-4 py-2 font-opensans text-[0.75rem] leading-snug md:text-sm text-cream tracking-tracked-sm text-center"
        >
          <span aria-hidden className="hidden sm:inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sunshine animate-pulse" />
          {t('home.hero.urgency')}
        </motion.p>
      </motion.div>

      {/* Scroll cue. Hidden when vertical space is tight so it never collides
          with the hero content on short/landscape screens. */}
      <motion.a
        href="#feeling"
        aria-label={t('a11y.scrollNext')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden [@media(min-height:760px)]:flex flex-col items-center gap-2 text-cream/80 hover:text-sunshine"
      >
        <span className="h-8 w-px bg-sunshine/60" />
        <ChevronDown size={20} className="animate-scroll-indicator text-sunshine" />
      </motion.a>
    </section>
  );
}
