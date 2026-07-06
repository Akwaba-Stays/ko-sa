'use client';

import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useT } from '@/lib/i18n';
import type { PublicGalleryItem } from '@/lib/cms/types';

const PAGE = 12;
// Filter order (only tabs that actually have photos are shown).
const TAGS = ['dishes', 'breakfast', 'drinks', 'moments'] as const;
type Tag = (typeof TAGS)[number];

// Derive a food sub-type straight from where the photo lives in the bucket /
// its filename - no extra DB field needed, so it stays in sync with the images.
function foodTag(url: string): Tag {
  const u = url.toLowerCase();
  const file = u.split('/').pop() ?? '';
  if (u.includes('/media/drinks/') || file.startsWith('drinks')) return 'drinks';
  if (file.startsWith('breakfast')) return 'breakfast';
  if (u.includes('/media/dining-life/') || file.startsWith('people')) return 'moments';
  return 'dishes';
}

export function FoodGallery({ items }: { items: PublicGalleryItem[] }) {
  const { t } = useT();
  const [active, setActive] = useState<'all' | Tag>('all');
  const [count, setCount] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);

  const tagged = useMemo(() => items.map((i) => ({ ...i, tag: foodTag(i.imageUrl) })), [items]);

  // Which filter tabs to render, in fixed order.
  const tabs = useMemo(() => TAGS.filter((tag) => tagged.some((i) => i.tag === tag)), [tagged]);

  const filtered = useMemo(
    () => (active === 'all' ? tagged : tagged.filter((i) => i.tag === active)),
    [tagged, active],
  );
  const visible = filtered.slice(0, count);

  useEffect(() => setCount(PAGE), [active]);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) => setOpen((i) => (i === null ? null : (i + dir + filtered.length) % filtered.length)),
    [filtered.length],
  );
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, go]);

  if (!tagged.length) return null;

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="font-opensans uppercase tracking-tracked text-xs text-coral">
            {t('diningPage.gallery.eyebrow')}
          </span>
          <h2 className="mt-3 font-playfair text-display-sm text-teal">{t('diningPage.gallery.title')}</h2>
          <p className="mt-3 font-raleway text-forest/75">{t('diningPage.gallery.body')}</p>
        </div>

        {tabs.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {(['all', ...tabs] as const).map((tab) => {
              const isActive = active === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-full font-opensans text-xs uppercase tracking-tracked-sm border transition-all duration-300 ${
                    isActive
                      ? 'bg-teal text-cream border-teal shadow-sm'
                      : 'border-teal/25 text-teal/80 hover:border-coral hover:text-coral'
                  }`}
                >
                  {tab === 'all' ? t('rooms.filter.all') : t(`diningPage.gallery.filter.${tab}`)}
                </button>
              );
            })}
          </div>
        )}

        <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          <AnimatePresence>
            {visible.map((item, i) => (
              <motion.button
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: (i % PAGE) * 0.03 }}
                onClick={() => setOpen(i)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-md branded-img bg-sand-light"
                aria-label={item.caption ?? item.alt ?? `Open food image ${i + 1}`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt ?? item.caption ?? `KoSa food image ${i + 1}`}
                  width={item.width ?? 900}
                  height={item.height ?? 1200}
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                  wrapperClassName="block w-full"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-umber/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {count < filtered.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setCount((c) => c + PAGE)}
              className="inline-flex items-center gap-2 rounded-full border border-teal/30 text-teal font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:border-coral hover:text-coral transition-colors"
            >
              {t('gallery.loadMore')}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open !== null && filtered[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8 bg-umber/80 backdrop-blur-xl"
            onClick={close}
          >
            <div className="absolute top-0 inset-x-0 flex items-center justify-between p-5 text-cream/90">
              <span className="font-opensans text-xs uppercase tracking-tracked-sm">
                {filtered[open].caption ?? ''} · {open + 1}/{filtered.length}
              </span>
              <button
                aria-label={t('a11y.close')}
                onClick={close}
                className="grid place-items-center h-10 w-10 rounded-full bg-cream/10 hover:bg-cream/20 border border-cream/20 backdrop-blur-md transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <button
              aria-label={t('a11y.previous')}
              className="absolute left-3 md:left-6 grid place-items-center h-12 w-12 rounded-full bg-cream/10 hover:bg-cream/20 border border-cream/20 backdrop-blur-md text-cream transition-colors"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
            >
              <ChevronLeft size={26} />
            </button>

            <motion.div
              key={filtered[open].id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative branded-img rounded-lg overflow-hidden shadow-2xl max-w-5xl w-full aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={filtered[open].imageUrl} alt={filtered[open].alt ?? ''} fill sizes="100vw" className="object-cover" />
            </motion.div>

            <button
              aria-label={t('a11y.next')}
              className="absolute right-3 md:right-6 grid place-items-center h-12 w-12 rounded-full bg-cream/10 hover:bg-cream/20 border border-cream/20 backdrop-blur-md text-cream transition-colors"
              onClick={(e) => { e.stopPropagation(); go(1); }}
            >
              <ChevronRight size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
