import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { WellnessEnquiryForm } from '@/components/marketing/WellnessEnquiryForm';
import { BookButton } from '@/components/shared/BookButton';
import { Reveal } from '@/components/shared/Reveal';
import { PullQuote } from '@/components/shared/PullQuote';
import { TreatmentsExplorer, type TreatmentCard } from '@/components/wellness/TreatmentsExplorer';
import { getT } from '@/lib/i18n/server';
import { listPublicTreatments } from '@/lib/cms/treatments';
import { getSetting } from '@/lib/cms/settings';
import {
  TREATMENTS_FALLBACK,
  treatmentPriceGhs,
} from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Wellness',
  description:
    'You don\'t need a programme. You need permission to stop. Spa, coaching, yoga by the sea, a herbal tea bar and slow days at KoSa Beach Resort, Elmina, Ghana.',
};

export const dynamic = 'force-dynamic';

const BASE = 'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public';
// New edited wellness photography (media/wellness/, June 2026).
const WELLNESS = `${BASE}/media/wellness`;

const HERO_IMG = `${WELLNESS}/banner.webp`;
const DAY_IMG = `${WELLNESS}/palm-grove-loungers.webp`;

// Each offering becomes a full-width, magazine-style spread (image one side,
// copy the other), alternating left/right down the page. Each has one grounding
// sensory sentence so the visitor can picture being there.
const OFFERINGS = [
  { key: 'journeys', titleKey: 'wellnessPage.journeys.title', bodyKey: 'wellnessPage.journeys.body', senseKey: 'wellnessPage.journeys.sense', img: `${WELLNESS}/wellness-journeys.webp` },
  { key: 'coaching', titleKey: 'wellnessPage.coaching.title', bodyKey: 'wellnessPage.coaching.body', senseKey: 'wellnessPage.coaching.sense', img: `${WELLNESS}/coaching-stillness.webp` },
  { key: 'spa', titleKey: 'wellnessPage.spa.title', bodyKey: 'wellnessPage.spa.body', senseKey: 'wellnessPage.spa.sense', img: `${WELLNESS}/spa-services.webp` },
  { key: 'tea', titleKey: 'wellnessPage.tea.title', bodyKey: 'wellnessPage.tea.body', senseKey: 'wellnessPage.tea.sense', img: `${WELLNESS}/kosa-tea-bar.webp` },
  { key: 'yoga', titleKey: 'wellnessPage.yoga.title', bodyKey: 'wellnessPage.yoga.body', senseKey: 'wellnessPage.yoga.sense', img: `${WELLNESS}/yoga-by-the-sea.webp` },
] as const;

// A flowing day, not a table.
const DAY = [
  { timeKey: 'wellnessPage.day.s1.time', textKey: 'wellnessPage.day.s1.text' },
  { timeKey: 'wellnessPage.day.s2.time', textKey: 'wellnessPage.day.s2.text' },
  { timeKey: 'wellnessPage.day.s3.time', textKey: 'wellnessPage.day.s3.text' },
  { timeKey: 'wellnessPage.day.s4.time', textKey: 'wellnessPage.day.s4.text' },
  { timeKey: 'wellnessPage.day.s5.time', textKey: 'wellnessPage.day.s5.text' },
  { timeKey: 'wellnessPage.day.s6.time', textKey: 'wellnessPage.day.s6.text' },
  { timeKey: 'wellnessPage.day.s7.time', textKey: 'wellnessPage.day.s7.text' },
] as const;

// Representative image per treatment category (treatments carry no own photo
// in the CMS yet). Keeps each card visual and on-brand.
const CATEGORY_IMG: Record<string, string> = {
  'KoSa Health Spa': `${WELLNESS}/spa-services.webp`,
  'O2 Wellness': `${WELLNESS}/wellness-journeys.webp`,
};
const DEFAULT_TREATMENT_IMG = `${WELLNESS}/spa-services.webp`;

