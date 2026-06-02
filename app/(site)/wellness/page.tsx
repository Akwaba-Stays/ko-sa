import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import {
  Sparkles, HeartHandshake, Flower2, CupSoda, Waves, Wind,
  Sunrise, Brain, Battery, Star,
} from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { WellnessEnquiryForm } from '@/components/marketing/WellnessEnquiryForm';
import { getT } from '@/lib/i18n/server';
import { listPublicTreatments } from '@/lib/cms/treatments';

export const metadata: Metadata = {
  title: 'Wellness',
  description:
    'Your wellness journey starts here nature restores. Spa, coaching, yoga by the sea, herbal tea bar and mindfulness at KO-SA Beach Resort. Open to day guests too',
};

export const dynamic = 'force-dynamic';

const BASE = 'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public';
const WELL = `${BASE}/gallery/wellness`;
const MEDIA = `${BASE}/media`;

// The six wellness features (ko-sa.com/wellness).
const FEATURES = [
  { icon: Flower2, titleKey: 'wellnessPage.feat.spa.title', bodyKey: 'wellnessPage.feat.spa.body' },
  { icon: HeartHandshake, titleKey: 'wellnessPage.feat.coaching.title', bodyKey: 'wellnessPage.feat.coaching.body' },
  { icon: CupSoda, titleKey: 'wellnessPage.feat.tea.title', bodyKey: 'wellnessPage.feat.tea.body' },
  { icon: Waves, titleKey: 'wellnessPage.feat.yoga.title', bodyKey: 'wellnessPage.feat.yoga.body' },
  { icon: Wind, titleKey: 'wellnessPage.feat.mindful.title', bodyKey: 'wellnessPage.feat.mindful.body' },
  { icon: Sunrise, titleKey: 'wellnessPage.feat.nature.title', bodyKey: 'wellnessPage.feat.nature.body' },
] as const;

// Image-backed pillars (the four ways wellness shows up across a stay).
const PILLARS = [
  { icon: Sparkles, titleKey: 'wellnessPage.journeys.title', bodyKey: 'wellnessPage.journeys.body', img: `${WELL}/0-772A2086.webp` },
  { icon: HeartHandshake, titleKey: 'wellnessPage.coaching.title', bodyKey: 'wellnessPage.coaching.body', img: `${WELL}/3-772A2129.webp` },
  { icon: Flower2, titleKey: 'wellnessPage.spa.title', bodyKey: 'wellnessPage.spa.body', img: `${WELL}/2-772A2097.webp` },
  { icon: CupSoda, titleKey: 'wellnessPage.tea.title', bodyKey: 'wellnessPage.tea.body', img: `${MEDIA}/drinks/drinks-img_3524.webp` },
] as const;

// The four benefits (ko-sa.com/wellness).
const BENEFITS = [
  { icon: Sparkles, titleKey: 'wellnessPage.benefit.stress.title', bodyKey: 'wellnessPage.benefit.stress.body' },
  { icon: Battery, titleKey: 'wellnessPage.benefit.renewal.title', bodyKey: 'wellnessPage.benefit.renewal.body' },
  { icon: Brain, titleKey: 'wellnessPage.benefit.clarity.title', bodyKey: 'wellnessPage.benefit.clarity.body' },
  { icon: Star, titleKey: 'wellnessPage.benefit.lasting.title', bodyKey: 'wellnessPage.benefit.lasting.body' },
] as const;

const STRIP = [
  `${MEDIA}/beach/beach-shots-img_3588.webp`,
  `${WELL}/2-772A2097.webp`,
  `${MEDIA}/scenery/scenery-kosa3.webp`,
  `${MEDIA}/environment/general-environment-img_3964.webp`,
] as const;

