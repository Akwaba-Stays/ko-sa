import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { Flower2, Gift } from 'lucide-react';
import { WellnessEnquiryForm } from '@/components/marketing/WellnessEnquiryForm';
import { BookButton } from '@/components/shared/BookButton';
import { Reveal } from '@/components/shared/Reveal';
import { PullQuote } from '@/components/shared/PullQuote';
import { getT } from '@/lib/i18n/server';
import { listPublicTreatments } from '@/lib/cms/treatments';
import { listPublicStayEnhancements, groupByCategory } from '@/lib/cms/stay-enhancements';
import { getSetting } from '@/lib/cms/settings';
import {
  TREATMENTS_FALLBACK,
  treatmentPriceGhs,
  formatGhs,
  waPrefill,
} from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Wellness',
  description:
    'You don\'t need a programme. You need permission to stop. Spa, coaching, yoga by the sea, a herbal tea bar and slow days at KO-SA Beach Resort, Elmina, Ghana.',
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

export default async function WellnessPage() {
  const { t } = getT();
  const [cmsTreatments, allEnhancements, pricing] = await Promise.all([
    listPublicTreatments(),
    listPublicStayEnhancements().catch(() => []),
    getSetting('pricing'),
  ]);
  const enhancementsByCategory = groupByCategory(allEnhancements);
  const showWellnessPrices = !pricing.hideWellnessPrices;
  const showEnhancementPrices = !pricing.hideEnhancementPrices;

  const treatments = (cmsTreatments.length ? cmsTreatments : TREATMENTS_FALLBACK).map((tr) => ({
    id: 'id' in tr ? tr.id : tr.slug,
    slug: tr.slug,
    name: tr.name,
    durationMin: tr.durationMin,
    category: tr.category ?? null,
    image: 'image' in tr ? tr.image : null,
    priceGhs: treatmentPriceGhs(tr.slug, 'price' in tr ? tr.price : undefined),
  }));

  // Collapse duplicate-duration entries into one card with variants.
  const baseName = (name: string) => name.replace(/\s*\(\s*\d+\s*min\s*\)\s*$/i, '').trim();
  const treatmentGroups = (() => {
    const map = new Map<string, {
      key: string; name: string; category: string | null; image: string | null;
      variants: { durationMin: number; priceGhs: number }[];
    }>();
    for (const tr of treatments) {
      const name = baseName(tr.name);
      const key = `${tr.category ?? ''}::${name.toLowerCase()}`;
      const existing = map.get(key);
      if (existing) {
        existing.variants.push({ durationMin: tr.durationMin, priceGhs: tr.priceGhs });
        if (!existing.image && tr.image) existing.image = tr.image;
      } else {
        map.set(key, { key, name, category: tr.category, image: tr.image, variants: [{ durationMin: tr.durationMin, priceGhs: tr.priceGhs }] });
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
            <p className="mt-5 font-raleway text-forest/70 leading-relaxed">
              {t('wellnessPage.approach.body2')}
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

      {/* What a wellness day at Ko-Sa looks like - a flowing sequence, not a table */}
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

      {/* Treatments - bookable, collapsed duration/price variants */}
      {treatmentGroups.length > 0 && (
        <section className="py-16 md:py-24 bg-sand-light">
          <div className="container-page">
            <Reveal>
              <h2 className="font-playfair text-display-sm text-teal mb-10 text-center">
                {t('wellnessPage.treatmentsHeading')}
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatmentGroups.map((tr) => (
                <article
                  key={tr.key}
                  className="group bg-cream rounded-xl overflow-hidden border border-sand-300/40 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="relative aspect-[4/3] branded-img overflow-hidden bg-gradient-to-br from-teal-100 to-sand">
                    {tr.image ? (
                      <Image src={tr.image} alt={tr.name} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-teal/40">
                        <Flower2 size={40} />
                      </div>
                    )}
                    {tr.category && (
                      <span className="absolute top-3 left-3 text-[10px] font-opensans uppercase tracking-tracked bg-cream/90 text-teal px-2.5 py-1 rounded-full">
                        {tr.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-playfair text-lg text-teal">{tr.name}</h3>
                    <ul className="mt-2 space-y-1">
                      {tr.variants.map((v) => (
                        <li key={v.durationMin} className="flex items-baseline justify-between gap-3 text-xs font-opensans text-forest/70">
                          <span className="uppercase tracking-tracked-sm">{v.durationMin} min</span>
                          {showWellnessPrices && <span className="font-semibold text-teal">{formatGhs(v.priceGhs)}</span>}
                        </li>
                      ))}
                    </ul>
                    <BookButton
                      category="TREATMENT"
                      itemName={tr.name}
                      message={waPrefill.treatment(tr.name)}
                      source="wellness/treatments"
                      className="mt-4 self-start inline-flex items-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-[11px] px-5 py-2.5 hover:bg-coral-600 transition-colors"
                    >
                      {t('wellnessPage.treatment.book')} →
                    </BookButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhance Your Stay */}
      {allEnhancements.length > 0 && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="container-page">
            <Reveal className="text-center max-w-2xl mx-auto mb-12">
              <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">{t('wellnessPage.enhance.eyebrow')}</p>
              <h2 className="font-playfair text-display-sm text-teal flex items-center justify-center gap-2">
                <Gift size={28} className="text-coral" /> {t('wellnessPage.enhance.heading')}
              </h2>
              <p className="mt-4 font-raleway text-forest/75 leading-relaxed">{t('wellnessPage.enhance.intro')}</p>
            </Reveal>
            <div className="space-y-12">
              {Array.from(enhancementsByCategory.entries()).map(([category, items]) => (
                <div key={category}>
                  <h3 className="font-playfair text-xl text-teal mb-5 pb-2 border-b border-sand-300/60">{category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <article key={item.id} className="group bg-sand-light rounded-xl overflow-hidden border border-sand-300/40 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <div className="relative aspect-[4/3] branded-img overflow-hidden bg-gradient-to-br from-coral/15 to-sand">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105" />
                          ) : (
                            <div className="absolute inset-0 grid place-items-center text-coral/40"><Gift size={36} /></div>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <p className="font-playfair text-base text-teal">{item.name}</p>
                          {item.description && (
                            <p className="mt-1 text-xs text-forest/60 font-raleway leading-relaxed">{item.description}</p>
                          )}
                          <div className="mt-3 pt-3 border-t border-sand-300/50 flex items-center justify-between gap-2">
                            {showEnhancementPrices ? (
                              <p className="font-opensans text-sm font-semibold text-teal">
                                GHS {item.priceGhs.toLocaleString()}
                                {item.priceTo ? ` - ${item.priceTo.toLocaleString()}` : ''}
                                {item.priceNote ? <span className="block text-[10px] font-normal text-forest/45 uppercase tracking-tracked">{item.priceNote}</span> : null}
                              </p>
                            ) : <span />}
                            <BookButton
                              category="ENHANCEMENT"
                              itemName={item.name}
                              message={`Hi Ko-Sa! I'd like to add ${item.name} to my stay.`}
                              source="wellness/enhance"
                              className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-coral text-coral font-opensans uppercase tracking-tracked-sm text-[10px] px-3 py-2 hover:bg-coral hover:text-cream transition-colors"
                            >
                              {t('wellnessPage.enhance.enquire')} →
                            </BookButton>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
                message="Hi Ko-Sa! I'd like to find out about wellness during my stay."
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
