'use client';

// Primary site navigation.
//
// 2026 update:
// - Multi-dropdown support: any nav item with `children` becomes a dropdown
//   (Experience → Activities / Events; Explore → Gallery / Journal / Tour /
//   Contact).
// - Never hides on scroll. When scrolled (or off the home page) the bar
//   switches to a translucent tinted backdrop with blur so page headings
//   show through it instead of being eclipsed.
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

type NavChild = { href: string; dictKey: string };
type NavItem = { href: string; dictKey: string; children?: readonly NavChild[] };

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Track which top-level dropdown is open (by dictKey), if any.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { t } = useT();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  if (pathname?.startsWith('/admin')) return null;

  // Visual state:
  //   transparent     only on home, only at top, only when mobile drawer closed.
  //                     Cream text floats over the hero video. DESKTOP ONLY -
  //                     on mobile the bar always carries a solid brand backdrop
  //                     so the hamburger never floats over light page content.
  //   translucent     once scrolled OR on any inner page. Soft teal tint
  //                     plus heavy backdrop blur headings stay readable
  //                     under the bar without being eclipsed by a solid wall.
  const transparent = isHome && !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-colors duration-500',
          // Mobile: always solid brand teal (never transparent under the hamburger).
          'bg-teal-700 text-cream shadow-[0_2px_18px_-10px_rgba(0,0,0,0.35)] border-b border-cream/10',
          // Desktop: transparent over the hero, translucent once scrolled / inner pages.
          transparent
            ? 'lg:bg-transparent lg:shadow-none lg:border-transparent'
            : 'lg:bg-teal-700/40 lg:backdrop-blur-xl',
        )}
      >
        <div className="container-page flex items-center justify-between h-20">
          <Logo tone="cream" />

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
            {(site.nav as readonly NavItem[]).map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href + '/')) ||
                (item.children?.some(
                  (c) => pathname === c.href || pathname?.startsWith(c.href + '/'),
                ) ??
                  false);

              if (item.children?.length) {
                const isOpen = openMenu === item.dictKey;
                return (
                  <div
                    key={item.dictKey}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.dictKey)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenMenu(isOpen ? null : item.dictKey)}
                      className={cn(
                        'inline-flex items-center gap-1 font-opensans text-xs uppercase tracking-tracked transition-colors py-1',
                        active ? 'text-sunshine' : 'text-cream/85 hover:text-sunshine',
                      )}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                    >
                      {t(item.dictKey as DictKey)}
                      <ChevronDown
                        size={12}
                        className={cn('transition-transform', isOpen && 'rotate-180')}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          role="menu"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[240px] bg-cream text-forest rounded-md shadow-lg overflow-hidden"
                        >
                          {item.children.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              role="menuitem"
                              onClick={() => setOpenMenu(null)}
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
                  key={item.dictKey}
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
            <div className="flex flex-col items-center leading-none">
              <Button
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer"
                size="sm"
                className="bg-coral text-cream hover:bg-coral-600 border-coral hover:border-coral-600"
              >
                {t('nav.book')}
              </Button>
              <span className="mt-1 text-[9px] font-opensans tracking-tight text-cream/70 whitespace-nowrap">
                {t('nav.bookMicro')}
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label={t('a11y.openMenu')}
            className="lg:hidden text-cream p-2 -mr-2"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

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
              <button
                onClick={() => setOpen(false)}
                aria-label={t('a11y.closeMenu')}
                className="p-2 -mr-2"
              >
                <X size={28} />
              </button>
            </div>
            <div className="container-page pt-10 pb-16 flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-5rem)]">
              <p className="font-beth text-3xl text-sunshine mb-6">{t('home.hero.headline')}</p>
              {(site.nav as readonly NavItem[]).map((item, i) => (
                <motion.div
                  key={item.dictKey}
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
                  {item.children?.length ? (
                    <div className="pl-4 py-1 space-y-1">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block font-opensans text-sm text-cream/70 hover:text-sunshine"
                        >
                          → {t(sub.dictKey as DictKey)}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              ))}
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
                <p className="-mt-1 text-center text-[10px] font-opensans tracking-tight text-cream/70">
                  {t('nav.bookMicro')}
                </p>
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
