'use client';

// Inline newsletter capture for the home page (content brief §01).
// Posts to /api/newsletter and gracefully handles errors.

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useT } from '@/lib/i18n';

export function EmailCapture() {
  const { t } = useT();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        body: JSON.stringify({ email, source: 'home-footer' }),
      });
      if (!res.ok) throw new Error(t('emailCapture.error'));
      setDone(true);
      setEmail('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-teal-700 text-cream py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="container-page max-w-2xl text-center"
      >
        <h2 className="font-playfair text-display-md leading-tight">{t('home.email.headline')}</h2>
        <p className="mt-6 font-raleway text-cream/85 leading-relaxed">{t('home.email.body')}</p>
        {done ? (
          <p className="mt-8 font-opensans uppercase tracking-tracked text-sm text-sunshine">
            {t('exit.thanks')}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder={t('home.email.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-md bg-cream text-forest px-4 py-3 text-sm font-opensans focus:outline-none focus:ring-2 focus:ring-sunshine"
            />
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-xs py-3 px-5 hover:bg-coral-600 transition-colors disabled:opacity-50"
            >
              {submitting ? '…' : t('home.email.cta')}
            </button>
          </form>
        )}
        {error && <p className="mt-4 text-xs text-sunshine">{error}</p>}
      </motion.div>
    </section>
  );
}
