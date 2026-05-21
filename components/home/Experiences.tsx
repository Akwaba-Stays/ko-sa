'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMemo } from 'react';
import { experiences, localize, type Experience } from '@/lib/content/home';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { fadeUp, stagger } from '@/lib/animation/variants';
import { BRAND_LQIP } from '@/lib/image';
import { useT } from '@/lib/i18n';

export function Experiences() {
  const { t, locale } = useT();
  const localized = useMemo(() => experiences.map((e: Experience & { i18n?: any }) => localize(e, locale)), [locale]);
  return (
    <section className="relative py-24 md:py-32 lg:py-40 bg-cream">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-poppins uppercase tracking-tracked text-xs text-primary">
              {t('experiences.eyebrow')}
            </span>
            <h2 className="mt-4 font-belleza text-display-md text-umber max-w-2xl">
              {t('experiences.headline')}
            </h2>
          </div>
          <p className="max-w-md font-raleway text-umber/75">
            {t('experiences.blurb')}
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger(0.12)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {localized.map((ex) => (
            <motion.div key={ex.slug} variants={fadeUp} className="card-3d card-3d-lift">
              <Link
                href={`/experiences/${ex.slug}`}
                className="card-3d-inner group block bg-bg-orange overflow-hidden rounded-lg shadow-sm transition-colors duration-500"
              >
                <div className="branded-img card-shine relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={ex.image}
                    alt={ex.title}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
                    className="card-3d-img object-cover"
                    placeholder="blur"
                    blurDataURL={BRAND_LQIP}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-umber/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-cream">
                    <AdinkraIcon name={ex.adinkra} size={24} className="text-primary" />
                    <span className="font-poppins uppercase tracking-tracked text-[10px]">
                      {ex.label}
                    </span>
                  </div>
                </div>
                <div className="card-3d-float p-6">
                  <h3 className="font-belleza text-2xl text-umber group-hover:text-primary transition-colors">
                    {ex.title}
                  </h3>
                  <p className="mt-2 text-sm text-umber/70 leading-relaxed">{ex.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-poppins uppercase tracking-tracked-sm text-primary">
                    {t('experiences.discover')}
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
