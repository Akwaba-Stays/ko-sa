import type { Metadata } from 'next';
import Link from 'next/link';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { MapPin, Plane, Check, CalendarRange } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { listPublicExperiences } from '@/lib/cms/experiences';
import { listPublicWellnessPackages } from '@/lib/cms/wellness-packages';
import { site } from '@/lib/site';
import { packageLine, waPrefill, type PackageKey } from '@/lib/pricing';
import { BookButton } from '@/components/shared/BookButton';

// Tailwind chips per package category (graceful default for unknown values).
const CATEGORY_COLORS: Record<string, string> = {
  Leisure:     'bg-blue-50 text-blue-700 border-blue-200',
  Wellness:    'bg-teal-50 text-teal-700 border-teal-200',
  Romance:     'bg-rose-50 text-rose-700 border-rose-200',
  Celebration: 'bg-amber-50 text-amber-700 border-amber-200',
  Culture:     'bg-purple-50 text-purple-700 border-purple-200',
  'Day Visit': 'bg-orange-50 text-orange-700 border-orange-200',
  Eco:         'bg-green-50 text-green-700 border-green-200',
};

const ITINERARIES: {
  key: PackageKey;
  labelKey: 'home.itineraries.weekend' | 'home.itineraries.short' | 'home.itineraries.full';
  titleKey: 'home.itineraries.weekend.title' | 'home.itineraries.short.title' | 'home.itineraries.full.title';
  bodyKey: 'home.itineraries.weekend.body' | 'home.itineraries.short.body' | 'home.itineraries.full.body';
}[] = [
  { key: 'weekend', labelKey: 'home.itineraries.weekend', titleKey: 'home.itineraries.weekend.title', bodyKey: 'home.itineraries.weekend.body' },
  { key: 'short', labelKey: 'home.itineraries.short', titleKey: 'home.itineraries.short.title', bodyKey: 'home.itineraries.short.body' },
  { key: 'full', labelKey: 'home.itineraries.full', titleKey: 'home.itineraries.full.title', bodyKey: 'home.itineraries.full.body' },
];

export const metadata: Metadata = {
  title: 'Plan Your Stay',
  description:
    'Everything you need to arrive ready what to do, getting here, airport transfers and FAQs for KO-SA Beach Resort, Ghana',
};

export const dynamic = 'force-dynamic';

const FAQS = [
  { q: 'planPage.faq.checkin.q', a: 'planPage.faq.checkin.a' },
  { q: 'planPage.faq.cancellation.q', a: 'planPage.faq.cancellation.a' },
  { q: 'planPage.faq.airport.q', a: 'planPage.faq.airport.a' },
  { q: 'planPage.faq.halal.q', a: 'planPage.faq.halal.a' },
  { q: 'planPage.faq.children.q', a: 'planPage.faq.children.a' },
  { q: 'planPage.faq.payment.q', a: 'planPage.faq.payment.a' },
  { q: 'planPage.faq.swim.q', a: 'planPage.faq.swim.a' },
  { q: 'planPage.faq.wellness.q', a: 'planPage.faq.wellness.a' },
] as const;

