import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { Gallery } from '@/components/home/Gallery';
import { listPublicGallery } from '@/lib/cms/gallery';
import { getT } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'A visual journey through Ko Sa Beach Resort suites, spa, dining, shoreline and palms',
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
        image="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/rooms/deluxe-twin-sea-view/0-DTRWSV.webp"
        height="sm"
      />
      <Gallery items={items} />
    </>
  );
}
