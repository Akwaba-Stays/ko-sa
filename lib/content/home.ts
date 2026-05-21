// Editorial fallback content for homepage (until Sanity is wired).
// Each translatable item carries an optional `i18n` map keyed by locale.
// Use the `localize(item, locale)` helper to merge the EN base with overrides.

import type { AdinkraName } from '@/components/shared/AdinkraIcon';
import type { Locale } from '@/lib/i18n/dictionaries';

// ───────────────────────────────────────────────────────────────────────────────
// localize helper
// ───────────────────────────────────────────────────────────────────────────────

type WithI18n<T> = T & { i18n?: Partial<Record<Locale, Partial<T>>> };

/** Merge the base item with the locale-specific overrides (if any). */
export function localize<T extends object>(item: WithI18n<T>, locale: Locale): T {
  const overrides = item.i18n?.[locale];
  if (!overrides) return item as T;
  return { ...item, ...overrides } as T;
}

// ───────────────────────────────────────────────────────────────────────────────
// Experiences
// ───────────────────────────────────────────────────────────────────────────────

export interface Experience {
  slug: string;
  label: string;
  title: string;
  description: string;
  image: string;
  adinkra: AdinkraName;
}

export const experiences: WithI18n<Experience>[] = [
  {
    slug: 'wellness',
    label: 'Wellness',
    title: 'Rituals of the Shore',
    description:
      'Slow mornings, salt-warmed massages, breath by the palms. A return to the body.',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1400',
    adinkra: 'denkyem' as AdinkraName,
    i18n: {
      fr: {
        label: 'Bien-être',
        title: 'Rituels du rivage',
        description:
          'Matinées lentes, massages chauffés au sel, respiration sous les palmiers. Un retour au corps.',
      },
      es: {
        label: 'Bienestar',
        title: 'Rituales de la orilla',
        description:
          'Mañanas lentas, masajes templados con sal, respiración bajo las palmeras. Un regreso al cuerpo.',
      },
    },
  },
  {
    slug: 'ocean',
    label: 'Ocean Activities',
    title: 'Where the Atlantic Sings',
    description:
      'Sunrise paddleboard, fishing-village walks, snorkel reefs only locals know.',
    image:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=1400',
    adinkra: 'knonsonkonson' as AdinkraName,
    i18n: {
      fr: {
        label: 'Activités océan',
        title: 'Là où l’Atlantique chante',
        description:
          'Paddle au lever du jour, balades dans les villages de pêcheurs, récifs connus des seuls habitants.',
      },
      es: {
        label: 'Actividades del océano',
        title: 'Donde el Atlántico canta',
        description:
          'Paddle al amanecer, paseos por pueblos pesqueros, arrecifes para esnórquel que solo conocen los locales.',
      },
    },
  },
  {
    slug: 'dining',
    label: 'Dining',
    title: 'A Coast on the Plate',
    description:
      'Open-fire grouper, palm-wine glaze, garden herbs cut at dusk. Stories on every plate.',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1400',
    adinkra: 'asetena' as AdinkraName,
    i18n: {
      fr: {
        label: 'Restauration',
        title: 'Une côte dans l’assiette',
        description:
          'Mérou au feu de bois, glaçage au vin de palme, herbes cueillies au crépuscule. Des histoires à chaque assiette.',
      },
      es: {
        label: 'Gastronomía',
        title: 'Una costa en el plato',
        description:
          'Mero al fuego abierto, glaseado con vino de palma, hierbas del huerto al atardecer. Historias en cada plato.',
      },
    },
  },
  {
    slug: 'cultural',
    label: 'Cultural Rituals',
    title: 'Rooted in Ghana',
    description:
      'Elmina Castle reflections, kente weaving, drum circles around the fire.',
    image:
      'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=80&w=1400',
    adinkra: 'community' as AdinkraName,
    i18n: {
      fr: {
        label: 'Rituels culturels',
        title: 'Enraciné au Ghana',
        description:
          'Reflets du château d’Elmina, tissage du kente, cercles de tambours autour du feu.',
      },
      es: {
        label: 'Rituales culturales',
        title: 'Arraigado en Ghana',
        description:
          'Reflejos del castillo de Elmina, tejido kente, círculos de tambores junto al fuego.',
      },
    },
  },
];

// ───────────────────────────────────────────────────────────────────────────────
// Rooms
// ───────────────────────────────────────────────────────────────────────────────

