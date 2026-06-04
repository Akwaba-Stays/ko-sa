import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import {
  Sparkles, HeartHandshake, Flower2, CupSoda, Waves, Wind,
  Sunrise, Brain, Battery, Star, Check, Gift,
} from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { WellnessEnquiryForm } from '@/components/marketing/WellnessEnquiryForm';
import { getT } from '@/lib/i18n/server';
import { listPublicTreatments } from '@/lib/cms/treatments';
import { listPublicWellnessPackages } from '@/lib/cms/wellness-packages';
import { listPublicStayEnhancements, groupByCategory } from '@/lib/cms/stay-enhancements';
import { getSetting } from '@/lib/cms/settings';
import {
  TREATMENTS_FALLBACK,
  treatmentPriceGhs,
  formatGhs,
  waLink,
  waPrefill,
} from '@/lib/pricing';

const CATEGORY_COLORS: Record<string, string> = {
  Leisure:     'bg-blue-50 text-blue-700 border-blue-200',
  Wellness:    'bg-teal-50 text-teal-700 border-teal-200',
  Romance:     'bg-rose-50 text-rose-700 border-rose-200',
  Celebration: 'bg-amber-50 text-amber-700 border-amber-200',
  Culture:     'bg-purple-50 text-purple-700 border-purple-200',
  'Day Visit': 'bg-orange-50 text-orange-700 border-orange-200',
  Eco:         'bg-green-50 text-green-700 border-green-200',
};

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
  const [cmsTreatments, wellnessPackages, allEnhancements, pricing] = await Promise.all([
    listPublicTreatments(),
    listPublicWellnessPackages().catch(() => []),
    listPublicStayEnhancements().catch(() => []),
    getSetting('pricing'),
  ]);
  const enhancementsByCategory = groupByCategory(allEnhancements);
  const showWellnessPrices = !pricing.hideWellnessPrices;
  const showEnhancementPrices = !pricing.hideEnhancementPrices;
  // Normalise to a single shape (name · duration · GHS price · slug) and fall
  // back to a curated menu so every treatment is bookable (Change Request §Page 03).
  const treatments = (cmsTreatments.length ? cmsTreatments : TREATMENTS_FALLBACK).map((tr) => ({
    id: 'id' in tr ? tr.id : tr.slug,
    slug: tr.slug,
    name: tr.name,
    durationMin: tr.durationMin,
    category: tr.category ?? null,
    priceGhs: treatmentPriceGhs(tr.slug, 'price' in tr ? tr.price : undefined),
  }));
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

      {/* Holistic approach - image + copy */}
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

      {/* Treatments menu - every treatment bookable (Change Request §Page 03) */}
      {treatments.length > 0 && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="container-page">
            <h2 className="font-playfair text-display-sm text-teal mb-8 text-center">
              {t('wellnessPage.treatmentsHeading')}
            </h2>
            <div className="max-w-3xl mx-auto divide-y divide-sand-300/60 bg-sand-light rounded-md shadow-sm">
              {treatments.map((tr) => (
                <div
                  key={tr.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5"
                >
                  <div>
                    <p className="font-playfair text-lg text-teal">{tr.name}</p>
                    <p className="text-xs font-opensans uppercase tracking-tracked text-forest/50">
                      {tr.durationMin} min
                      {showWellnessPrices ? ` · ${formatGhs(tr.priceGhs)}` : ''}
                      {tr.category ? ` · ${tr.category}` : ''}
                    </p>
                  </div>
                  <a
                    href={waLink(waPrefill.treatment(tr.name))}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-[11px] px-5 py-2.5 hover:bg-coral-600 transition-colors"
                  >
                    {t('wellnessPage.treatment.book')} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Wellness Packages */}
      {wellnessPackages.length > 0 && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">{t('wellnessPage.packages.eyebrow')}</p>
              <h2 className="font-playfair text-display-sm text-teal">{t('wellnessPage.packages.heading')}</h2>
              <p className="mt-4 font-raleway text-forest/75 leading-relaxed">
                {t('wellnessPage.packages.intro')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {wellnessPackages.map((pkg) => (
                <article key={pkg.id} className="bg-sand-light rounded-xl border border-sand-300/50 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <span className={`inline-block text-[10px] font-opensans uppercase tracking-tracked px-2.5 py-1 rounded-full border font-semibold ${CATEGORY_COLORS[pkg.category] ?? 'bg-sand text-umber/70 border-sand-300'}`}>
                          {pkg.category} · {pkg.durationLabel}
                        </span>
                        <h3 className="mt-3 font-playfair text-xl text-teal leading-tight">{pkg.name}</h3>
                        <p className="mt-1 font-raleway italic text-sm text-forest/65">{pkg.tagline}</p>
                      </div>
                    </div>
                    <ul className="flex-1 space-y-1.5 mb-6">
                      {pkg.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-raleway text-forest/80">
                          <Check size={13} className="text-coral shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-sand-300/60 pt-4 mt-auto">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-opensans text-forest/55">
                          {t('wellnessPage.packages.enquireRates')}
                        </p>
                        <a
                          href={waLink(`Hi Ko-Sa! I'd like to enquire about the ${pkg.name} package.`)}
                          target="_blank" rel="noreferrer"
                          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-[11px] px-4 py-2.5 hover:bg-coral-600 transition-colors"
                        >
                          {t('wellnessPage.packages.enquire')} →
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhance Your Stay */}
      {allEnhancements.length > 0 && (
        <section className="py-16 md:py-24 bg-sand-light">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">{t('wellnessPage.enhance.eyebrow')}</p>
              <h2 className="font-playfair text-display-sm text-teal flex items-center justify-center gap-2">
                <Gift size={28} className="text-coral" /> {t('wellnessPage.enhance.heading')}
              </h2>
              <p className="mt-4 font-raleway text-forest/75 leading-relaxed">
                {t('wellnessPage.enhance.intro')}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {Array.from(enhancementsByCategory.entries()).map(([category, items]) => (
                <div key={category}>
                  <h3 className="font-playfair text-xl text-teal mb-4 pb-2 border-b border-sand-300/60">{category}</h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-4 py-2">
                        <div className="flex-1">
                          <p className="font-opensans text-sm font-medium text-forest">{item.name}</p>
                          {item.description && (
                            <p className="text-xs text-forest/55 font-raleway mt-0.5">{item.description}</p>
                          )}
                          {item.priceNote && (
                            <p className="text-[10px] font-opensans uppercase tracking-tracked text-forest/40 mt-0.5">{item.priceNote}</p>
                          )}
                        </div>
                        {showEnhancementPrices && (
                          <p className="shrink-0 font-opensans text-sm font-semibold text-teal">
                            GHS {item.priceGhs.toLocaleString()}
                            {item.priceTo ? ` - ${item.priceTo.toLocaleString()}` : ''}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href={waLink("Hi Ko-Sa! I'd like to add an enhancement to my stay.")}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
              >
                {t('wellnessPage.enhance.cta')} →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Enquiry - day guests welcome */}
      <section className="py-16 md:py-24 bg-teal-700 text-cream">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="font-opensans uppercase tracking-tracked text-xs text-sunshine">
              {t('wellnessPage.enquiry.eyebrow')}
            </p>
            <h2 className="mt-3 font-playfair text-display-sm">{t('wellnessPage.enquiry.title')}</h2>
            <p className="mt-4 font-raleway text-cream/85 leading-relaxed">{t('wellnessPage.enquiry.body')}</p>
            <ul className="mt-6 space-y-2 text-cream/80 text-sm font-raleway">
              <li>{t('wellnessPage.enquiry.point1')}</li>
              <li>{t('wellnessPage.enquiry.point2')}</li>
              <li>{t('wellnessPage.enquiry.point3')}</li>
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
