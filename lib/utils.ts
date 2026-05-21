import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Teach tailwind-merge about our custom font-size tokens (text-display-xl/lg/md/sm)
// and brand colors so it doesn't mistakenly drop `text-display-md` when paired with
// `text-umber` (both start with `text-`, so default config treats them as conflicting).
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['display-xl', 'display-lg', 'display-md', 'display-sm'] },
      ],
      'text-color': [
        {
          text: [
            'umber',
            'cream',
            'gold',
            'sand',
            'brown',
            'warm-grey',
            'bg-orange',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export const isBrowser = () => typeof window !== 'undefined';

export function prefersReducedMotion() {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
