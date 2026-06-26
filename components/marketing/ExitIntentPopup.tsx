'use client';

// Exit-intent newsletter popup. Triggers once per session when the user moves
// their cursor toward the browser chrome (desktop) or on backward swipe
// (mobile). Submits to /api/newsletter and gracefully handles errors. Per the
// content brief §02 → Global Elements.

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useT } from '@/lib/i18n';

const STORAGE_KEY = 'kosa_exit_popup_seen';

export function ExitIntentPopup() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* sessionStorage blocked fall through and still trigger once */
    }

    let armedAt = Date.now();
    const minDelayMs = 8000; // don't fire until the visitor has had a moment

    const onMouseLeave = (e: MouseEvent) => {
      if (Date.now() - armedAt < minDelayMs) return;
      if (e.clientY <= 0) trigger();
    };

    let lastY = window.scrollY;
    const onScroll = () => {
      if (Date.now() - armedAt < minDelayMs) return;
      const y = window.scrollY;
      // Mobile heuristic: a long upward swipe near the top of a long page.
      if (y < 120 && lastY - y > 80) trigger();
      lastY = y;
    };

    function trigger() {
      setOpen(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
    }

    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError(t('emailCapture.invalid'));
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'exit-intent' }),
      });
      if (!res.ok) throw new Error(t('emailCapture.error'));
      setDone(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-forest/70 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-popup-headline"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-md w-full bg-cream rounded-md shadow-2xl p-8 text-forest"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label={t('a11y.close')}
              className="absolute top-3 right-3 text-forest/60 hover:text-coral transition-colors"
              onClick={() => setOpen(false)}
            >
              <X size={22} />
            </button>

            {done ? (
              <div className="text-center py-6">
                <p className="font-playfair text-2xl text-teal mb-3">{t('exit.thanks')}</p>
                <p className="text-sm text-forest/70">{t('home.email.body')}</p>
              </div>
            ) : (
              <>
                <p className="font-opensans text-[10px] uppercase tracking-tracked text-coral mb-3">
                  KoSa · Newsletter
                </p>
                <h2 id="exit-popup-headline" className="font-playfair text-2xl md:text-3xl text-teal leading-tight">
                  {t('exit.headline')}
                </h2>
                <p className="mt-3 text-sm text-forest/80 leading-relaxed">{t('exit.body')}</p>

                <form onSubmit={onSubmit} className="mt-6 space-y-3">
                  <input
                    type="email"
                    required
                    placeholder={t('exit.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-sand-light border border-sand-300 focus:border-teal focus:outline-none rounded-md px-4 py-3 text-sm"
                  />
                  {error && (
                    <p role="alert" className="text-xs text-coral-700">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs py-3 hover:bg-coral-600 transition-colors disabled:opacity-50"
                  >
                    {submitting ? '…' : t('exit.cta')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="block mx-auto text-xs text-forest/50 hover:text-forest/80 underline-offset-4 hover:underline"
                  >
                    {t('exit.dismiss')}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
