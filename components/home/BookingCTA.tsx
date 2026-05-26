'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, ArrowRight, Shield, ShieldCheck, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { useT } from '@/lib/i18n';
import { site } from '@/lib/site';

export function BookingCTA() {
  const { t } = useT();
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400 * 2 * 1000).toISOString().slice(0, 10);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // External Cloudbeds booking engine (opens in a new tab).
    window.open(site.bookingUrl, '_blank', 'noopener,noreferrer');
    setLoading(false);
  }

  return (
    <section className="relative bg-umber text-cream py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 bg-cover bg-center branded-img"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&q=80&w=2000')",
        }}
      />
      <div className="container-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-poppins uppercase tracking-tracked text-xs text-primary">
              {t('booking.eyebrow')}
            </span>
            <h2 className="mt-4 font-belleza text-display-md text-primary">
              {t('booking.headline.l1')}
              <br />
              <span className="text-cream">{t('booking.headline.l2')}</span>
            </h2>
            <p className="mt-5 text-cream/75 max-w-md">
              {t('booking.blurb')}
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              {[
                { Icon: ShieldCheck, label: t('booking.badgeSecure') },
                { Icon: BadgeCheck, label: t('booking.badgeBestRate') },
                { Icon: Shield, label: t('booking.badgeCancel') },
              ].map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-cream/85">
                  <Icon size={16} className="text-primary" /> {label}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-cream text-umber rounded-md p-6 md:p-8 shadow-2xl space-y-5"
          >
            <h3 className="font-belleza text-2xl">{t('booking.formTitle')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-poppins uppercase tracking-tracked text-umber/60">
                  {t('booking.checkIn')}
                </span>
                <span className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <input
                    type="date"
                    required
                    value={checkIn}
                    min={today}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-bg-orange border border-umber/15 rounded-md pl-10 pr-3 py-3 text-sm focus:border-primary focus:outline-none"
                  />
                </span>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-poppins uppercase tracking-tracked text-umber/60">
                  {t('booking.checkOut')}
                </span>
                <span className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <input
                    type="date"
                    required
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-bg-orange border border-umber/15 rounded-md pl-10 pr-3 py-3 text-sm focus:border-primary focus:outline-none"
                  />
                </span>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-poppins uppercase tracking-tracked text-umber/60">
                  {t('booking.adults')}
                </span>
                <span className="relative">
                  <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <select
                    value={adults}
                    onChange={(e) => setAdults(+e.target.value)}
                    className="w-full bg-bg-orange border border-umber/15 rounded-md pl-10 pr-3 py-3 text-sm focus:border-primary focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n > 1 ? t('booking.adultsPlural') : t('booking.adult')}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] font-poppins uppercase tracking-tracked text-umber/60">
                  {t('booking.children')}
                </span>
                <span className="relative">
                  <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <select
                    value={children}
                    onChange={(e) => setChildren(+e.target.value)}
                    className="w-full bg-bg-orange border border-umber/15 rounded-md pl-10 pr-3 py-3 text-sm focus:border-primary focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? t('booking.child') : t('booking.childrenPlural')}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? t('booking.submitting') : t('booking.submit')}
              <ArrowRight size={16} />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
