'use client';

// Tabbed sample-itineraries section content brief §01.
// Weekend / Short break / Full reset. Each tab shows a day-by-day story.

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useT } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { site } from '@/lib/site';
import { packageLine, type PackageKey } from '@/lib/pricing';

const TABS = [
  {
    key: 'weekend' as PackageKey,
    labelKey: 'home.itineraries.weekend' as const,
    titleKey: 'home.itineraries.weekend.title' as const,
    bodyKey: 'home.itineraries.weekend.body' as const,
  },
  {
    key: 'short' as PackageKey,
    labelKey: 'home.itineraries.short' as const,
    titleKey: 'home.itineraries.short.title' as const,
    bodyKey: 'home.itineraries.short.body' as const,
  },
  {
    key: 'full' as PackageKey,
    labelKey: 'home.itineraries.full' as const,
    titleKey: 'home.itineraries.full.title' as const,
    bodyKey: 'home.itineraries.full.body' as const,
  },
];

export function Itineraries() {
  const { t } = useT();
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      {/* Texture + coastal decoration so the section reads as a place, not a
          blank panel (Change Request §Page 01). */}
      <div aria-hidden className="absolute inset-0 bg-topo-sand opacity-[0.5]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent" />
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-teal/10"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          d="M0 40 C 120 10, 240 10, 360 40 S 600 70, 720 40 S 960 10, 1080 40 S 1320 70, 1440 40"
        />
      </svg>
      <div className="relative container-page">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">
            {t('home.itineraries.eyebrow')}
          </p>
          <h2 className="font-playfair text-display-md text-teal leading-tight">
            {t('home.itineraries.heading')}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {TABS.map((tab, i) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'px-4 py-2 rounded-full font-opensans text-xs uppercase tracking-tracked-sm border transition-all',
                active === i
                  ? 'bg-teal text-cream border-teal'
                  : 'border-teal/30 text-teal hover:border-coral hover:text-coral',
              )}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto bg-sand-light rounded-md p-8 md:p-12 shadow-sm"
          >
            <h3 className="font-playfair text-2xl md:text-3xl text-teal">{t(tab.titleKey)}</h3>
            <p className="mt-4 font-raleway text-forest/85 leading-relaxed">{t(tab.bodyKey)}</p>

            {/* Bookable package: price + inclusions + Book Now (Change Request §Page 01) */}
            <div className="mt-6 pt-6 border-t border-teal/15">
              <p className="font-opensans text-sm md:text-base text-forest font-medium">
                {packageLine(tab.key)}
              </p>
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
              >
                {t('home.itineraries.bookNow')} →
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="font-raleway italic text-forest/70">{t('home.itineraries.closing')}</p>
          <Link
            href="/plan"
            className="mt-6 inline-flex items-center gap-2 font-opensans uppercase tracking-tracked text-xs text-coral hover:text-coral-700 transition-colors"
          >
            {t('home.itineraries.cta')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
