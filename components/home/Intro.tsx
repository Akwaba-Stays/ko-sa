'use client';

import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { Section, Eyebrow, Heading, Lede, GoldDivider } from '@/components/shared/Section';
import { fadeUp } from '@/lib/animation/variants';
import { useT } from '@/lib/i18n';
import { BRAND_LQIP } from '@/lib/image';

export function Intro() {
  const { t } = useT();
  return (
    <Section id="intro" className="bg-bg-orange py-24 md:py-32 lg:py-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="lg:col-span-7 order-2 lg:order-1"
        >
          <Eyebrow>{t('intro.eyebrow')}</Eyebrow>
          <Heading className="mt-5">
            {t('intro.headline.l1')}
            <br />
            {t('intro.headline.l2')}
          </Heading>

          <GoldDivider className="my-10">
            <AdinkraIcon name="denkyem" size={36} className="text-primary" />
          </GoldDivider>

          <Lede>{t('intro.body')}</Lede>

          <p className="mt-6 font-beth text-3xl md:text-4xl text-primary/90">{t('intro.script')}</p>

          <Link
            href="/about/philosophy"
            className="mt-8 inline-flex items-center gap-2 font-poppins text-xs uppercase tracking-tracked text-umber hover:text-primary transition-colors group"
          >
            <span className="border-b border-primary/40 group-hover:border-primary pb-0.5">
              {t('intro.philosophyCta')}
            </span>
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-5 order-1 lg:order-2 relative"
        >
          <div className="branded-img relative aspect-[4/5] w-full overflow-hidden rounded-lg">
            <Image
              src="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/beach/11-772A2002.webp"
              alt="A linen-curtained KoSa room opening onto palm canopy at golden hour"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={BRAND_LQIP}
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:block">
            <AdinkraIcon name="knonsonkonson" size={72} className="text-primary opacity-90" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
