import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { belleza, raleway, bethEllen, poppins } from './fonts';
import '../styles/globals.css';
import { site } from '@/lib/site';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Preloader } from '@/components/layout/Preloader';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { FloatingWhatsApp } from '@/components/shared/FloatingWhatsApp';
import { JsonLd } from '@/components/seo/JsonLd';
import { Providers } from '@/components/providers/Providers';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Eco-Luxury Beach Resort, Elmina, Ghana`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    'eco-luxury beach resort Ghana',
    'Elmina beach resort',
    'Ghana beachside hotel',
    'Kosa Palms',
    'African coastal sanctuary',
    'wellness retreat Ghana',
  ],
  authors: [{ name: site.brand }],
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: [{ url: '/og/og-default.jpg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: ['/og/og-default.jpg'],
  },
  alternates: {
    canonical: site.url,
    languages: { en: site.url, fr: `${site.url}/fr` },
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#2c606e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html
      lang="en"
      className={`${belleza.variable} ${raleway.variable} ${bethEllen.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen bg-bg-orange text-umber antialiased">
        <Providers>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <JsonLd />
          <Preloader />
          <SmoothScroll />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <ChatWidget />
          <FloatingWhatsApp />
          <Analytics />
        </Providers>
        {gtm && (
          <Script id="gtm" strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
          </Script>
        )}
      </body>
    </html>
  );
}
