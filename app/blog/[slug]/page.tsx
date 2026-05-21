import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { site } from '@/lib/site';

interface Props { params: { slug: string } }

const posts: Record<string, { title: string; date: string; image: string; html: string; excerpt: string }> = {
  'things-to-do-in-elmina': {
    title: 'Twelve things to do in Elmina, Ghana',
    excerpt: 'A slow guide to the castle, the fishing villages, and the small kindnesses in between.',
    date: '2025-03-12',
    image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=80&w=2000',
    html: `<p>Elmina is a town that asks you to slow down. The light here is different gold in the morning, lavender at dusk. Below, twelve small ways to spend a day.</p>
<h2>1. Walk the harbour at dawn</h2><p>Watch the boats return with the catch. Buy a fish. Have it grilled on the beach within the hour.</p>
<h2>2. Visit Elmina Castle</h2><p>A weight worth carrying. Take a guided tour. Stay quiet afterwards.</p>
<h2>3. The Sunday market</h2><p>Fabric, fruit, fonio, conversation. Wear something cool. Bring small notes.</p>
<p>...</p>`,
  },
  'ghana-beach-holiday-guide': {
    title: 'A Ghana beach holiday: how to plan it well',
    excerpt: 'Visas, drives, dry season, what to pack, and what to leave at home.',
    date: '2025-02-04',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000',
    html: `<p>The best time to come is November through March dry, breezy, golden. Visas are simple for most passports; arrival in Accra (ACC), then 2.5 hours by car along a coastal road that becomes a meditation.</p>`,
  },
  'rituals-of-the-shore': {
    title: 'Rituals of the Shore three mornings at KO-SA',
    excerpt: 'A typical day, written slowly. Hibiscus, salt water, oil, breath.',
    date: '2025-01-20',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000',
    html: `<p>Morning one: hibiscus tea, a yoga session in the open-air pavilion, a swim. Morning two: a walk with the chef through the kitchen garden...</p>`,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = posts[params.slug];
  return p ? { title: p.title, description: p.excerpt, openGraph: { images: [p.image] } } : {};
}

export default function BlogPost({ params }: Props) {
  const p = posts[params.slug];
  if (!p) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    image: p.image,
    datePublished: p.date,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.url}/icons/logo.png` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative h-[55vh] min-h-[400px] pt-20 text-cream">
        <Image src={p.image} alt={p.title} fill priority sizes="100vw" className="object-cover branded-img" />
        <div className="absolute inset-0 bg-gradient-to-b from-umber/30 to-umber/70" />
        <div className="absolute inset-0 container-page flex flex-col justify-end pb-12">
          <time className="font-poppins uppercase tracking-tracked text-xs text-primary">
            {new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <h1 className="mt-3 font-belleza text-display-lg max-w-4xl">{p.title}</h1>
        </div>
      </section>
      <article className="py-20 bg-bg-orange">
        <div
          className="container-page max-w-prose prose prose-lg prose-headings:font-belleza prose-headings:text-umber prose-p:text-umber/80 prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: p.html }}
        />
      </article>
    </>
  );
}
