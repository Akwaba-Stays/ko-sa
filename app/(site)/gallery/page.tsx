import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { Gallery } from '@/components/home/Gallery';
import { listPublicGallery } from '@/lib/cms/gallery';
import { getT } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'A visual journey through KO-SA Beach Resort — suites, spa, dining, shoreline and palms.',
};

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const { t } = getT();
  const items = await listPublicGallery();
  return (
    <>
      <PageHero
        eyebrow={t('gallery.eyebrow')}
        title={t('gallery.headline')}
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2000"
        height="sm"
      />
      <Gallery items={items} />
    </>
  );
}
