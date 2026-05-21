'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { site } from '@/lib/site';
import { Logo } from './Logo';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { NewsletterForm } from '@/components/shared/NewsletterForm';
import { useT } from '@/lib/i18n';
import type { DictKey } from '@/lib/i18n/dictionaries';

export function Footer() {
  const pathname = usePathname();
  const { t } = useT();
  if (pathname?.startsWith('/admin')) return null;
  return (
    <footer className="relative bg-umber text-cream pt-24 pb-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      {/* Adinkra glyph strip DESIGN.md §5: 6 rotating glyphs in gold, 60% opacity, repeating pattern */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-5 overflow-hidden h-12 opacity-60"
      >
        <div className="flex items-center gap-16 whitespace-nowrap animate-marquee">
          {Array.from({ length: 4 }).flatMap((_, i) =>
            (['knonsonkonson', 'asetena', 'denkyem', 'community', 'palm'] as const).map((n) => (
              <AdinkraIcon
                key={`${n}-${i}`}
                name={n}
                size={28}
                className="text-primary shrink-0"
              />
            )),
          )}
        </div>
      </div>

      <div className="container-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
        <div>
          <Logo tone="cream" />
          <p className="mt-6 font-beth text-2xl text-primary">{t('footer.tagline')}</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/70 max-w-xs">
            {t('footer.about')}
          </p>
        </div>

        <div>
          <h3 className="font-poppins text-xs uppercase tracking-tracked text-primary mb-5">{t('footer.explore')}</h3>
          <ul className="space-y-2.5 text-sm">
            {site.nav.slice(0, 6).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/80 hover:text-primary transition-colors">
                  {t(item.dictKey as DictKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-poppins text-xs uppercase tracking-tracked text-primary mb-5">{t('footer.connect')}</h3>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li>{site.contact.address}</li>
            <li>
              <a href={`tel:${site.contact.phone}`} className="hover:text-primary">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-primary">
                {site.contact.email}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex items-center gap-4">
            <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary">
              <Instagram size={20} />
            </a>
            <a href={site.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-primary">
              <Facebook size={20} />
            </a>
            <a href={site.socials.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-primary">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-poppins text-xs uppercase tracking-tracked text-primary mb-5">
            {t('footer.newsletter')}
          </h3>
          <p className="text-sm text-cream/70 mb-4">
            {t('footer.newsletterBlurb')}
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-page mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/50">
        <p>
          © {new Date().getFullYear()} Kosa Palms · KO-SA Beach Resort. {t('footer.copyright')}
        </p>
        <div className="flex items-center gap-6">
          <Link href="/legal/privacy" className="hover:text-primary">{t('footer.privacy')}</Link>
          <Link href="/legal/terms" className="hover:text-primary">{t('footer.terms')}</Link>
          <Link href="/admin" className="hover:text-primary">{t('footer.admin')}</Link>
        </div>
      </div>
    </footer>
  );
}