export default async function WellnessPage() {
  const { t } = getT();
  const treatments = await listPublicTreatments();
  const programmes = [...FEATURES.map((f) => t(f.titleKey)), ...treatments.map((tr) => tr.name)];

  return (
    <>
      <PageHero
        eyebrow={t('nav.wellness')}
        title={t('wellnessPage.hero.title')}
        subtitle={t('wellnessPage.hero.sub')}
        image={`${MEDIA}/beach/beach-shots-screenshot-2026-02-09-081805.webp`}
      />

      {/* Our approach */}
      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral">
              {t('wellnessPage.approach.eyebrow')}
            </p>
            <h2 className="mt-3 font-playfair text-display-sm text-teal">{t('wellnessPage.approach.title')}</h2>
            <p className="mt-5 font-raleway text-lg text-forest/85 leading-relaxed">{t('wellnessPage.approach.body1')}</p>
            <p className="mt-4 font-raleway text-forest/75 leading-relaxed">{t('wellnessPage.approach.body2')}</p>
          </div>
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-lg overflow-hidden branded-img shadow-sm">
            <Image
              src={`${MEDIA}/scenery/scenery-kosa2.webp`}
              alt={t('wellnessPage.approach.title')}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Six features */}
      <section className="py-4 bg-sand-light">
        <div className="container-page">
          <h2 className="font-playfair text-display-sm text-teal text-center mb-12">
            {t('wellnessPage.features.heading')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <article key={f.titleKey} className="bg-cream rounded-lg p-7 shadow-sm border border-sand-300/40">
                  <div className="grid place-items-center h-12 w-12 rounded-full bg-teal/10 text-teal">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 font-playfair text-xl text-teal">{t(f.titleKey)}</h3>
                  <p className="mt-2 font-raleway text-sm text-forest/75 leading-relaxed">{t(f.bodyKey)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image-backed pillars */}
      <section className="py-16 md:py-20 bg-sand-light">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.titleKey}
                className="group relative overflow-hidden rounded-lg branded-img min-h-[340px] flex items-end shadow-sm"
              >
                <Image
                  src={p.img}
                  alt={t(p.titleKey)}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-umber/90 via-umber/35 to-transparent" />
                <div className="relative p-7 text-cream">
                  <Icon size={26} className="text-sunshine" />
                  <h3 className="mt-3 font-playfair text-2xl">{t(p.titleKey)}</h3>
                  <p className="mt-2 font-raleway text-cream/85 leading-relaxed max-w-md">{t(p.bodyKey)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Holistic approach — image + copy */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-lg overflow-hidden branded-img shadow-sm order-1 lg:order-2">
            <Image
              src={`${MEDIA}/environment/general-environment-img_3589.webp`}
              alt={t('wellnessPage.holistic.title')}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 order-2 lg:order-1">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral">
              {t('wellnessPage.holistic.eyebrow')}
            </p>
            <h2 className="mt-3 font-playfair text-display-sm text-teal">{t('wellnessPage.holistic.title')}</h2>
            <p className="mt-5 font-raleway text-lg text-forest/85 leading-relaxed">{t('wellnessPage.holistic.body1')}</p>
            <p className="mt-4 font-raleway text-forest/75 leading-relaxed">{t('wellnessPage.holistic.body2')}</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-sand-light">
        <div className="container-page">
          <h2 className="font-playfair text-display-sm text-teal text-center mb-12">
            {t('wellnessPage.benefits.heading')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <article key={b.titleKey} className="text-center">
                  <div className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-coral/10 text-coral">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 font-playfair text-xl text-teal">{t(b.titleKey)}</h3>
                  <p className="mt-2 font-raleway text-sm text-forest/75 leading-relaxed">{t(b.bodyKey)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Imagery strip */}
      <section className="pb-16 bg-sand-light">
        <div className="container-page grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {STRIP.map((src, i) => (
            <div key={src} className="relative aspect-[3/4] rounded-md overflow-hidden branded-img">
              <Image src={src} alt={`KO-SA wellness ${i + 1}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Treatments menu, if present in the CMS */}
      {treatments.length > 0 && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="container-page">
            <h2 className="font-playfair text-display-sm text-teal mb-8 text-center">
              {t('wellnessPage.treatmentsHeading')}
            </h2>
            <div className="max-w-3xl mx-auto divide-y divide-sand-300/60 bg-sand-light rounded-md shadow-sm">
              {treatments.map((tr) => (
                <div key={tr.id} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div>
                    <p className="font-playfair text-lg text-teal">{tr.name}</p>
                    <p className="text-xs font-opensans uppercase tracking-tracked text-forest/50">
                      {tr.durationMin} min{tr.category ? ` · ${tr.category}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enquiry — day guests welcome */}
      <section className="py-16 md:py-24 bg-teal-700 text-cream">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="font-opensans uppercase tracking-tracked text-xs text-sunshine">
              {t('wellnessPage.enquiry.eyebrow')}
            </p>
            <h2 className="mt-3 font-playfair text-display-sm">{t('wellnessPage.enquiry.title')}</h2>
            <p className="mt-4 font-raleway text-cream/85 leading-relaxed">{t('wellnessPage.enquiry.body')}</p>
            <ul className="mt-6 space-y-2 text-cream/80 text-sm font-raleway">
              <li>— {t('wellnessPage.enquiry.point1')}</li>
              <li>— {t('wellnessPage.enquiry.point2')}</li>
              <li>— {t('wellnessPage.enquiry.point3')}</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <WellnessEnquiryForm programmes={programmes} />
          </div>
        </div>
      </section>
    </>
  );
}
