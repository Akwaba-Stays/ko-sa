import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { listPublicDiningVenues } from '@/lib/cms/dining';
import { formatCurrency } from '@/lib/utils';
import { waLink, waPrefill } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Dining',
  description:
    'Food the way the coast intended · Fresh, local, Ghanaian cooking restaurant, bar, breakfast and private dining at KO-SA Beach Resort',
};

export const dynamic = 'force-dynamic';

const SECTIONS = [
  {
    key: 'restaurant',
    titleKey: 'diningPage.restaurant.title',
    bodyKey: 'diningPage.restaurant.body',
    hoursKey: 'diningPage.restaurant.hours' as const,
    image: 'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/dining/0-772A1897.webp',
    cta: { labelKey: 'diningPage.restaurant.cta', href: waLink(waPrefill.reserveTable()) },
  },
  {
    key: 'bar',
    // Show the bar's real name ("Kooki Beach Bar") under the section title.
    titleKey: 'diningPage.bar.title',
    nameKey: 'diningPage.bar.name' as const,
    bodyKey: 'diningPage.bar.body',
    hoursKey: 'diningPage.bar.hours' as const,
    image: 'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/dining/9-772A2299.webp',
  },
  {
    key: 'breakfast',
    titleKey: 'diningPage.breakfast.title',
    bodyKey: 'diningPage.breakfast.body',
    hoursKey: 'diningPage.breakfast.hours' as const,
    image: 'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/dining/2-772A1911.webp',
  },
  {
    key: 'private',
    titleKey: 'diningPage.private.title',
    leadKey: 'diningPage.private.lead' as const,
    bodyKey: 'diningPage.private.body',
    image: 'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/dining/11-772A2399.webp',
    cta: { labelKey: 'diningPage.private.cta', href: waLink(waPrefill.privateDining()) },
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
        image="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/dining/12-772A2400.webp"
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">
            {t('diningPage.intro')}
          </p>
          {/* Reserve a Table immediately after the intro (Change Request §Page 04) */}
          <a
            href={waLink(waPrefill.reserveTable())}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
          >
            {t('diningPage.reserveCta')} →
          </a>
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
                  <a
                    href={s.cta.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 font-opensans uppercase tracking-tracked text-xs text-coral hover:text-coral-700"
                  >
                    {t(s.cta.labelKey)} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Live menus from the CMS, when present */}
      {venues.some((v) => v.sections.length) && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="container-page max-w-4xl space-y-16">
            {venues.map((v) =>
              v.sections.length ? (
                <div key={v.id}>
                  <h2 className="font-playfair text-display-sm text-teal text-center">{v.name}</h2>
                  {v.tagline && <p className="text-center font-raleway italic text-forest/60 mt-1">{v.tagline}</p>}
                  <div className="mt-8 space-y-10">
                    {v.sections.map((sec) => (
                      <div key={sec.id}>
                        <h3 className="font-playfair text-xl text-coral">{sec.name}</h3>
                        {sec.description && <p className="text-sm text-forest/60 mt-1">{sec.description}</p>}
                        <ul className="mt-3 divide-y divide-sand-300/60">
                          {sec.items.map((it) => (
                            <li key={it.id} className="py-3 flex justify-between gap-4">
                              <div>
                                <p className="font-opensans font-medium text-forest">{it.name}</p>
                                {it.description && <p className="text-xs text-forest/60">{it.description}</p>}
                                {it.dietary.length > 0 && (
                                  <p className="text-[10px] uppercase tracking-tracked text-forest/40 mt-1">
                                    {it.dietary.join(' · ')}
                                  </p>
                                )}
                              </div>
                              {it.price !== null && (
                                <span className="font-opensans text-teal shrink-0">
                                  {formatCurrency(it.price, it.currency)}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </section>
      )}
    </>
  );
}
