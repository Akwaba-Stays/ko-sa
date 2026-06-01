'use client';

import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { useT } from '@/lib/i18n';
import type { PublicGalleryItem } from '@/lib/cms/types';

export function Gallery({ items = [] }: { items?: PublicGalleryItem[] }) {
  const { t } = useT();
  const [open, setOpen] = useState<number | null>(null);
  const [count, setCount] = useState(9);

  const visible = items.slice(0, count);

  return (
    <section className="relative py-24 md:py-36 bg-bg-orange">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-poppins uppercase tracking-tracked text-xs text-primary">
              {t('gallery.eyebrow')}
            </span>
            <h2 className="mt-4 font-belleza text-display-md text-umber">{t('gallery.headline')}</h2>
          </div>
          <p className="max-w-md font-raleway text-umber/75">
            {t('gallery.description')}
          </p>
        </div>

        {visible.length === 0 ? (
          <p className="text-center text-umber/60 text-sm">{t('gallery.empty')}</p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
            {visible.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setOpen(i)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm branded-img bg-sand-light"
                aria-label={item.caption ?? item.alt ?? `Open image ${i + 1}`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt ?? item.caption ?? `KO-SA gallery image ${i + 1}`}
                  width={item.width ?? 900}
                  height={item.height ?? 1200}
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                  wrapperClassName="block w-full"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-umber/0 group-hover:bg-umber/30 transition-colors" />
              </button>
            ))}
          </div>
        )}

        {count < items.length && (
          <div className="mt-12 text-center">
            <Button onClick={() => setCount((c) => Math.min(c + 6, items.length))} variant="gold-outline">
              {t('gallery.loadMore')}
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-umber/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setOpen(null)}
          >
            <button
              aria-label={t('a11y.close')}
              className="absolute top-6 right-6 text-cream hover:text-primary"
              onClick={() => setOpen(null)}
            >
              <X size={28} />
            </button>
            <button
              aria-label={t('a11y.previous')}
              className="absolute left-6 text-cream hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) => (i === null ? null : (i - 1 + items.length) % items.length));
              }}
            >
              <ChevronLeft size={36} />
            </button>
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-5xl w-full aspect-[4/3] branded-img"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[open].imageUrl}
                alt={items[open].alt ?? ''}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
            <button
              aria-label={t('a11y.next')}
              className="absolute right-6 text-cream hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) => (i === null ? null : (i + 1) % items.length));
              }}
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
