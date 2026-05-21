export const site = {
  name: 'KO-SA Beach Resort',
  brand: 'Kosa Palms',
  domain: 'ko-sa.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ko-sa.com',
  description:
    'Eco-luxury beach resort in Elmina, Ghana. Where the Atlantic meets African coastal soul Simply, Belong.',
  tagline: 'Simply, Belong.',
  taglines: ['Simply, Belong', 'Simply, Breathe', 'Simply, Beach'] as const,
  location: { lat: 5.0853, lng: -1.3496, city: 'Elmina', country: 'Ghana' },
  contact: {
    email: 'info@ko-sa.com',
    phone: '+233 24 437 5432',
    whatsapp: '233244375432',
    address: 'Beach Road No.1, Ampenyi, Elmina, Ghana',
  },
  socials: {
    instagram: 'https://www.instagram.com/kosabeachresort',
    facebook: 'https://www.facebook.com/kosabeachresort',
    tripadvisor: 'https://www.tripadvisor.com/Hotel_Review-Ko-Sa-Beach-Resort',
    whatsapp: 'https://wa.me/233244375432',
  },
  nav: [
    { label: 'Stay', href: '/rooms', dictKey: 'nav.rooms' },
    { label: 'Experiences', href: '/experiences', dictKey: 'nav.experiences' },
    { label: 'Wellness', href: '/wellness', dictKey: 'nav.wellness' },
    { label: 'Dining', href: '/dining', dictKey: 'nav.dining' },
    { label: 'Virtual Tour', href: '/virtual-tour', dictKey: 'nav.virtualTour' },
    { label: 'Gallery', href: '/gallery', dictKey: 'nav.gallery' },
    { label: 'Journal', href: '/blog', dictKey: 'nav.blog' },
    { label: 'About', href: '/about', dictKey: 'nav.about' },
    { label: 'Contact', href: '/contact', dictKey: 'nav.contact' },
  ] as const,
} as const;

export type Site = typeof site;
