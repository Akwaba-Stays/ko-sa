import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { WellnessEnquiryForm } from '@/components/marketing/WellnessEnquiryForm';
import { BookButton } from '@/components/shared/BookButton';
import { Reveal } from '@/components/shared/Reveal';
import { PullQuote } from '@/components/shared/PullQuote';
import { TreatmentsExplorer, type TreatmentCard } from '@/components/wellness/TreatmentsExplorer';
import { RetreatRhythm } from '@/components/wellness/RetreatRhythm';
import { getT } from '@/lib/i18n/server';
import { listPublicTreatments } from '@/lib/cms/treatments';
import { getSetting } from '@/lib/cms/settings';
import {
  TREATMENTS_FALLBACK,
  treatmentPriceGhs,
  ESCAPES,
  RETREAT_TIERS,
  formatGhs,
  waPrefill,
  type EscapeKey,
} from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Wellness',
  description:
    'Here is your permission to pause, Restore your energy, and just be. Spa, coaching, yoga by the sea, a herbal tea bar and slow days at KoSa Beach Resort, Elmina, Ghana.',
};

export const dynamic = 'force-dynamic';

const BASE = 'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public';
// New edited wellness photography (media/wellness/, June 2026).
const WELLNESS = `${BASE}/media/wellness`;

const HERO_IMG = `${WELLNESS}/banner.webp`;
const DAY_IMG = `${WELLNESS}/wellness-day-v2.webp`;

