'use client';

import { motion } from 'framer-motion';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { adinkraGuide } from '@/lib/content/home';
import { fadeUp, stagger } from '@/lib/animation/variants';
import { useT } from '@/lib/i18n';
import type { DictKey } from '@/lib/i18n/dictionaries';

export function Cultural() {
  const { t } = useT();
  return (
    <section className="relative py-24 md:py-36 bg-sand-light bg-topo-sand">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-poppins uppercase tracking-tracked text-xs text-primary">
            {t('cultural.eyebrow')}
          </span>
          <h2 className="mt-4 font-belleza text-display-md text-umber">{t('cultural.headline')}</h2>
          <p className="mt-4 font-raleway text-umber/75">
            {t('cultural.description')}
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.15)}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
        >
          {adinkraGuide.map((s) => (
            <motion.div key={s.twi} variants={fadeUp} className="text-center group">
              <div className="mx-auto h-20 w-20 grid place-items-center text-primary transition-transform duration-500 group-hover:scale-110">
                <AdinkraIcon name={s.name} size={72} />
              </div>
              <h3 className="mt-6 font-belleza text-2xl text-umber">{s.twi}</h3>
              <p className="font-poppins uppercase tracking-tracked-sm text-[10px] text-primary mt-1">
                {t(`adinkra.${s.name}.meaning` as DictKey)}
              </p>
              <p className="mt-3 text-sm text-umber/75">{t(`adinkra.${s.name}.line` as DictKey)}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 flex items-center gap-4">
          <span className="h-px flex-1 bg-primary/40" />
          <span className="font-beth text-2xl text-umber/70">{t('cultural.footer')}</span>
          <span className="h-px flex-1 bg-primary/40" />
        </div>
      </div>
    </section>
  );
}
