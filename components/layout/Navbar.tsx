'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/shared/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/i18n';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
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

  // Hide site chrome on admin routes
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
            : 'bg-umber/90 text-cream backdrop-blur-md shadow-[0_4px_20px_-12px_rgba(0,0,0,0.4)]',
        )}
      >
        <div className="container-page flex items-center justify-between h-20">
          <Logo tone="cream" />

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
            {site.nav.slice(0, 7).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-poppins text-xs uppercase tracking-tracked text-cream/85 hover:text-primary transition-colors group py-1"
              >
                {t(item.dictKey as any)}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher tone="cream" />
            <Button href="/book" size="sm">
              {t('nav.book')}
            </Button>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
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
            className="fixed inset-0 z-[60] lg:hidden bg-umber text-cream"
          >
            <div className="container-page flex items-center justify-between h-20">
              <Logo tone="cream" />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
                <X size={28} />
              </button>
            </div>
            <div className="container-page pt-10 pb-16 flex flex-col gap-2">
              <p className="font-beth text-3xl text-primary mb-6">{t('hero.headline')}</p>
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className="block font-belleza text-3xl md:text-4xl py-2 border-b border-cream/10 hover:text-primary transition-colors"
                  >
                    {t(item.dictKey as any)}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Button href="/book" fullWidth size="lg">
                  {t('hero.bookCta')}
                </Button>
                <Button href={site.socials.whatsapp} variant="ghost" fullWidth size="md" target="_blank" rel="noreferrer">
                  WhatsApp
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
