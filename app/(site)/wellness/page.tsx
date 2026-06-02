import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { Sparkles, HeartHandshake, Flower2, CupSoda } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { WellnessEnquiryForm } from '@/components/marketing/WellnessEnquiryForm';
import { getT } from '@/lib/i18n/server';
import { listPublicTreatments } from '@/lib/cms/treatments';

export const metadata: Metadata = {
  title: 'Wellness',
  description:
    'Well-being, the Ko-Sa way wellness journeys, coaching, spa treatments and the KOSA Tea Bar · Open to day guests and resort guests alike',
};

export const dynamic = 'force-dynamic';

const WELL = 'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/wellness';

// Image-backed pillars. Copy is localised; imagery is the owner's real spa
// photography. When the exact programmes arrive they can replace these.
const PILLARS = [
  { icon: Sparkles, titleKey: 'wellnessPage.journeys.title', bodyKey: 'wellnessPage.journeys.body', img: `${WELL}/0-772A2086.webp` },
  { icon: HeartHandshake, titleKey: 'wellnessPage.coaching.title', bodyKey: 'wellnessPage.coaching.body', img: `${WELL}/3-772A2129.webp` },
  { icon: Flower2, titleKey: 'wellnessPage.spa.title', bodyKey: 'wellnessPage.spa.body', img: `${WELL}/2-772A2097.webp` },
  { icon: CupSoda, titleKey: 'wellnessPage.tea.title', bodyKey: 'wellnessPage.tea.body', img: `${WELL}/6-772A2143.webp` },
] as const;

const STRIP = [
  `${WELL}/1-772A2088.webp`,
  `${WELL}/4-772A2130.webp`,
  `${WELL}/5-772A2142.webp`,
  `${WELL}/7-772A2164.webp`,
] as const;

export default async function WellnessPage() {
  const { t } = getT();
  const treatments = await listPublicTreatments();
  const programmes = [...PILLARS.map((p) => t(p.titleKey)), ...treatments.map((tr) => tr.name)];

  return (
    <>
      <PageHero
        eyebrow={t('nav.wellness')}
        title={t('wellnessPage.headline')}
        subtitle={t('wellnessPage.heroSub')}
        image={`${WELL}/4-772A2130.webp`}
      />

      {/* Intro */}
      <section className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg md:text-xl text-forest/85 leading-relaxed">
            {t('wellnessPage.intro')}
          </p>
        </div>
      </section>

      {/* Image-backed pillars */}
      <section className="pb-4 bg-sand-light">
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
                  <h2 className="mt-3 font-playfair text-2xl">{t(p.titleKey)}</h2>
                  <p className="mt-2 font-raleway text-cream/85 leading-relaxed max-w-md">{t(p.bodyKey)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Spa imagery strip */}
      <section className="py-12 bg-sand-light">
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
            <p className="mt-4 font-raleway text-cream/85 leading-relaxed">
              {t('wellnessPage.enquiry.body')}
            </p>
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
