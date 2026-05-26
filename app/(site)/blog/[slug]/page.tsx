import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import { getPublicJournalPostBySlug } from '@/lib/cms/journal';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPublicJournalPostBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.seoTitle ?? p.title,
    description: p.seoDescription ?? p.excerpt ?? undefined,
    openGraph: { images: p.image ? [p.image] : undefined },
  };
}

export default async function BlogPost({ params }: Props) {
  const p = await getPublicJournalPostBySlug(params.slug);
  if (!p) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    image: p.image ?? undefined,
    datePublished: p.publishedAt ?? undefined,
    author: { '@type': 'Organization', name: site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/icons/logo.png` },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative h-[55vh] min-h-[400px] pt-20 text-cream">
        {p.image && (
          <Image src={p.image} alt={p.title} fill priority sizes="100vw" className="object-cover branded-img" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-umber/30 to-umber/70" />
        <div className="absolute inset-0 container-page flex flex-col justify-end pb-12">
          {p.publishedAt && (
            <time className="font-poppins uppercase tracking-tracked text-xs text-primary">
              {formatDate(p.publishedAt)}
            </time>
          )}
          <h1 className="mt-3 font-belleza text-display-lg max-w-4xl">{p.title}</h1>
        </div>
      </section>
      <article className="py-20 bg-bg-orange">
        <div
          className="container-page max-w-prose prose prose-lg prose-headings:font-belleza prose-headings:text-umber prose-p:text-umber/80 prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: p.body }}
        />
      </article>
    </>
  );
}