export interface Room {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  image: string;
  category: 'Suite' | 'Palm Side' | 'Beach View';
}

export const rooms: WithI18n<Room>[] = [
  {
    slug: 'beachfront-suite',
    name: 'Beachfront Suite',
    tagline: 'Wake to the tide.',
    price: 320,
    currency: 'USD',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1400',
    category: 'Suite',
    i18n: {
      fr: { name: 'Suite face à la plage', tagline: 'Se réveiller avec la marée.' },
      es: { name: 'Suite frente al mar', tagline: 'Despertar con la marea.' },
    },
  },
  {
    slug: 'palm-garden-villa',
    name: 'Palm Garden Villa',
    tagline: 'Held by the canopy.',
    price: 245,
    currency: 'USD',
    image:
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1400',
    category: 'Palm Side',
    i18n: {
      fr: { name: 'Villa Jardin de palmiers', tagline: 'Bercée par la canopée.' },
      es: { name: 'Villa Jardín de Palmeras', tagline: 'Acogida por el dosel.' },
    },
  },
  {
    slug: 'ocean-view-room',
    name: 'Ocean View Room',
    tagline: 'Light, linen, the long horizon.',
    price: 180,
    currency: 'USD',
    image:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1400',
    category: 'Beach View',
    i18n: {
      fr: { name: 'Chambre vue océan', tagline: 'Lumière, lin et l’horizon lointain.' },
      es: { name: 'Habitación con vista al mar', tagline: 'Luz, lino y el horizonte largo.' },
    },
  },
  {
    slug: 'signature-villa',
    name: 'Signature Villa',
    tagline: 'For when belonging needs its own gate.',
    price: 480,
    currency: 'USD',
    image:
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&q=80&w=1400',
    category: 'Suite',
    i18n: {
      fr: { name: 'Villa Signature', tagline: 'Quand l’appartenance a sa propre porte.' },
      es: { name: 'Villa Signature', tagline: 'Cuando pertenecer pide su propia puerta.' },
    },
  },
  {
    slug: 'beach-bungalow',
    name: 'Beach Bungalow',
    tagline: 'Sand at the doorstep.',
    price: 210,
    currency: 'USD',
    image:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1400',
    category: 'Beach View',
    i18n: {
      fr: { name: 'Bungalow de plage', tagline: 'Le sable au seuil.' },
      es: { name: 'Bungaló de playa', tagline: 'Arena a la puerta.' },
    },
  },
  {
    slug: 'garden-room',
    name: 'Garden Room',
    tagline: 'Quiet, green, and unhurried.',
    price: 140,
    currency: 'USD',
    image:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1400',
    category: 'Palm Side',
    i18n: {
      fr: { name: 'Chambre jardin', tagline: 'Calme, vert, sans hâte.' },
      es: { name: 'Habitación jardín', tagline: 'Tranquila, verde y sin prisa.' },
    },
  },
];

/** Map a category back to its dict key for localized filter labels. */
export const CATEGORY_DICT_KEY = {
  Suite: 'rooms.filter.suite',
  'Palm Side': 'rooms.filter.palmSide',
  'Beach View': 'rooms.filter.beachView',
} as const;

// ───────────────────────────────────────────────────────────────────────────────
// Adinkra guide
// ───────────────────────────────────────────────────────────────────────────────

export const adinkraGuide: { name: AdinkraName; twi: string; meaning: string; line: string }[] = [
  {
    name: 'knonsonkonson',
    twi: 'Knonsonkonson',
    meaning: 'Belong',
    line: 'A chain of links we hold one another.',
  },
  {
    name: 'asetena',
    twi: 'Asetena Pa',
    meaning: 'Good Life',
    line: 'A throne for ease, for slow days, for return.',
  },
  {
    name: 'denkyem',
    twi: 'Denkyem',
    meaning: 'Breathe',
    line: 'The crocodile breathes air though it lives in water adapt, soften.',
  },
  {
    name: 'community',
    twi: 'Nkabom',
    meaning: 'Togetherness',
    line: 'A circle wider than the self.',
  },
];

// ───────────────────────────────────────────────────────────────────────────────
// Testimonials
// ───────────────────────────────────────────────────────────────────────────────

