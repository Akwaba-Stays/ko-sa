import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { listPublicDiningVenues } from '@/lib/cms/dining';
import { DiningMenu } from '@/components/dining/DiningMenu';
import { BookButton } from '@/components/shared/BookButton';
import { waPrefill } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Dining',
  description:
    'Food the way the coast intended · Fresh, local, Ghanaian cooking restaurant, bar, breakfast and private dining at KoSa Beach Resort',
};

export const dynamic = 'force-dynamic';

// Edited dining photography (media/dining/). Selected per section, July 2026.
const DINE = 'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/media/dining';

const SECTIONS = [
  {
    key: 'restaurant',
    titleKey: 'diningPage.restaurant.title',
    bodyKey: 'diningPage.restaurant.body',
    hoursKey: 'diningPage.restaurant.hours' as const,
    image: `${DINE}/the-restaurant-jollof-chicken.webp`,
    cta: {
      labelKey: 'diningPage.restaurant.cta' as const,
      category: 'DINING' as const,
      itemName: 'Table reservation',
      message: waPrefill.reserveTable(),
    },
  },
  {
    key: 'bar',
    // Show the bar's real name ("Kooki Beach Bar") under the section title.
    titleKey: 'diningPage.bar.title',
    nameKey: 'diningPage.bar.name' as const,
    bodyKey: 'diningPage.bar.body',
    hoursKey: 'diningPage.bar.hours' as const,
    image: `${DINE}/the-bar-cocktails.webp`,
  },
  {
    key: 'breakfast',
    titleKey: 'diningPage.breakfast.title',
    bodyKey: 'diningPage.breakfast.body',
    hoursKey: 'diningPage.breakfast.hours' as const,
    image: `${DINE}/breakfast-pancakes.webp`,
  },
  {
    key: 'private',
    titleKey: 'diningPage.private.title',
    leadKey: 'diningPage.private.lead' as const,
    bodyKey: 'diningPage.private.body',
    image: `${DINE}/private-beach-dining.webp`,
    cta: {
      labelKey: 'diningPage.private.cta' as const,
      category: 'DINING' as const,
      itemName: 'Private & beach dining',
      message: waPrefill.privateDining(),
    },
  },
] as const;

export default async function DiningPage() {
  const { t } = getT();
  const venues = await listPublicDiningVenues();

  return (
    <>
      <PageHero
        eyebrow={t('nav.dine')}
        title={t('diningPage.headline')}
        image={`${DINE}/hero-seafood-grill.webp`}
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">
            {t('diningPage.intro')}
          </p>
          {/* Reserve a Table immediately after the intro (Change Request §Page 04) */}
          <BookButton
            category="DINING"
            itemName="Table reservation"
            message={waPrefill.reserveTable()}
            source="dining/intro"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
          >
            {t('diningPage.reserveCta')} →
          </BookButton>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-sand-light">
        <div className="container-page space-y-16 md:space-y-24">
          {SECTIONS.map((s, i) => (
            <article
              key={s.key}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}
            >
              <div className="lg:col-span-6 relative aspect-[4/3] rounded-md overflow-hidden branded-img">
                <Image src={s.image} alt={t(s.titleKey)} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="lg:col-span-6">
                <h2 className="font-playfair text-display-sm text-teal">{t(s.titleKey)}</h2>
                {'nameKey' in s && s.nameKey && (
                  <p className="mt-1 font-raleway italic text-coral">{t(s.nameKey)}</p>
                )}
                {'leadKey' in s && s.leadKey && (
                  <p className="mt-4 font-playfair text-xl text-coral">{t(s.leadKey)}</p>
                )}
                <p className="mt-4 font-raleway text-forest/80 leading-relaxed">{t(s.bodyKey)}</p>
                {'hoursKey' in s && s.hoursKey && (
                  <p className="mt-3 font-opensans uppercase tracking-tracked text-[10px] text-forest/60">
                    {t(s.hoursKey)}
                  </p>
                )}
                {'cta' in s && s.cta && (
                  <BookButton
                    category={s.cta.category}
                    itemName={s.cta.itemName}
                    message={s.cta.message}
                    source={`dining/${s.key}`}
                    className="mt-6 inline-flex items-center gap-2 font-opensans uppercase tracking-tracked text-xs text-coral hover:text-coral-700"
                  >
                    {t(s.cta.labelKey)} →
                  </BookButton>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive, filterable menu from the Dining CMS */}
      {venues.some((v) => v.sections.some((s) => s.items.length)) && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="container-page">
            {venues
              .filter((v) => v.sections.some((s) => s.items.length))
              .map((v) => (
                <div key={v.id} className="mb-16 last:mb-0">
                  <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="font-playfair text-display-sm text-teal">{v.name}</h2>
                    {v.tagline && <p className="mt-1 font-raleway italic text-forest/60">{v.tagline}</p>}
                    {v.hours && (
                      <p className="mt-3 font-opensans uppercase tracking-tracked text-[10px] text-forest/55">
                        {v.hours}
                      </p>
                    )}
                  </div>
                  <DiningMenu
                    sections={v.sections}
                    labels={{ all: t('rooms.filter.all'), popular: t('diningPage.popular') }}
                  />
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
