import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { BookingFlow } from '@/components/booking/BookingFlow';
import { ShieldCheck, BadgeCheck, MessageCircle } from 'lucide-react';
import { getT } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Book Your Stay',
  description: 'Reserve your stay at KO-SA Beach Resort secure booking, best-rate guarantee, instant confirmation.',
};

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { checkIn?: string; checkOut?: string; adults?: string; children?: string; room?: string };
}

export default function BookPage({ searchParams }: Props) {
  const { t } = getT();
  return (
    <>
      <PageHero
        eyebrow={t('bookPage.eyebrow')}
        title={t('bookPage.title')}
        subtitle={t('bookPage.subtitle')}
        image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2000"
        height="sm"
      />
      <section className="py-16 bg-sand-light">
        <div className="container-page">
          <BookingFlow initial={searchParams} />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm text-forest/85">
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-coral" /> {t('booking.badgeSecure')}</div>
            <div className="flex items-center gap-2"><BadgeCheck size={16} className="text-coral" /> {t('booking.badgeBestRate')}</div>
            <div className="flex items-center gap-2"><MessageCircle size={16} className="text-coral" /> {t('common.whatsapp')}</div>
          </div>
        </div>
      </section>
    </>
  );
}
