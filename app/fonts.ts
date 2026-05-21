import { Belleza, Raleway, Beth_Ellen, Poppins } from 'next/font/google';

export const belleza = Belleza({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-belleza',
  display: 'swap',
});

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
});

export const bethEllen = Beth_Ellen({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-beth-ellen',
  display: 'swap',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});
