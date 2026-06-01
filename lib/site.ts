// Site-level configuration. Keep aligned with KOSA Brand Guide + Website
// Content Brief. The nav structure here drives Navbar, Footer and the
// AdminShell's "View site" link.

export const site = {
  name: 'KO-SA Beach Resort',
  brand: 'Akwaaba Stays',
  group: 'Akwaaba Stays Hospitality Group',
  domain: 'ko-sa.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ko-sa.com',
  description:
    "Eco-luxury beach resort in Ampenyi, Elmina Ghana's coastal sanctuary for the soul. Rest, reconnect, come back to yourself",
  tagline: 'Rest. Reconnect. Come back to yourself',
  taglines: ['Simply, Belong', 'Simply, Breathe', 'Simply, Beach'] as const,
  location: { lat: 5.0853, lng: -1.3496, city: 'Ampenyi · Elmina', region: 'Central Region', country: 'Ghana' },
  // External Cloudbeds booking engine. Every "Book Now" / room-booking CTA
  // points here for now (opens in a new tab). Swap this single value when the
  // native booking flow goes live.
  bookingUrl: 'https://us2.cloudbeds.com/en/reservation/65CAqa?currency=ghs',
  contact: {
    email: 'info@ko-sa.com',
    phone: '+233 24 437 5432',
    whatsapp: '233244375432',
    whatsappMessage: "Hi Ko-Sa! I'd like to find out more about booking a stay",
    address: 'Beach Road No.1, Ampenyi, Elmina, Ghana',
  },
  socials: {
    instagram: 'https://www.instagram.com/kosabeachresort',
    facebook: 'https://www.facebook.com/kosabeachresort',
    tripadvisor: 'https://www.tripadvisor.com/Hotel_Review-Ko-Sa-Beach-Resort',
    whatsapp: 'https://wa.me/233244375432',
  },
  reviews: {
    google: { score: 4.8, max: 5, url: 'https://maps.google.com/?cid=ko-sa-beach-resort' },
    booking: { score: 9.1, max: 10, url: 'https://booking.com/hotel/gh/ko-sa-beach-resort' },
    tripadvisor: { score: 4.7, max: 5, url: 'https://www.tripadvisor.com/Hotel_Review-Ko-Sa-Beach-Resort' },
    totalGuests: 5000,
  },
  // Primary navigation per the Content Brief §02 + 2026 restructure. Each
  // top-level item may declare a `children` array Navbar renders that as a
  // hover/click dropdown, Footer flattens children into Quick Links.
  nav: [
    { label: 'Stay', href: '/rooms', dictKey: 'nav.stay' },
    { label: 'Wellness', href: '/wellness', dictKey: 'nav.wellness' },
    { label: 'Dine', href: '/dining', dictKey: 'nav.dine' },
    {
      label: 'Experience',
      href: '/experiences',
      dictKey: 'nav.experience',
      children: [
        { label: 'Experiences & Activities', href: '/experiences', dictKey: 'nav.experiences' },
        { label: 'Events & Gatherings', href: '/events', dictKey: 'nav.events' },
      ],
    },
    {
      label: 'Explore',
      href: '/gallery',
      dictKey: 'nav.explore',
      children: [
        { label: 'Gallery', href: '/gallery', dictKey: 'nav.gallery' },
        { label: 'Journal', href: '/blog', dictKey: 'nav.blog' },
        { label: 'Virtual Tour', href: '/virtual-tour', dictKey: 'nav.virtualTour' },
        { label: 'Contact', href: '/contact', dictKey: 'nav.contact' },
      ],
    },
    { label: 'Plan Your Visit', href: '/plan', dictKey: 'nav.plan' },
    { label: 'Our Story', href: '/about', dictKey: 'nav.about' },
  ] as const,
} as const;

export type Site = typeof site;

// Convenience: flat list of all reachable nav items (top-level + children).
// Used by the Footer Quick Links.
export const allNavLinks = (() => {
  const out: { href: string; dictKey: string }[] = [];
  for (const item of site.nav) {
    if ('children' in item && item.children) {
      for (const c of item.children) out.push({ href: c.href, dictKey: c.dictKey });
    } else {
      out.push({ href: item.href, dictKey: item.dictKey });
    }
  }
  return out;
})();
