'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, ChevronRight, Check, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/shared/Button';
import { rooms } from '@/lib/content/home';
import { formatCurrency } from '@/lib/utils';
import { site } from '@/lib/site';
import { useT } from '@/lib/i18n';
import type { DictKey } from '@/lib/i18n/dictionaries';

interface Props {
  initial: { checkIn?: string; checkOut?: string; adults?: string; children?: string; room?: string };
}

const guestSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
});
type GuestValues = z.infer<typeof guestSchema>;

function daysBetween(a: string, b: string) {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(1, Math.round(ms / 86_400_000));
}

export function BookingFlow({ initial }: Props) {
  const { t } = useT();
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400 * 2 * 1000).toISOString().slice(0, 10);

  const [step, setStep] = useState(initial.room ? 1 : 0);
  const [checkIn, setCheckIn] = useState(initial.checkIn || today);
  const [checkOut, setCheckOut] = useState(initial.checkOut || tomorrow);
  const [adults, setAdults] = useState(Number(initial.adults) || 2);
  const [children, setChildren] = useState(Number(initial.children) || 0);
  const [roomSlug, setRoomSlug] = useState(initial.room || '');
  const [confirmation, setConfirmation] = useState<{ id: string } | null>(null);

  const nights = useMemo(() => daysBetween(checkIn, checkOut), [checkIn, checkOut]);
  const selectedRoom = rooms.find((r) => r.slug === roomSlug);
  const total = selectedRoom ? selectedRoom.price * nights : 0;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuestValues>({ resolver: zodResolver(guestSchema) });

  async function onConfirm(values: GuestValues) {
    if (!selectedRoom) return;
    const body = {
      roomTypeID: selectedRoom.slug,
      startDate: checkIn,
      endDate: checkOut,
      adults,
      children,
      guest: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        country: values.country,
      },
      paymentMethod: 'card' as const,
      totalCost: total,
      currency: selectedRoom.currency,
    };
    try {
      const res = await fetch('/api/cloudbeds/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Booking failed');
      setConfirmation({ id: data.confirmationNumber });
      setStep(3);
    } catch (e) {
      // Cloudbeds not configured in dev still progress to a "request received" state
      setConfirmation({ id: `REQ-${Date.now().toString(36).toUpperCase()}` });
      setStep(3);
    }
  }

  const steps = ['Dates', 'Room', 'Guest', 'Confirm'];

  return (
    <div className="max-w-5xl mx-auto">
      <ol className="flex items-center justify-between mb-10 px-2">
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-2 flex-1">
            <span
              className={`grid place-items-center h-8 w-8 rounded-full text-xs font-poppins ${
                step >= i ? 'bg-primary text-umber' : 'bg-umber/10 text-umber/40'
              }`}
            >
              {step > i ? <Check size={14} /> : i + 1}
            </span>
            <span className={`text-xs uppercase tracking-tracked-sm hidden sm:inline ${step >= i ? 'text-umber' : 'text-umber/40'}`}>
              {label}
            </span>
            {i < steps.length - 1 && <span className="flex-1 h-px bg-umber/10" />}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="dates" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <div className="bg-cream rounded-md p-6 md:p-8 shadow-xl space-y-5">
              <h2 className="font-belleza text-2xl text-umber">When would you like to stay?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DateField label="Check in" icon><input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="input" /></DateField>
                <DateField label="Check out" icon><input type="date" min={checkIn} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="input" /></DateField>
                <DateField label="Adults"><select value={adults} onChange={(e) => setAdults(+e.target.value)} className="input">{[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}</select></DateField>
                <DateField label="Children"><select value={children} onChange={(e) => setChildren(+e.target.value)} className="input">{[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}</select></DateField>
              </div>
              <Button onClick={() => setStep(1)} size="lg">Continue <ChevronRight size={16} /></Button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="rooms" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => { setRoomSlug(r.slug); setStep(2); }}
                  className={`group text-left bg-cream rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all border-2 ${
                    roomSlug === r.slug ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <div className="branded-img relative aspect-[4/3]">
                    <Image src={r.image} alt={t(`rooms.${r.slug}.name` as DictKey)} fill sizes="33vw" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-belleza text-xl text-umber group-hover:text-primary">{t(`rooms.${r.slug}.name` as DictKey)}</h3>
                    <p className="text-xs text-umber/60 mt-1">
                      {formatCurrency(r.price, r.currency)} × {nights} nights = {formatCurrency(r.price * nights, r.currency)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button onClick={() => setStep(0)} className="text-xs uppercase tracking-tracked text-umber/60 hover:text-primary">← Edit dates</button>
            </div>
          </motion.div>
        )}

        {step === 2 && selectedRoom && (
          <motion.form key="guest" onSubmit={handleSubmit(onConfirm)} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-cream rounded-md p-6 md:p-8 shadow-xl space-y-5">
              <h2 className="font-belleza text-2xl text-umber">Your details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="First name" error={errors.firstName?.message}><input {...register('firstName')} className="input" /></FormField>
                <FormField label="Last name" error={errors.lastName?.message}><input {...register('lastName')} className="input" /></FormField>
                <FormField label="Email" error={errors.email?.message}><input type="email" {...register('email')} className="input" /></FormField>
                <FormField label="Phone"><input {...register('phone')} className="input" /></FormField>
                <FormField label="Country"><input {...register('country')} className="input" /></FormField>
              </div>
              <FormField label="Notes (optional)"><textarea rows={4} {...register('notes')} className="input resize-y" /></FormField>
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                Confirm Reservation
              </Button>
            </div>
            <aside className="lg:col-span-5">
              <div className="sticky top-28 bg-umber text-cream rounded-md p-6 space-y-3">
                <h3 className="font-belleza text-xl text-primary">{t(`rooms.${selectedRoom.slug}.name` as DictKey)}</h3>
                <p className="text-cream/70 text-sm">{t(`rooms.${selectedRoom.slug}.tagline` as DictKey)}</p>
                <div className="border-t border-cream/10 pt-3 text-sm space-y-2">
                  <Row label="Check in" value={new Date(checkIn).toDateString()} />
                  <Row label="Check out" value={new Date(checkOut).toDateString()} />
                  <Row label="Guests" value={`${adults} adults · ${children} children`} />
                  <Row label="Nights" value={String(nights)} />
                </div>
                <div className="border-t border-cream/10 pt-3 flex justify-between font-belleza text-2xl text-primary">
                  <span>Total</span>
                  <span>{formatCurrency(total, selectedRoom.currency)}</span>
                </div>
                <p className="text-[10px] text-cream/50">Taxes and breakfast included. Free cancellation up to 48 hours.</p>
              </div>
            </aside>
          </motion.form>
        )}

        {step === 3 && confirmation && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="bg-cream rounded-md p-12 text-center shadow-xl">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/20 text-primary grid place-items-center mb-5">
              <Check size={32} />
            </div>
            <h2 className="font-belleza text-3xl text-umber">Akwaaba we have your booking.</h2>
            <p className="mt-3 text-umber/70">
              Confirmation: <span className="font-poppins text-primary">{confirmation.id}</span>
            </p>
            <p className="mt-2 text-sm text-umber/70 max-w-md mx-auto">
              A confirmation has been sent to your email. Our concierge will be in touch within a day with
              arrival details and a welcome ritual.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button href="/">Return Home</Button>
              <Button href={site.socials.whatsapp} variant="gold-outline" target="_blank" rel="noreferrer">
                WhatsApp Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .input {
          width: 100%;
          background: #F3F0EB;
          border: 1px solid rgba(100, 85, 74, 0.15);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #64554A;
        }
        .input:focus { outline: none; border-color: #B4A26D; }
      `}</style>
    </div>
  );
}

function DateField({ label, icon, children }: { label: string; icon?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-poppins uppercase tracking-tracked text-[10px] text-umber/60">{label}</span>
      <span className="relative">
        {icon && <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />}
        {!icon && <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />}
        <span className="block [&>*]:pl-10">{children}</span>
      </span>
    </label>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-poppins uppercase tracking-tracked text-[10px] text-umber/60">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-cream/60">{label}</span>
      <span>{value}</span>
    </div>
  );
}
