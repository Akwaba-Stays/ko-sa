'use client';

// Tabbed sample-itineraries section content brief §01.
// Weekend / Short break / Full reset. Each tab shows a day-by-day story.

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useT } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const TABS = [
  {
    key: 'weekend',
    labelKey: 'home.itineraries.weekend' as const,
    titleKey: 'home.itineraries.weekend.title' as const,
    bodyKey: 'home.itineraries.weekend.body' as const,
  },
  {
    key: 'short',
    labelKey: 'home.itineraries.short' as const,
    titleKey: 'home.itineraries.short.title' as const,
    bodyKey: 'home.itineraries.short.body' as const,
  },
  {
    key: 'full',
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
    <section className="relative bg-cream py-24 md:py-32">
      <div className="container-page">
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
