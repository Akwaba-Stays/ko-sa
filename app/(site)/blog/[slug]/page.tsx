import type { Metadata } from 'next';
import Link from 'next/link';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { site } from '@/lib/site';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { getPublicJournalPostBySlug, listPublicJournalPosts } from '@/lib/cms/journal';
import { formatDate, readingTime } from '@/lib/utils';
import { getT } from '@/lib/i18n/server';

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

  const { t } = getT();
  const all = await listPublicJournalPosts();
  const related = all.filter((x) => x.slug !== p.slug).slice(0, 3);
  const wa = `${site.socials.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;

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

      {/* Hero */}
      <section className="relative h-[62vh] min-h-[440px] pt-20 text-cream overflow-hidden">
        {p.image && (
          <Image src={p.image} alt={p.title} fill priority sizes="100vw" className="object-cover branded-img" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-umber/25 via-umber/35 to-umber/80" />
        <div className="absolute inset-0 container-page flex flex-col justify-end pb-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-opensans uppercase tracking-tracked text-[11px] text-cream/85 hover:text-sunshine transition-colors w-fit"
          >
            <ArrowLeft size={14} /> {t('blogPage.backToJournal')}
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-opensans text-[11px] uppercase tracking-tracked text-sunshine">
            {p.publishedAt && <time>{formatDate(p.publishedAt)}</time>}
            <span className="h-1 w-1 rounded-full bg-sunshine/60" />
            <span>{readingTime(p.body)} {t('blogPage.readMins')}</span>
            {p.tags[0] && (
              <>
                <span className="h-1 w-1 rounded-full bg-sunshine/60" />
                <span>{p.tags.join(' · ')}</span>
              </>
            )}
          </div>
          <h1 className="mt-4 font-playfair text-display-lg max-w-4xl leading-tight">{p.title}</h1>
        </div>
      </section>

      {/* Body — calm, narrow measure */}
      <article className="py-16 md:py-24 bg-sand-light">
        <div className="container-page max-w-[42rem]">
          {p.excerpt && (
            <p className="font-raleway text-xl md:text-2xl text-forest/80 leading-relaxed italic mb-10">
              {p.excerpt}
            </p>
          )}
          <div
            className="kosa-prose"
            dangerouslySetInnerHTML={{ __html: p.body }}
          />

          {/* Closing breath */}
          <div className="mt-14 flex items-center gap-4">
            <span className="h-px flex-1 bg-coral/25" />
            <AdinkraIcon name="denkyem" size={30} className="text-coral/70" />
            <span className="h-px flex-1 bg-coral/25" />
          </div>
          {p.author && (
            <p className="mt-6 text-center font-opensans uppercase tracking-tracked text-[11px] text-forest/50">
              {p.author}
            </p>
          )}

          {/* Gentle CTA */}
          <div className="mt-12 rounded-lg bg-cream border border-sand-300/60 p-8 text-center shadow-sm">
            <p className="font-playfair text-2xl text-teal">{t('blogPage.cta.headline')}</p>
            <p className="mt-2 font-raleway text-forest/70">{t('blogPage.cta.body')}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-coral-600 transition-colors"
              >
                {t('common.bookYourStay')}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-teal/40 text-teal font-opensans uppercase tracking-tracked-sm text-xs px-6 py-3 hover:bg-teal hover:text-cream transition-colors"
              >
                <MessageCircle size={14} /> {t('common.whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* More from the journal */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 bg-cream">
          <div className="container-page">
            <p className="font-opensans uppercase tracking-tracked text-[10px] text-coral mb-8">
              {t('blogPage.moreStories')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group flex flex-col">
                  <div className="relative aspect-[5/4] rounded-lg overflow-hidden branded-img shadow-sm">
                    {r.image && (
                      <Image src={r.image} alt={r.title} fill sizes="33vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                    )}
                  </div>
                  <h3 className="mt-4 font-playfair text-xl text-teal leading-snug group-hover:text-coral transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-2 font-opensans text-[11px] uppercase tracking-tracked text-forest/50">
                    {r.publishedAt ? formatDate(r.publishedAt) : ''} · {readingTime(r.body)} {t('blogPage.readMins')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
