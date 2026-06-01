import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { MessageCircle } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { getT } from '@/lib/i18n/server';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Two decades by the sea. The story and values behind KO-SA Beach Resort part of the Akwaaba Stays Hospitality Group',
};

export const dynamic = 'force-dynamic';

const VALUES = [
  { titleKey: 'aboutPage.values.authenticity.title', bodyKey: 'aboutPage.values.authenticity.body' },
  { titleKey: 'aboutPage.values.community.title', bodyKey: 'aboutPage.values.community.body' },
  { titleKey: 'aboutPage.values.wellness.title', bodyKey: 'aboutPage.values.wellness.body' },
  { titleKey: 'aboutPage.values.sustainability.title', bodyKey: 'aboutPage.values.sustainability.body' },
  { titleKey: 'aboutPage.values.legacy.title', bodyKey: 'aboutPage.values.legacy.body' },
] as const;

export default function AboutPage() {
  const { t } = getT();
  const wa = `${site.socials.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;

  return (
    <>
      <PageHero
        eyebrow={t('nav.story')}
        title={t('aboutPage.headline')}
        image="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/beach/12-772A2007.webp"
      />

      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 max-w-prose">
            <p className="font-raleway text-lg leading-relaxed text-forest/85">{t('aboutPage.opening')}</p>
            <p className="font-raleway text-forest/75 leading-relaxed">{t('aboutPage.enrichedSetting')}</p>
            <p className="font-raleway text-forest/75 leading-relaxed">{t('aboutPage.enrichedEco')}</p>
            <p className="font-raleway text-forest/75 leading-relaxed">{t('aboutPage.continued')}</p>
          </div>
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-md overflow-hidden branded-img">
            <Image
              src="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/beach/0-772A1802.webp"
              alt={t('alt.aboutSea')}
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <div className="container-page">
          <h2 className="font-playfair text-display-sm text-teal text-center mb-12">{t('aboutPage.values')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <article key={v.titleKey} className="bg-sand-light rounded-md p-6">
                <h3 className="font-playfair text-xl text-coral">{t(v.titleKey)}</h3>
                <p className="mt-3 font-raleway text-sm text-forest/80 leading-relaxed">{t(v.bodyKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sea Turtle Project real conservation work at Ko-Sa */}
      <section className="py-16 md:py-20 bg-sand-light">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-md overflow-hidden branded-img">
            <Image
              src="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/beach/13-772A2010.webp"
              alt={t('aboutPage.seaTurtle.title')}
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7 max-w-prose">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-3">
              Conservation
            </p>
            <h2 className="font-playfair text-display-sm text-teal">{t('aboutPage.seaTurtle.title')}</h2>
            <p className="mt-4 font-raleway text-forest/80 leading-relaxed">{t('aboutPage.seaTurtle.body')}</p>
          </div>
        </div>
      </section>

      <section className="bg-teal-700 text-cream py-20">
        <div className="container-page max-w-2xl text-center">
          <h2 className="font-playfair text-display-md">{t('aboutPage.closing.headline')}</h2>
          <p className="mt-6 font-raleway text-cream/85 leading-relaxed">{t('aboutPage.closing.body')}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
            >
              {t('aboutPage.closing.ctaBook')}
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/60 text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-cream hover:text-teal transition-colors"
            >
              <MessageCircle size={14} /> {t('aboutPage.closing.ctaGet')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
