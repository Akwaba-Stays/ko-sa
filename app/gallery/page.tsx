import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { Gallery } from '@/components/home/Gallery';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'A visual journey through KO-SA Beach Resort suites, spa, dining, shoreline and palms.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Through the Lens"
        title="Gallery"
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2000"
        height="sm"
      />
      <Gallery />
    </>
  );
}