export default async function PlanPage() {
  const { t } = getT();
  const [experiences, stayPackages] = await Promise.all([
    listPublicExperiences(),
    listPublicWellnessPackages().catch(() => []),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t('nav.plan')}
        title={t('planPage.headline')}
        image="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/media/feeling/slowing-down-guests.webp"
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">{t('planPage.intro')}</p>
        </div>
      </section>

      {/* Stay Packages - moved above the experience tiles (Change Request §Plan).
          Curated, image-rich (relabelled from Wellness Packages). */}
      {stayPackages.length > 0 && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">{t('planPage.packages.eyebrow')}</p>
              <h2 className="font-playfair text-display-sm text-teal flex items-center justify-center gap-2">
                <CalendarRange size={28} className="text-coral" /> {t('planPage.packages.heading')}
              </h2>
              <p className="mt-4 font-raleway text-forest/75 leading-relaxed">
                {t('planPage.packages.intro')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {stayPackages.map((pkg) => (
                <article key={pkg.id} className="group bg-sand-light rounded-2xl border border-sand-300/50 overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow">
                  {/* Cover image (graceful gradient fallback before admin uploads one) */}
                  <div className="relative aspect-[16/10] branded-img overflow-hidden bg-gradient-to-br from-teal-100 via-sand to-coral/15">
                    {pkg.image ? (
                      <Image src={pkg.image} alt={pkg.name} fill sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-teal/30">
                        <CalendarRange size={44} />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-umber/60 to-transparent" />
                    <span className={`absolute top-3 left-3 inline-block text-[10px] font-opensans uppercase tracking-tracked px-2.5 py-1 rounded-full border font-semibold ${CATEGORY_COLORS[pkg.category] ?? 'bg-cream/90 text-umber/70 border-sand-300'}`}>
                      {pkg.category} · {pkg.durationLabel}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-playfair text-xl text-teal leading-tight">{pkg.name}</h3>
                    <p className="mt-1 font-raleway italic text-sm text-forest/65">{pkg.tagline}</p>
                    <ul className="mt-4 flex-1 space-y-1.5">
                      {pkg.inclusions.slice(0, 6).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-raleway text-forest/80">
                          <Check size={13} className="text-coral shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {pkg.inclusions.length > 6 && (
                        <li className="text-xs font-opensans text-forest/45 pl-5">
                          + {pkg.inclusions.length - 6} more
                        </li>
                      )}
                    </ul>
                    <div className="mt-5 pt-4 border-t border-sand-300/60 flex items-center justify-between gap-2">
                      <p className="text-xs font-opensans text-forest/55">
                        {t('planPage.packages.enquireRates')}
                      </p>
                      <BookButton
                        category="PACKAGE"
                        itemName={pkg.name}
                        message={`Hi Ko-Sa! I'd like to enquire about the ${pkg.name} package.`}
                        source="plan/packages"
                        className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-[11px] px-4 py-2.5 hover:bg-coral-600 transition-colors"
                      >
                        {t('planPage.packages.enquire')} →
                      </BookButton>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What to do here - real experiences from the CMS */}
      {experiences.length > 0 && (
        <section className="py-16 md:py-24 bg-sand-light">
          <div className="container-page">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-2">
              {t('planPage.experiences.eyebrow')}
            </p>
            <p className="font-raleway text-forest/75 max-w-2xl leading-relaxed mb-10">
              {t('planPage.experiences.body')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {experiences.map((e) => (
                <Link
                  key={e.id}
                  href={`/experiences/${e.slug}`}
                  className="group relative aspect-[3/4] rounded-md overflow-hidden branded-img flex items-end shadow-sm"
                >
                  {e.image && (
                    <Image
                      src={e.image}
                      alt={e.title}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-umber/85 via-umber/20 to-transparent" />
                  <div className="relative p-5 text-cream">
                    <p className="font-opensans uppercase tracking-tracked text-[10px] text-sunshine">{e.label}</p>
                    <h3 className="mt-1 font-playfair text-xl leading-tight">{e.title}</h3>
                    <span className="mt-2 inline-block font-opensans uppercase tracking-tracked-sm text-[10px] text-cream/80 group-hover:text-sunshine transition-colors">
                      {t('experiences.discover')} →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/experiences" className="text-xs font-opensans uppercase tracking-tracked-sm text-cream bg-coral rounded-full px-5 py-2.5 hover:bg-coral-600 transition-colors">
                {t('planPage.experiences.cta')}
              </Link>
              <BookButton
                category="PACKAGE"
                itemName="Customise my stay"
                message={waPrefill.customiseStay()}
                source="plan/experiences"
                className="text-xs font-opensans uppercase tracking-tracked-sm text-teal border border-teal/40 rounded-full px-5 py-2.5 hover:border-coral hover:text-coral transition-colors"
              >
                {t('planPage.itineraries.cta2')}
              </BookButton>
            </div>
          </div>
        </section>
      )}

      {/* Getting here */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 text-coral">
              <MapPin size={18} />
              <span className="font-opensans uppercase tracking-tracked text-xs">{t('nav.plan')}</span>
            </div>
            <h2 className="mt-3 font-playfair text-display-sm text-teal">{t('planPage.getting.title')}</h2>
            <p className="mt-4 font-raleway text-forest/80 leading-relaxed">{t('planPage.getting.body')}</p>
            <BookButton
              category="TRANSFER"
              itemName="Airport transfer"
              message="Hi Ko-Sa! I'd like to book an airport transfer. My arrival details are:"
              source="plan/getting-here"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
            >
              <Plane size={14} /> {t('planPage.getting.cta')}
            </BookButton>
          </div>
          <div className="rounded-md overflow-hidden shadow-sm aspect-[4/3] bg-sand">
            <iframe
              title={t('contactPage.mapTitle')}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${site.location.lat},${site.location.lng}&z=10&output=embed`}
            />
          </div>
        </div>
      </section>

      {/* Your Stay, Your Way - full itineraries above the FAQ (Change Request §Page 07) */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container-page">
          <div className="max-w-2xl mb-12">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-2">
              {t('planPage.itineraries.eyebrow')}
            </p>
            <h2 className="font-playfair text-display-sm text-teal">{t('planPage.itineraries.heading')}</h2>
            <p className="mt-4 font-raleway text-forest/75 leading-relaxed">{t('planPage.itineraries.body')}</p>
          </div>

          <div className="space-y-6">
            {ITINERARIES.map((it) => (
              <article key={it.key} className="bg-sand-light rounded-md p-8 md:p-10 shadow-sm">
                <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral">{t(it.labelKey)}</p>
                <h3 className="mt-2 font-playfair text-2xl text-teal">{t(it.titleKey)}</h3>
                <p className="mt-4 font-raleway text-forest/85 leading-relaxed">{t(it.bodyKey)}</p>
                <p className="mt-5 font-opensans text-sm text-forest font-medium">{packageLine(it.key)}</p>
                <p className="mt-4 font-raleway italic text-forest/60">{t('planPage.itineraries.eachClose')}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
                  >
                    {t('planPage.itineraries.bookThis')} →
                  </a>
                  <BookButton
                    category="PACKAGE"
                    itemName={`Customise: ${t(it.titleKey)}`}
                    message={waPrefill.customiseStay()}
                    source="plan/itineraries"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-teal/40 text-teal font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:border-coral hover:text-coral transition-colors"
                  >
                    {t('planPage.itineraries.cta2')} →
                  </BookButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <h2 className="font-playfair text-display-sm text-teal mb-8 text-center">{t('planPage.faqs.title')}</h2>
          <FaqAccordion items={FAQS.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
        </div>
      </section>
    </>
  );
}
