'use client';

// Primary site navigation per the Website Content Brief §02.
// - Clean, sticky bar
// - Always-visible "Book Now" button (right side)
// - "Explore" dropdown reveals Experiences / Events sub-nav
// - Returns null on /admin so the admin shell owns its own chrome.

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/shared/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/i18n';
import type { DictKey } from '@/lib/i18n/dictionaries';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const { t } = useT();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY && y > 220);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname?.startsWith('/admin')) return null;

  const transparent = isHome && !scrolled && !open;

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? -120 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-colors duration-500',
          transparent
            ? 'bg-transparent text-cream'
            : 'bg-teal-700/95 text-cream backdrop-blur-md shadow-[0_4px_20px_-12px_rgba(0,0,0,0.4)]',
        )}
      >
        <div className="container-page flex items-center justify-between h-20">
          <Logo tone="cream" />

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
            {site.nav.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href + '/');
              if (item.dictKey === 'nav.explore') {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setExploreOpen(true)}
                    onMouseLeave={() => setExploreOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setExploreOpen((v) => !v)}
                      className={cn(
                        'inline-flex items-center gap-1 font-opensans text-xs uppercase tracking-tracked transition-colors py-1',
                        active ? 'text-sunshine' : 'text-cream/85 hover:text-sunshine',
                      )}
                      aria-expanded={exploreOpen}
                      aria-haspopup="menu"
                    >
                      {t(item.dictKey as DictKey)}
                      <ChevronDown size={12} className={cn('transition-transform', exploreOpen && 'rotate-180')} />
                    </button>
                    <AnimatePresence>
                      {exploreOpen && (
                        <motion.div
                          role="menu"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[240px] bg-cream text-forest rounded-md shadow-lg overflow-hidden"
                        >
                          {site.exploreSubNav.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              role="menuitem"
                              className="block px-4 py-3 text-sm font-opensans hover:bg-sand transition-colors"
                            >
                              {t(sub.dictKey as DictKey)}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative font-opensans text-xs uppercase tracking-tracked transition-colors group py-1',
                    active ? 'text-sunshine' : 'text-cream/85 hover:text-sunshine',
                  )}
                >
                  {t(item.dictKey as DictKey)}
                  <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-sunshine transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher tone="cream" />
            <Button
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer"
              size="sm"
              className="bg-coral text-cream hover:bg-coral-600 border-coral hover:border-coral-600"
            >
              {t('nav.book')}
            </Button>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label={t('a11y.openMenu')}
            className="lg:hidden text-cream p-2 -mr-2"
          >
            <Menu size={26} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden bg-teal-700 text-cream"
          >
            <div className="container-page flex items-center justify-between h-20">
              <Logo tone="cream" />
              <button onClick={() => setOpen(false)} aria-label={t('a11y.closeMenu')} className="p-2 -mr-2">
                <X size={28} />
              </button>
            </div>
            <div className="container-page pt-10 pb-16 flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-5rem)]">
              <p className="font-beth text-3xl text-sunshine mb-6">{t('home.hero.headline')}</p>
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className="block font-playfair text-3xl md:text-4xl py-2 border-b border-cream/10 hover:text-sunshine transition-colors"
                  >
                    {t(item.dictKey as DictKey)}
                  </Link>
                </motion.div>
              ))}
              <div className="pl-4 pt-2 space-y-1">
                {site.exploreSubNav.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="block font-opensans text-sm text-cream/70 hover:text-sunshine"
                  >
                    → {t(sub.dictKey as DictKey)}
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Button
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  fullWidth
                  size="lg"
                  className="bg-coral text-cream hover:bg-coral-600 border-coral"
                >
                  {t('common.bookYourStay')}
                </Button>
                <Button
                  href={`${site.socials.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
                  variant="ghost"
                  fullWidth
                  size="md"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('common.whatsapp')}
                </Button>
                <div className="mt-4">
                  <LanguageSwitcher tone="cream" variant="block" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
