'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { useT } from '@/lib/i18n';
import type { PublicTestimonial } from '@/lib/cms/types';

export function Testimonials({ testimonials = [] }: { testimonials?: PublicTestimonial[] }) {
  const { t: T } = useT();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = setInterval(() => setI((x) => (x + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;
  const current = testimonials[i];

  return (
    <section className="relative py-24 md:py-36 bg-cream overflow-hidden">
      <svg
        viewBox="0 0 1440 60"
        className="absolute top-0 left-0 w-full text-bg-orange"
        preserveAspectRatio="none"
      >
        <path d="M0,30 Q360,60 720,30 T1440,30 V0 H0 Z" fill="currentColor" />
      </svg>

      <div className="container-page text-center max-w-3xl mx-auto">
        <span className="font-poppins uppercase tracking-tracked text-xs text-primary">
          {T('testimonials.eyebrow')}
        </span>
        <h2 className="mt-4 font-belleza text-display-md text-umber">{T('testimonials.headline')}</h2>

        <div className="relative mt-12 min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {current.avatarUrl && (
                <div className="branded-img relative h-20 w-20 rounded-full overflow-hidden border-2 border-primary">
                  <Image src={current.avatarUrl} alt={current.guestName} fill sizes="80px" className="object-cover" />
                </div>
              )}
              <div className="mt-4 flex items-center gap-1 text-primary">
                {Array.from({ length: current.rating }).map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
              <p className="mt-6 font-belleza italic text-2xl md:text-3xl text-umber leading-snug">
                &ldquo;{current.quote}&rdquo;
              </p>
              <p className="mt-6 font-poppins uppercase tracking-tracked text-xs text-umber/70">
                {current.guestName}
                {current.country ? ` · ${current.country}` : ''}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setI(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? 'w-8 bg-primary' : 'w-1.5 bg-umber/20 hover:bg-umber/40'
              }`}
            />
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 1440 60"
        className="absolute bottom-0 left-0 w-full text-umber"
        preserveAspectRatio="none"
      >
        <path d="M0,30 Q360,0 720,30 T1440,30 V60 H0 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
