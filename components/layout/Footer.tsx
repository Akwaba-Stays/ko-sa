'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Facebook, MessageCircle, Star } from 'lucide-react';
import { site, allNavLinks } from '@/lib/site';
import { Logo } from './Logo';
import { NewsletterForm } from '@/components/shared/NewsletterForm';
import { useT } from '@/lib/i18n';
import type { DictKey } from '@/lib/i18n/dictionaries';

export function Footer() {
  const pathname = usePathname();
  const { t } = useT();
  if (pathname?.startsWith('/admin')) return null;

  // Quick Links = every reachable nav destination (top-level + children),
  // de-duplicated by href, in source order.
  const seen = new Set<string>();
  const quickLinks = allNavLinks.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });

  return (
    <footer className="relative bg-forest-900 text-cream pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sunshine/50 to-transparent" />

      {/* Review badges (brief §02 Global Elements) */}
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 pb-12 border-b border-cream/10">
          <span className="font-opensans uppercase tracking-tracked text-[10px] text-cream/50">
            {t('footer.reviews')}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Google', value: `${site.reviews.google.score}/5`, url: site.reviews.google.url },
              { label: 'Booking.com', value: `${site.reviews.booking.score}/10`, url: site.reviews.booking.url },
              { label: 'TripAdvisor', value: `${site.reviews.tripadvisor.score}/5`, url: site.reviews.tripadvisor.url },
            ].map((r) => (
              <a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cream/10 hover:bg-cream/20 transition-colors px-4 py-2 text-xs font-opensans"
              >
                <Star size={12} className="text-sunshine" fill="currentColor" stroke="none" />
                <span className="text-cream/90">{r.label}</span>
                <span className="text-sunshine font-semibold">{r.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
        <div>
          <Logo tone="cream" />
          <p className="mt-6 font-beth text-2xl text-sunshine">{site.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/70 max-w-xs">{t('footer.about')}</p>
          <p className="mt-4 text-xs text-cream/50">{t('footer.group')}</p>
        </div>

        <div>
          <h3 className="font-opensans text-xs uppercase tracking-tracked text-sunshine mb-5">
            {t('footer.quickLinks')}
          </h3>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/80 hover:text-sunshine transition-colors">
                  {t(item.dictKey as DictKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-opensans text-xs uppercase tracking-tracked text-sunshine mb-5">{t('footer.connect')}</h3>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li>{t('footer.address')}</li>
            <li>
              <a href={`tel:${site.contact.phone}`} className="hover:text-sunshine">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-sunshine">
                {site.contact.email}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex items-center gap-4">
            <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-sunshine">
              <Instagram size={20} />
            </a>
            <a href={site.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-sunshine">
              <Facebook size={20} />
            </a>
            <a
              href={`${site.socials.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="hover:text-sunshine"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-opensans text-xs uppercase tracking-tracked text-sunshine mb-5">
            {t('footer.newsletter')}
          </h3>
          <p className="text-sm text-cream/70 mb-4">{t('footer.newsletterBlurb')}</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-page mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/50">
        <p>
          © {new Date().getFullYear()} {site.name}. {t('footer.copyright')}
        </p>
        <div className="flex items-center gap-6">
          <Link href="/legal/privacy" className="hover:text-sunshine">{t('footer.privacy')}</Link>
          <Link href="/legal/terms" className="hover:text-sunshine">{t('footer.terms')}</Link>
          <Link href="/admin" className="hover:text-sunshine">{t('footer.admin')}</Link>
        </div>
      </div>
    </footer>
  );
}
