// Brand-guide typography (KOSA Brand Guide §4) — these THREE families are the
// only fonts used across the site:
//   Playfair Display — editorial serif for headlines
//   Raleway          — display sans for sub-heads, labels, large body
//   Open Sans        — workhorse body font
//
// No other typefaces are loaded. Legacy class names (`font-belleza`,
// `font-poppins`, `font-beth`) are aliased to these three in tailwind.config.ts
// so any older markup still renders in-brand.

import { Playfair_Display, Raleway, Open_Sans } from 'next/font/google';

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-raleway',
  display: 'swap',
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});
