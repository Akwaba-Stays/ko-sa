'use client';

import { Button } from '@/components/shared/Button';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="min-h-[70vh] grid place-items-center bg-bg-orange py-32 px-6 text-center">
      <div className="max-w-md mx-auto">
        <AdinkraIcon name="denkyem" size={64} className="text-primary mx-auto mb-6" />
        <h1 className="font-belleza text-display-sm text-umber">A small wave knocked us over.</h1>
        <p className="mt-3 text-umber/70">Please try again we&apos;re re-balancing.</p>
        <div className="mt-8 flex gap-3 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button href="/" variant="gold-outline">Return Home</Button>
        </div>
      </div>
    </section>
  );
}