// Each offering becomes a full-width, magazine-style spread (image one side,
// copy the other), alternating left/right down the page. Each has one grounding
// sensory sentence so the visitor can picture being there.
const OFFERINGS = [
  { key: 'journeys', titleKey: 'wellnessPage.journeys.title', bodyKey: 'wellnessPage.journeys.body', senseKey: 'wellnessPage.journeys.sense', img: `${WELLNESS}/wellness-journeys-v2.webp` },
  { key: 'coaching', titleKey: 'wellnessPage.coaching.title', bodyKey: 'wellnessPage.coaching.body', senseKey: 'wellnessPage.coaching.sense', img: `${WELLNESS}/wellness-coaching-v2.webp` },
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

// Per-category fallback, only used if a treatment ever loses its own CMS image
// (all treatments now carry their own photo, editable at /admin/wellness).
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

  const packageNames = [
    ...(Object.keys(ESCAPES) as EscapeKey[]).map((k) => `${ESCAPES[k].name} Escape (1 Day)`),
    'The Signature Rotation Retreat',
    'Tide Reset Retreat — For Him',
    'Saltwater Bloom Retreat — For Her',
    'Private Wellness Consultation (Design My Own)',
  ];
  const programmes = [
    ...packageNames,
    ...OFFERINGS.map((o) => t(o.titleKey)),
    ...treatmentGroups.map((tr) => tr.name),
  ];

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

      {/* One-Day Escapes: Detox / Relaxation / Beauty, bundled pricing */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-page">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">
              One-Day Escapes
            </p>
            <h2 className="font-playfair text-display-sm text-teal">Signature Day Journeys</h2>
            <p className="mt-4 font-raleway text-forest/70 leading-relaxed">
              Three ways to spend a single unhurried day at O2. Each includes treatments, a fresh
              juice elixir where noted, and a wholesome meal.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-6xl mx-auto">
            {(Object.keys(ESCAPES) as EscapeKey[]).map((key, i) => {
              const esc = ESCAPES[key];
              const headerTone =
                key === 'detox'
                  ? 'bg-gradient-to-br from-teal-500 to-teal-800'
                  : key === 'relaxation'
                    ? 'bg-gradient-to-br from-teal-300 to-teal-600'
                    : 'bg-gradient-to-br from-sunshine-500 to-coral-600';
              return (
                <Reveal key={key} delay={i * 0.08} className="card-3d">
                  <div className="card-3d-inner card-shine group flex flex-col h-full bg-cream rounded-xl overflow-hidden shadow-sm transition-all duration-500">
                    <div className={`relative h-32 ${headerTone} flex items-end p-5`}>
                      <span className="font-opensans text-[10px] uppercase tracking-tracked text-cream/90">
                        {esc.theme}
                      </span>
                    </div>
                    <div className="card-3d-float p-6 flex flex-col flex-1">
                      <h3 className="font-playfair text-2xl text-teal mb-4">{esc.name}</h3>
                      <ul className="space-y-1.5 mb-5 flex-1">
                        {esc.items.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-baseline justify-between gap-3 text-xs font-opensans text-forest/70 border-b border-sand-300/40 pb-1.5"
                          >
                            <span>{item.name}</span>
                            <span className="font-semibold text-teal shrink-0">{formatGhs(item.ghs)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-baseline gap-2.5 mb-5">
                        <span className="text-xs text-forest/40 line-through">{formatGhs(esc.originalGhs)}</span>
                        <span className="font-playfair text-2xl text-teal">{formatGhs(esc.priceGhs)}</span>
                      </div>
                      <BookButton
                        category="PACKAGE"
                        itemName={`${esc.name} Escape`}
                        message={waPrefill.escape(esc.name)}
                        source="wellness/escapes"
                        className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-[11px] px-5 py-3 hover:bg-coral-600 transition-colors"
                      >
                        Reserve This Escape →
                      </BookButton>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Multi-Day Retreats: rotation tiers + interactive day-by-day rhythm */}
      <section className="py-20 md:py-28 bg-teal-700 text-cream">
        <div className="container-page">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-sunshine mb-3">
              Multi-Day Retreats
            </p>
            <h2 className="font-playfair text-display-sm text-cream">Give It Room to Breathe</h2>
            <p className="mt-4 font-raleway text-cream/70 leading-relaxed">
              The Signature Rotation carries Relaxation, Detox, and Beauty days across a longer
              stay, with room and full board included throughout.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            {RETREAT_TIERS.map((tier, i) => (
              <Reveal
                key={tier.days}
                delay={i * 0.08}
                className="rounded-xl bg-cream/10 border border-cream/20 backdrop-blur-md px-7 py-8 text-center transition-colors hover:bg-cream/[0.14] hover:border-sunshine/60"
              >
                <p className="font-playfair text-4xl text-cream">
                  {tier.days} <span className="font-opensans text-sm text-cream/60 tracking-tracked-sm">DAYS</span>
                </p>
                <p className="mt-2.5 mb-5 font-raleway italic text-xs text-cream/60">{tier.rotation}</p>
                <p className="font-playfair text-2xl text-sunshine">{formatGhs(tier.spaGhs)}</p>
                <p className="mt-1 font-opensans text-[11px] text-cream/55">
                  {formatGhs(tier.totalGhs)} total incl. {tier.days} nights
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <RetreatRhythm />
          </Reveal>
          <p className="text-center mt-6 font-raleway text-xs text-cream/45">
            The Signature Rotation extends to 7 or 10-day journeys — see tiers above.
          </p>
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

      {/* Closing CTA - Design Your Own, then the quiet lead-capture form */}
      <section className="py-20 md:py-28 bg-teal-700 text-cream">
        <div className="container-page max-w-3xl text-center">
          <Reveal>
            <p className="font-opensans uppercase tracking-tracked text-xs text-sunshine mb-4">
              Beyond The Menu
            </p>
            <h2 className="font-playfair text-display-md leading-tight">Or, let&rsquo;s design yours</h2>
            <p className="mt-5 font-raleway text-cream/85 leading-relaxed max-w-xl mx-auto">
              Not every guest fits a set journey. Sit with our wellness team for a private
              consultation, and we&rsquo;ll build something around what you actually need — pulled
              from our full treatment menu.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left max-w-2xl mx-auto">
              {[
                { n: '1', h: 'Consult', p: 'A private session to talk through goals, sensitivities, and time on property.' },
                { n: '2', h: 'Design', p: 'We build your itinerary from the same menu behind every package above.' },
                { n: '3', h: 'Arrive & Exhale', p: 'Your rhythm is ready when you check in — nothing left to plan.' },
              ].map((s) => (
                <div key={s.n} className="flex gap-3.5">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-sunshine text-teal-900 font-playfair text-sm grid place-items-center">
                    {s.n}
                  </span>
                  <div>
                    <h4 className="font-playfair text-base text-cream mb-1">{s.h}</h4>
                    <p className="font-raleway text-xs text-cream/65 leading-relaxed">{s.p}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <BookButton
                category="OTHER"
                itemName="Private Wellness Consultation"
                message={waPrefill.consultation()}
                source="wellness/closing"
                className="inline-flex items-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-sm px-8 py-4 hover:bg-coral-600 transition-colors"
              >
                Book a Consultation →
              </BookButton>
              <p className="mt-4 font-raleway text-xs text-cream/55">
                Private Wellness Consultation — <span className="text-sunshine font-semibold">GHS 200</span>,
                credited toward your custom itinerary.
              </p>
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
