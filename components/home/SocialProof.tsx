'use client';

// Narrow social-proof strip immediately below the hero content brief §01.
// Pulls scores from site.reviews so they can be tweaked in one place.

import { Star } from 'lucide-react';
import { site } from '@/lib/site';
import { useT } from '@/lib/i18n';

export function SocialProof() {
  const { t } = useT();
  return (
    <section className="bg-cream border-y border-sand-300/60 py-4">
      <div className="container-page flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
        <div className="flex items-center gap-1 text-sunshine">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} fill="currentColor" stroke="none" />
          ))}
        </div>
        <p className="font-opensans text-sm text-forest/85">{t('home.social.copy')}</p>
        <div className="hidden md:flex items-center gap-4 text-[10px] font-opensans uppercase tracking-tracked-sm text-forest/60">
          <a href={site.reviews.google.url} target="_blank" rel="noreferrer" className="hover:text-coral">
            Google {site.reviews.google.score}/5
          </a>
          <span aria-hidden>·</span>
          <a href={site.reviews.booking.url} target="_blank" rel="noreferrer" className="hover:text-coral">
            Booking {site.reviews.booking.score}/10
          </a>
          <span aria-hidden>·</span>
          <a href={site.reviews.tripadvisor.url} target="_blank" rel="noreferrer" className="hover:text-coral">
            TripAdvisor {site.reviews.tripadvisor.score}/5
          </a>
        </div>
      </div>
    </section>
  );
}
