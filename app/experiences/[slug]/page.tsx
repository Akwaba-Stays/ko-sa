import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { experiences } from '@/lib/content/home';
import { Button } from '@/components/shared/Button';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { getT } from '@/lib/i18n/server';
import { translate, type DictKey } from '@/lib/i18n/dictionaries';

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const e = experiences.find((x) => x.slug === params.slug);
  if (!e) return {};
  const title = translate('en', `experiences.${e.slug}.title` as DictKey);
  const description = translate('en', `experiences.${e.slug}.description` as DictKey);
  return { title, description, openGraph: { images: [e.image] } };
}

export default function ExperienceDetail({ params }: Props) {
  const e = experiences.find((x) => x.slug === params.slug);
  if (!e) notFound();
  const { t } = getT();
  const title = t(`experiences.${e.slug}.title` as DictKey);
  const label = t(`experiences.${e.slug}.label` as DictKey);
  const description = t(`experiences.${e.slug}.description` as DictKey);

  return (
    <>
      <section className="relative h-[70vh] min-h-[460px] pt-20 text-cream">
        <Image src={e.image} alt={title} fill priority sizes="100vw" className="object-cover branded-img" />
        <div className="absolute inset-0 bg-gradient-to-b from-umber/40 to-umber/70" />
        <div className="absolute inset-0 container-page flex flex-col justify-end pb-16">
          <div className="flex items-center gap-3 text-primary mb-3">
            <AdinkraIcon name={e.adinkra} size={28} />
            <span className="font-poppins uppercase tracking-tracked text-xs">{label}</span>
          </div>
          <h1 className="font-belleza text-display-lg">{title}</h1>
        </div>
      </section>

      <section className="py-20 bg-bg-orange">
        <div className="container-page max-w-3xl">
          <p className="font-raleway text-lg text-umber/85 leading-relaxed">{description}</p>
          <p className="mt-6 text-umber/75 leading-relaxed">
            Sessions are intimate six guests at most. Times shift gently with the tide and the sun.
            Speak with our concierge for private bookings, custom rituals, and seasonal offerings.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/book">Add to Your Stay</Button>
            <Button href="/contact" variant="gold-outline">Speak with Concierge</Button>
          </div>
        </div>
      </section>
    </>
  );
}
