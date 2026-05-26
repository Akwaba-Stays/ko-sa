'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { useT } from '@/lib/i18n';
import { formatCurrency } from '@/lib/utils';
import type { PublicTreatment } from '@/lib/cms/types';

interface Props {
  /**
   * Treatments to render. Public pages should pass server-resolved data via
   * `listPublicTreatments()`. If omitted the component renders nothing for
   * the treatments list (heading still appears).
   */
  treatments?: PublicTreatment[];
}

export function Wellness({ treatments = [] }: Props) {
  const { t } = useT();
  return (
    <section className="relative py-24 md:py-36 bg-umber text-cream overflow-hidden">
      <p
        aria-hidden
        className="absolute inset-0 grid place-items-center font-beth text-[18vw] text-primary/10 leading-none pointer-events-none select-none"
      >
        {t('wellness.bgWord')}
      </p>

      <div className="container-page relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-6 relative aspect-[4/5] overflow-hidden rounded-lg branded-img"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1400"
            className="h-full w-full object-cover"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-a-woman-receiving-a-massage-3066/1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-umber/30" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6"
        >
          <span className="font-poppins uppercase tracking-tracked text-xs text-primary">
            {t('wellness.eyebrow')}
          </span>
          <h2 className="mt-4 font-belleza text-display-md">
            {t('wellness.headline.l1')}
            <br />
            {t('wellness.headline.l2')}
          </h2>
          <p className="mt-5 text-cream/75 max-w-md">
            {t('wellness.blurb')}
          </p>

          {treatments.length > 0 && (
            <ul className="mt-10 divide-y divide-cream/15">
              {treatments.map((tr) => (
                <li
                  key={tr.id}
                  className="flex items-center justify-between py-4 group cursor-default"
                >
                  <div>
                    <p className="font-belleza text-xl group-hover:text-primary transition-colors">
                      {tr.name}
                    </p>
                    <p className="text-xs font-poppins uppercase tracking-tracked text-cream/55">
                      {tr.durationMin} min
                    </p>
                  </div>
                  <span className="text-primary font-poppins text-sm">
                    {formatCurrency(tr.price, tr.currency)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10">
            <Button href="/wellness" variant="gold-outline" className="bg-transparent text-cream border-primary hover:bg-primary hover:text-umber">
              {t('wellness.bookCta')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