export interface Testimonial {
  name: string;
  country: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const testimonials: WithI18n<Testimonial>[] = [
  {
    name: 'Amara K.',
    country: 'Accra, Ghana',
    quote:
      "I came for a weekend and left having found a part of myself I hadn't met. The light here is different.",
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=47',
    i18n: {
      fr: {
        country: 'Accra, Ghana',
        quote:
          'Je suis venue pour un week-end et je suis repartie avec une part de moi que je n’avais pas encore rencontrée. La lumière ici est différente.',
      },
      es: {
        country: 'Accra, Ghana',
        quote:
          'Vine un fin de semana y me fui habiendo encontrado una parte de mí que aún no conocía. La luz aquí es distinta.',
      },
    },
  },
  {
    name: 'James W.',
    country: 'London, UK',
    quote:
      "The most quietly luxurious place I've stayed in West Africa. Everything is intentional, and nothing is loud.",
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=12',
    i18n: {
      fr: {
        country: 'Londres, Royaume-Uni',
        quote:
          'Le lieu le plus discrètement luxueux où je sois allé en Afrique de l’Ouest. Tout est intentionnel, rien n’est tape-à-l’œil.',
      },
      es: {
        country: 'Londres, Reino Unido',
        quote:
          'El lugar más silenciosamente lujoso en el que me he alojado en África Occidental. Todo es intencionado, nada estridente.',
      },
    },
  },
  {
    name: 'Léa M.',
    country: 'Paris, France',
    quote:
      'A sanctuary in the truest sense. The staff make you feel like a returning friend, not a guest.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=23',
    i18n: {
      fr: {
        country: 'Paris, France',
        quote:
          'Un sanctuaire au sens le plus juste. L’équipe vous fait sentir comme un ami qui revient, pas comme un client.',
      },
      es: {
        country: 'París, Francia',
        quote:
          'Un santuario en el sentido más puro. El personal te hace sentir como un amigo que vuelve, no como un huésped.',
      },
    },
  },
  {
    name: 'David O.',
    country: 'Lagos, Nigeria',
    quote: 'Ko-Sa is what every African coastline could be rooted, beautiful, dignified.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=33',
    i18n: {
      fr: {
        country: 'Lagos, Nigeria',
        quote:
          'KO-SA, c’est ce que pourrait être chaque littoral africain enraciné, beau, digne.',
      },
      es: {
        country: 'Lagos, Nigeria',
        quote:
          'KO-SA es lo que podría ser cada costa africana arraigada, hermosa, digna.',
      },
    },
  },
];

// ───────────────────────────────────────────────────────────────────────────────
// Wellness treatments
// ───────────────────────────────────────────────────────────────────────────────

export interface Treatment {
  name: string;
  duration: string;
  price: number;
}

export const treatments: WithI18n<Treatment>[] = [
  {
    name: 'Atlantic Salt Scrub',
    duration: '60 min',
    price: 75,
    i18n: {
      fr: { name: 'Gommage au sel atlantique' },
      es: { name: 'Exfoliante de sal atlántica' },
    },
  },
  {
    name: 'Palm Oil Deep Tissue',
    duration: '90 min',
    price: 110,
    i18n: {
      fr: { name: 'Massage profond à l’huile de palme' },
      es: { name: 'Masaje profundo con aceite de palma' },
    },
  },
  {
    name: 'Shea & Honey Wrap',
    duration: '75 min',
    price: 95,
    i18n: {
      fr: { name: 'Enveloppement karité & miel' },
      es: { name: 'Envoltura de karité y miel' },
    },
  },
  {
    name: 'Sound Bath by the Sea',
    duration: '45 min',
    price: 55,
    i18n: {
      fr: { name: 'Bain sonore au bord de la mer' },
      es: { name: 'Baño de sonido junto al mar' },
    },
  },
  {
    name: 'Kente Crystal Healing',
    duration: '60 min',
    price: 85,
    i18n: {
      fr: { name: 'Soin cristaux Kente' },
      es: { name: 'Sanación con cristales Kente' },
    },
  },
  {
    name: 'Coastal Yoga (Group)',
    duration: '60 min',
    price: 25,
    i18n: {
      fr: { name: 'Yoga côtier (groupe)' },
      es: { name: 'Yoga costero (grupo)' },
    },
  },
];

// ───────────────────────────────────────────────────────────────────────────────
// Gallery
// ───────────────────────────────────────────────────────────────────────────────

export const gallery = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&q=80&w=900',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=900',
];
