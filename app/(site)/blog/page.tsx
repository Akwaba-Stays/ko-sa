import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/shared/PageHero';
import { listPublicJournalPosts } from '@/lib/cms/journal';
import { formatDate } from '@/lib/utils';
import { getT } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Letters from the shore — guides to Elmina, Ghana, wellness rituals, and slow travel notes.',
};

export const dynamic = 'force-dynamic';

export default async function BlogIndex() {
  const { t } = getT();
  const posts = await listPublicJournalPosts();
  return (
    <>
      <PageHero
        eyebrow={t('blogPage.eyebrow')}
        title={t('nav.blog')}
        image="https://images.unsplash.com/photo-1531219432768-9f540ce086d4?auto=format&fit=crop&q=80&w=2000"
        height="sm"
      />
      <section className="py-20 bg-sand-light">
        <div className="container-page">
          {posts.length === 0 ? (
            <p className="text-center text-forest/60">{t('blogPage.comingSoon')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((p) => (
                <div key={p.id} className="card-3d card-3d-lift">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="card-3d-inner group block bg-cream rounded-sm overflow-hidden shadow-sm transition-colors"
                  >
                    <div className="branded-img card-shine relative aspect-[4/3]">
                      {p.image && (
                        <Image src={p.image} alt={p.title} fill sizes="33vw" className="card-3d-img object-cover" />
                      )}
                    </div>
                    <div className="card-3d-float p-6">
                      <time className="font-poppins uppercase tracking-tracked text-[10px] text-primary">
                        {p.publishedAt ? formatDate(p.publishedAt) : ''}
                      </time>
                      <h2 className="mt-3 font-belleza text-2xl text-umber group-hover:text-primary transition-colors">
                        {p.title}
                      </h2>
                      {p.excerpt && (
                        <p className="mt-3 text-sm text-umber/75 leading-relaxed">{p.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
