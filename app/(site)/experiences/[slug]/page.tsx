import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { notFound } from 'next/navigation';
import { getPublicExperienceBySlug } from '@/lib/cms/experiences';
import { Button } from '@/components/shared/Button';
import { AdinkraIcon, type AdinkraName } from '@/components/shared/AdinkraIcon';
import { getT } from '@/lib/i18n/server';
import { site } from '@/lib/site';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = await getPublicExperienceBySlug(params.slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.description,
    openGraph: { images: e.image ? [e.image] : undefined },
  };
}

export default async function ExperienceDetail({ params }: Props) {
  const e = await getPublicExperienceBySlug(params.slug);
  if (!e) notFound();
  const { t } = getT();

  return (
    <>
      <section className="relative h-[70vh] min-h-[460px] pt-20 text-cream">
        {e.image && (
          <Image src={e.image} alt={e.title} fill priority sizes="100vw" className="object-cover branded-img" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-umber/40 to-umber/70" />
        <div className="absolute inset-0 container-page flex flex-col justify-end pb-16">
          <div className="flex items-center gap-3 text-primary mb-3">
            {e.adinkra && <AdinkraIcon name={e.adinkra as AdinkraName} size={28} />}
            <span className="font-poppins uppercase tracking-tracked text-xs">{e.label}</span>
          </div>
          <h1 className="font-belleza text-display-lg">{e.title}</h1>
        </div>
      </section>

      <section className="py-20 bg-bg-orange">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg text-umber/85 leading-relaxed">{e.description}</p>
          {e.longBody && (
            <div className="mt-6 prose prose-umber text-umber/80 whitespace-pre-line">{e.longBody}</div>
          )}
          {!e.longBody && (
            <p className="mt-6 text-umber/75 leading-relaxed">{t('experiencesPage.detailFallback')}</p>
          )}
          {e.gallery.length > 0 && (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
              {e.gallery.map((src, i) => (
                <div key={`${src}-${i}`} className="relative aspect-square branded-img rounded-md overflow-hidden">
                  <Image src={src} alt={`${e.title} ${i + 1}`} fill sizes="250px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={site.bookingUrl} target="_blank" rel="noreferrer">{t('experiencesPage.addToStay')}</Button>
            <Button href="/contact" variant="gold-outline">{t('common.speakConcierge')}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
