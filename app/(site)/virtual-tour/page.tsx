import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { TourViewer, type Scene } from '@/components/virtual-tour/TourViewer';
import { Button } from '@/components/shared/Button';
import { getT } from '@/lib/i18n/server';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: '360° Virtual Tour',
  description: 'Step inside KO-SA Beach Resort virtual tour of suites, spa, pool and shoreline in Elmina, Ghana',
};

export const dynamic = 'force-dynamic';

async function getScenes(): Promise<Scene[]> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/virtual-tour/scenes`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = (await res.json()) as { scenes: Scene[] };
    return data.scenes ?? [];
  } catch {
    return [];
  }
}

export default async function VirtualTourPage() {
  const { t } = getT();
  const scenes = await getScenes();
  return (
    <>
      <PageHero
        eyebrow={t('tour.eyebrow')}
        title={t('tour.headline')}
        subtitle={t('tour.description')}
        image="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/rooms/sea-view-standard-chalet/0-IMG_3290.webp"
        height="sm"
      />
      <section className="py-16 md:py-20 bg-sand-light">
        <div className="container-page">
          <TourViewer scenes={scenes} />
          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center text-center">
            <Button href="/rooms">{t('tour.viewRooms')}</Button>
            <Button href={site.bookingUrl} target="_blank" rel="noreferrer" variant="gold-outline">{t('common.bookYourStay')}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
