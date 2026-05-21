import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Letters from the shore guides to Elmina, Ghana, wellness rituals, and slow travel notes.',
};

const posts = [
  {
    slug: 'things-to-do-in-elmina',
    title: 'Twelve things to do in Elmina, Ghana',
    excerpt: 'A slow guide to the castle, the fishing villages, and the small kindnesses in between.',
    image:
      'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=80&w=1400',
    date: '2025-03-12',
  },
  {
    slug: 'ghana-beach-holiday-guide',
    title: 'A Ghana beach holiday: how to plan it well',
    excerpt: 'Visas, drives, dry season, what to pack, and what to leave at home.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1400',
    date: '2025-02-04',
  },
  {
    slug: 'rituals-of-the-shore',
    title: 'Rituals of the Shore three mornings at KO-SA',
    excerpt: 'A typical day, written slowly. Hibiscus, salt water, oil, breath.',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1400',
    date: '2025-01-20',
  },
];

export default function BlogIndex() {
  return (
    <>
      <PageHero
        eyebrow="Letters from the Shore"
        title="Journal"
        image="https://images.unsplash.com/photo-1531219432768-9f540ce086d4?auto=format&fit=crop&q=80&w=2000"
        height="sm"
      />
      <section className="py-20 bg-bg-orange">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((p) => (
            <div key={p.slug} className="card-3d card-3d-lift">
              <Link
                href={`/blog/${p.slug}`}
                className="card-3d-inner group block bg-cream rounded-sm overflow-hidden shadow-sm transition-colors"
              >
                <div className="branded-img card-shine relative aspect-[4/3]">
                  <Image src={p.image} alt={p.title} fill sizes="33vw" className="card-3d-img object-cover" />
                </div>
                <div className="card-3d-float p-6">
                  <time className="font-poppins uppercase tracking-tracked text-[10px] text-primary">
                    {new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <h2 className="mt-3 font-belleza text-2xl text-umber group-hover:text-primary transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm text-umber/75 leading-relaxed">{p.excerpt}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