export default async function WellnessPage() {
  const { t } = getT();
  const [cmsTreatments, pricing] = await Promise.all([
    listPublicTreatments(),
    getSetting('pricing'),
  ]);
  const showWellnessPrices = !pricing.hideWellnessPrices;

  const treatments = (cmsTreatments.length ? cmsTreatments : TREATMENTS_FALLBACK).map((tr) => ({
    id: 'id' in tr ? tr.id : tr.slug,
    slug: tr.slug,
    name: tr.name,
    description: 'description' in tr ? tr.description ?? null : null,
    durationMin: tr.durationMin,
    category: tr.category ?? null,
    image: 'image' in tr ? tr.image : null,
    priceGhs: treatmentPriceGhs(tr.slug, 'price' in tr ? tr.price : undefined),
  }));

  // Collapse duplicate-duration entries into one card with variants.
  const baseName = (name: string) => name.replace(/\s*\(\s*\d+\s*min\s*\)\s*$/i, '').trim();
  const treatmentGroups: TreatmentCard[] = (() => {
    const map = new Map<string, TreatmentCard>();
    for (const tr of treatments) {
      const name = baseName(tr.name);
      const key = `${tr.category ?? ''}::${name.toLowerCase()}`;
      const existing = map.get(key);
      if (existing) {
        existing.variants.push({ durationMin: tr.durationMin, priceGhs: tr.priceGhs });
        if (!existing.description && tr.description) existing.description = tr.description;
      } else {
        map.set(key, {
          key,
          name,
          category: tr.category,
          description: tr.description,
          image: tr.image ?? (tr.category ? CATEGORY_IMG[tr.category] : null) ?? DEFAULT_TREATMENT_IMG,
          variants: [{ durationMin: tr.durationMin, priceGhs: tr.priceGhs }],
        });
      }
    }
    for (const g of map.values()) g.variants.sort((a, b) => a.durationMin - b.durationMin);
    return Array.from(map.values());
  })();

  const programmes = [...OFFERINGS.map((o) => t(o.titleKey)), ...treatmentGroups.map((tr) => tr.name)];

  return (
    <>
      {/* Hero: full-screen, edge-to-edge, a single line. Nothing else. */}
      <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden text-cream">
        <Image src={HERO_IMG} alt="" fill priority sizes="100vw" className="object-cover branded-img" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/45 via-teal-900/30 to-teal-900/70" />
        <div className="relative h-full container-page flex items-center justify-center">
          <Reveal delay={0.1} className="max-w-4xl text-center">
            <h1 className="font-playfair text-[clamp(2rem,5vw,4.5rem)] leading-[1.12] drop-shadow-[0_2px_30px_rgba(0,0,0,0.45)]">
              {t('wellnessPage.hero.line')}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Short intro - sets the tone before the offerings */}
      <section className="py-20 md:py-28 bg-sand-light">
        <div className="container-page max-w-3xl text-center">
          <Reveal>
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-4">
              {t('wellnessPage.approach.eyebrow')}
            </p>
            <p className="font-raleway text-xl md:text-2xl text-forest/85 leading-relaxed">
              {t('wellnessPage.approach.body1')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Offerings: full-width alternating spreads, each with a sensory line */}
      {OFFERINGS.map((o, i) => {
        const imageLeft = i % 2 === 0;
        return (
          <section key={o.key} className="grid grid-cols-1 lg:grid-cols-2 items-stretch bg-cream">
            <div
              className={`relative min-h-[56vh] lg:min-h-[78vh] branded-img overflow-hidden ${
                imageLeft ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <Image
                src={o.img}
                alt={t(o.titleKey)}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              className={`flex items-center px-6 md:px-12 lg:px-20 py-16 lg:py-24 ${
                imageLeft ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <Reveal className="max-w-xl">
                <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">
                  {t('wellnessPage.offerings.eyebrow')}
                </p>
                <h2 className="font-playfair text-display-sm text-teal leading-tight">{t(o.titleKey)}</h2>
                <p className="mt-5 font-raleway text-lg text-forest/85 leading-relaxed">{t(o.bodyKey)}</p>
                <p className="mt-4 font-raleway italic text-forest/65 leading-relaxed border-l-2 border-coral/40 pl-4">
                  {t(o.senseKey)}
                </p>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* Pull quote between the offerings and the day timeline */}
      <PullQuote tone="sand">{t('quote.ocean')}</PullQuote>

      {/* What a wellness day at KoSa looks like - a flowing sequence, not a table */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-page">
          <Reveal className="text-center mb-14 max-w-3xl mx-auto">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">
              {t('wellnessPage.day.eyebrow')}
            </p>
            <h2 className="font-playfair text-display-sm text-teal">{t('wellnessPage.day.heading')}</h2>
            <p className="mt-4 font-raleway text-forest/70 leading-relaxed">{t('wellnessPage.day.intro')}</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            <ol className="relative lg:col-span-7">
              {/* soft vertical line through the day */}
              <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-coral/25 md:left-[calc(8rem+7px)]" />
              {DAY.map((step, i) => (
                <li key={step.timeKey}>
                  <Reveal delay={i * 0.05} className="relative flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 pb-9 last:pb-0">
                    <span className="md:w-32 md:text-right font-opensans uppercase tracking-tracked text-[11px] text-teal/70 shrink-0">
                      {t(step.timeKey)}
                    </span>
                    <span aria-hidden className="absolute left-0 md:left-32 top-1.5 h-3.5 w-3.5 rounded-full bg-coral ring-4 ring-cream" />
                    <p className="md:pl-8 font-raleway text-forest/85 leading-relaxed">{t(step.textKey)}</p>
                  </Reveal>
                </li>
              ))}
            </ol>

            {/* The palm grove where most of this day happens. Sticky so it
                keeps the visitor company while the day scrolls by. */}
            <Reveal className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden branded-img shadow-sm">
                <Image
                  src={DAY_IMG}
                  alt={t('wellnessPage.day.heading')}
                  fill
                  sizes="(min-width:1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Treatments - filter by offering type, browse two at a time */}
      {treatmentGroups.length > 0 && (
        <section className="py-16 md:py-24 bg-sand-light">
          <div className="container-page">
            <Reveal className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="font-playfair text-display-sm text-teal">
                {t('wellnessPage.treatmentsHeading')}
              </h2>
              <p className="mt-4 font-raleway text-forest/70 leading-relaxed">
                {t('wellnessPage.treatmentsIntro')}
              </p>
            </Reveal>
            <TreatmentsExplorer
              treatments={treatmentGroups}
              showPrices={showWellnessPrices}
              labels={{ all: t('rooms.filter.all'), book: t('wellnessPage.treatment.book') }}
            />
          </div>
        </section>
      )}

      {/* Closing CTA - personal, not transactional */}
      <section className="py-20 md:py-28 bg-teal-700 text-cream">
        <div className="container-page max-w-3xl text-center">
          <Reveal>
            <p className="font-opensans uppercase tracking-tracked text-xs text-sunshine mb-4">
              {t('wellnessPage.closing.eyebrow')}
            </p>
            <h2 className="font-playfair text-display-md leading-tight">{t('wellnessPage.closing.headline')}</h2>
            <p className="mt-5 font-raleway text-cream/85 leading-relaxed max-w-xl mx-auto">
              {t('wellnessPage.closing.body')}
            </p>
            <div className="mt-8">
              <BookButton
                category="OTHER"
                itemName="Wellness during my stay"
                message="Hi KoSa! I'd like to find out about wellness during my stay."
                source="wellness/closing"
                className="inline-flex items-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-sm px-8 py-4 hover:bg-coral-600 transition-colors"
              >
                {t('wellnessPage.closing.cta')} →
              </BookButton>
            </div>
          </Reveal>

          {/* Quiet lead-capture below the personal CTA (day guests welcome) */}
          <div className="mt-16 text-left">
            <WellnessEnquiryForm programmes={programmes} />
          </div>
        </div>
      </section>
    </>
  );
}
