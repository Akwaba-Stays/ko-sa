'use client';

// "Welcome Home" film a cinematic, click-to-play feature of the Ko-Sa naming
// ceremony on the beach. The clip is a narrative promo with its own audio and a
// branded outro, so it is presented as a poster + play (not a silent hero loop)
// and only downloads when the visitor presses play (preload="none").

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { SmoothVideo } from '@/components/shared/SmoothVideo';
import { Reveal } from '@/components/shared/Reveal';
import { useT } from '@/lib/i18n';

const VIDEO = '/media/video/kosa-welcome-home.mp4';
const POSTER = '/media/video/welcome-home-poster.webp';

export function WelcomeVideo() {
  const { t } = useT();
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden bg-teal-900 py-24 md:py-32 text-cream">
      {/* Soft coastal texture + tonal depth */}
      <div aria-hidden className="absolute inset-0 bg-waves opacity-[0.06]" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-teal-900 via-teal-900/85 to-teal-900" />

      <div className="relative container-page">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="font-opensans uppercase tracking-tracked text-[11px] text-sunshine mb-4">
            {t('home.welcome.eyebrow')}
          </p>
          <h2 className="font-playfair text-display-md leading-tight">{t('home.welcome.heading')}</h2>
          <p className="mt-5 font-raleway text-cream/80 leading-relaxed">{t('home.welcome.body')}</p>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto max-w-5xl">
          {/* Warm glow behind the frame */}
          <div aria-hidden className="absolute -inset-4 rounded-[1.75rem] bg-coral/20 blur-2xl" />

          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl ring-1 ring-cream/15">
            {playing ? (
              <SmoothVideo
                wrapperClassName="absolute inset-0 h-full w-full"
                className="h-full w-full bg-black object-cover"
                src={VIDEO}
                poster={POSTER}
                controls
                autoPlay
                playsInline
                preload="none"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={t('home.welcome.play')}
                className="group absolute inset-0 h-full w-full"
              >
                <Image
                  src={POSTER}
                  alt={t('home.welcome.heading')}
                  fill
                  sizes="(min-width:1024px) 1024px, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/15 to-teal-900/30" />

                {/* Play button with a soft pulsing ring */}
                <span aria-hidden className="absolute inset-0 grid place-items-center">
                  <span className="relative grid place-items-center">
                    <span className="absolute h-20 w-20 md:h-24 md:w-24 rounded-full bg-cream/25 animate-ping" />
                    <span className="relative grid place-items-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-coral text-cream shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <Play size={30} className="ml-1 fill-current" />
                    </span>
                  </span>
                </span>

                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 font-opensans uppercase tracking-tracked-sm text-[11px] text-cream/90"
                >
                  {t('home.welcome.cta')}
                </motion.span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
