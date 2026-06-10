'use client';

// Full-width pull quote: a single large display line between content sections,
// no image, no card. A Holistika signature that changes how the site feels to
// scroll. Reveals on scroll. Tone controls the background band.

import { Reveal } from '@/components/shared/Reveal';
import { cn } from '@/lib/utils';

type Tone = 'sand' | 'cream' | 'teal';

const TONE: Record<Tone, { section: string; text: string; mark: string }> = {
  sand: { section: 'bg-sand-light', text: 'text-teal', mark: 'bg-coral/60' },
  cream: { section: 'bg-cream', text: 'text-teal', mark: 'bg-coral/60' },
  teal: { section: 'bg-teal-700', text: 'text-cream', mark: 'bg-sunshine/70' },
};

export function PullQuote({
  children,
  tone = 'sand',
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const c = TONE[tone];
  return (
    <section className={cn('py-20 md:py-32', c.section, className)}>
      <div className="container-page">
        <Reveal className="max-w-5xl mx-auto text-center">
          <span aria-hidden className={cn('mx-auto mb-7 block h-px w-12', c.mark)} />
          <p
            className={cn(
              'font-playfair italic leading-[1.25] tracking-tight',
              'text-[clamp(1.6rem,3.6vw,3rem)]',
              c.text,
            )}
          >
            {children}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
