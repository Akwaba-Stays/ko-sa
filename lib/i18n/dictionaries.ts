/**
 * KO-SA i18n dictionary — lightweight, cookie-driven, no route restructure.
 * Add keys with EN as source of truth; FR & ES translations follow.
 * Used via `useT()` (client) and `getT()` (server).
 */

export const SUPPORTED_LOCALES = ['en', 'fr', 'es'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_COOKIE = 'kosa_locale';

/** Display metadata for each supported language. Used by the LanguageSwitcher. */
export const LOCALE_META: Record<Locale, { label: string; native: string; flag: string; code: string }> = {
  en: { label: 'English', native: 'English',   flag: '🇬🇧', code: 'EN' },
  fr: { label: 'French',  native: 'Français',  flag: '🇫🇷', code: 'FR' },
  es: { label: 'Spanish', native: 'Español',   flag: '🇪🇸', code: 'ES' },
};

const en = {
  // Navigation
  'nav.rooms': 'Rooms',
  'nav.experiences': 'Experiences',
  'nav.dining': 'Dining',
  'nav.wellness': 'Wellness',
  'nav.gallery': 'Gallery',
  'nav.virtualTour': 'Virtual Tour',
  'nav.about': 'About',
  'nav.blog': 'Journal',
  'nav.contact': 'Contact',
  'nav.book': 'Book Now',
  'nav.bookYourStay': 'Book Your Stay',

  // Hero
  'hero.location': 'Elmina · Ghana · West Africa',
  'hero.headline': 'Simply, Belong.',
  'hero.tagline': 'Breathe · Beach · Belong',
  'hero.bookCta': 'Book Your Escape',
  'hero.exploreCta': 'Explore the Resort',
  'hero.scrollAria': 'Scroll to next section',

  // Intro
  'intro.eyebrow': 'Welcome · Akwaaba',
  'intro.headline.l1': 'KO-SA is not a hotel.',
  'intro.headline.l2': 'It is a place you return to.',
  'intro.body':
    'On a stretch of soft Atlantic coast in Elmina, where palms lean toward the wind and the ocean keeps a slower clock, we built a place to be still. Eco-luxe in its bones, grounded in Ghanaian craft, and elevated by the rituals of the people who tend it.',
  'intro.script': 'Simply, Breathe.',
  'intro.philosophyCta': 'Read our philosophy the 5 layers of self',

  // Rooms section
  'rooms.eyebrow': 'Stay with us',
  'rooms.headline': 'Boutique by the Atlantic',
  'rooms.statRooms': 'Rooms',
  'rooms.statSuites': 'Suites',
  'rooms.statBeach': 'Beach',
  'rooms.filter.all': 'All',
  'rooms.filter.beachView': 'Beach View',
  'rooms.filter.palmSide': 'Palm Side',
  'rooms.filter.suite': 'Suite',
  'rooms.priceFrom': 'From',
  'rooms.perNight': 'night',
  'rooms.view': 'View',

  // Experiences section
  'experiences.eyebrow': 'Live fully',
  'experiences.headline': 'Four ways to feel rooted.',
  'experiences.blurb':
    'From sunrise yoga on the bluff to fire-lit drum circles, every day at KO-SA is composed of small returns to yourself.',
  'experiences.discover': 'Discover',

  // Wellness section
  'wellness.bgWord': 'Simply, Breathe',
  'wellness.eyebrow': 'Breathe',
  'wellness.headline.l1': 'Spa, yoga, sound',
  'wellness.headline.l2': 'the five layers of self.',
  'wellness.blurb':
    'Treatments born of West African materia — shea, palm, salt — performed in open cabanas where the only sound is the tide.',
  'wellness.bookCta': 'Book a Treatment',

  // Testimonials
  'testimonials.eyebrow': 'Returning Guests',
  'testimonials.headline': 'Words from the shore.',

  // Booking CTA
  'booking.eyebrow': 'Reserve Your Return',
  'booking.headline.l1': 'The shore is ready.',
  'booking.headline.l2': 'Are you?',
  'booking.blurb':
    'Real-time availability, best-rate guarantee, and a warm welcome at the gate. Book in under two minutes.',
  'booking.badgeSecure': 'Secure Booking',
  'booking.badgeBestRate': 'Best Rate Guaranteed',
  'booking.badgeCancel': 'Free Cancellation',
  'booking.formTitle': 'Check Availability',
  'booking.checkIn': 'Check in',
  'booking.checkOut': 'Check out',
  'booking.adults': 'Adults',
  'booking.adult': 'adult',
  'booking.adultsPlural': 'adults',
  'booking.children': 'Children',
  'booking.child': 'child',
  'booking.childrenPlural': 'children',
  'booking.submit': 'Check Availability',
  'booking.submitting': 'Checking…',

  // Footer
  'footer.tagline': 'Simply, Belong.',
  'footer.about':
    "An eco-luxury beach sanctuary on Ghana's Atlantic coast where the rhythm of the ocean meets the warmth of Akan hospitality.",
  'footer.explore': 'Explore',
  'footer.connect': 'Connect',
  'footer.newsletter': 'Stay in the feeling',
  'footer.newsletterBlurb': 'Seasonal letters from the shore. No spam only seasons.',
  'footer.copyright': 'All rights reserved.',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.admin': 'Admin',

  // Chat widget
  'chat.cta': 'Chat with Abena',
  'chat.title': 'Abena',
  'chat.subtitle': 'Digital concierge · usually replies instantly',
  'chat.greeting':
    "Akwaaba — I'm Abena, your KO-SA concierge. Ask me anything about the resort, our rooms, or planning your stay.",
  'chat.placeholder': 'Ask anything…',
  'chat.send': 'Send',
  'chat.close': 'Close chat',
  'chat.suggested.rooms': 'What rooms are available?',
  'chat.suggested.directions': 'How do I get to KO-SA from Accra?',
  'chat.suggested.spa': 'Tell me about the spa',
  'chat.suggested.included': "What's included in my stay?",

  // Contact form
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.phone': 'Phone (optional)',
  'contact.subject': 'Subject (optional)',
  'contact.message': 'Message',
  'contact.send': 'Send Enquiry',
  'contact.sending': 'Sending…',
  'contact.thankTitle': 'Thank you.',
  'contact.thankBody': "We'll be in touch within a day — usually sooner.",
  'contact.error.name': 'Please enter your name',
  'contact.error.email': 'Please enter a valid email',
  'contact.error.message': 'Please share a few more words',
  'contact.error.generic': 'Could not send',

  // Cultural section
  'cultural.eyebrow': 'Adinkra · Symbols of the Akan',
  'cultural.headline': 'Rooted in Ghana.',
  'cultural.description': 'We carry these four symbols through the resort — etched in wood, drawn in linen, traced in every welcome.',
  'cultural.footer': 'Akwaaba — you are welcome here.',

  // Gallery section
  'gallery.eyebrow': 'Through the Lens',
  'gallery.headline': 'Gallery',
  'gallery.description': 'A slow scroll through the resort and the shoreline that holds it.',
  'gallery.loadMore': 'Load More',

  // Virtual tour section
  'tour.eyebrow': '360° Virtual Tour',
  'tour.headline': 'Step Inside. Simply, Explore.',
  'tour.description': 'Wander the suites, the spa, the shoreline — from anywhere in the world.',
  'tour.cta': 'Enter the Tour',
  'tour.footer': 'Powered by Google Drive · 6 Scenes',

  // Common
  'common.learnMore': 'Learn More',
  'common.discover': 'Discover',
  'common.bookNow': 'Book Now',
  'common.viewAll': 'View All',
  'common.languageEn': 'English',
  'common.languageFr': 'Français',
  'common.languageEs': 'Español',
  'common.toggleLanguage': 'Toggle language',
  'common.selectLanguage': 'Select language',
} as const;

const fr: Record<keyof typeof en, string> = {
  'nav.rooms': 'Chambres',
  'nav.experiences': 'Expériences',
  'nav.dining': 'Restauration',
  'nav.wellness': 'Bien-être',
  'nav.gallery': 'Galerie',
  'nav.virtualTour': 'Visite virtuelle',
  'nav.about': 'À propos',
  'nav.blog': 'Journal',
  'nav.contact': 'Contact',
  'nav.book': 'Réserver',
  'nav.bookYourStay': 'Réservez votre séjour',

  'hero.location': 'Elmina · Ghana · Afrique de l’Ouest',
  'hero.headline': 'Simplement, Appartenez.',
  'hero.tagline': 'Respirer · Plage · Appartenir',
  'hero.bookCta': 'Réservez votre escapade',
  'hero.exploreCta': 'Découvrir la station',
  'hero.scrollAria': 'Passer à la section suivante',

  'intro.eyebrow': 'Bienvenue · Akwaaba',
  'intro.headline.l1': 'KO-SA n’est pas un hôtel.',
  'intro.headline.l2': 'C’est un lieu où l’on revient.',
  'intro.body':
    'Sur une bande de côte atlantique douce, à Elmina, où les palmiers se penchent dans le vent et où l’océan garde une horloge plus lente, nous avons bâti un lieu pour la quiétude. Éco-luxe dans ses fondations, ancré dans l’artisanat ghanéen, et élevé par les rituels de celles et ceux qui en prennent soin.',
  'intro.script': 'Simplement, Respirez.',
  'intro.philosophyCta': 'Lire notre philosophie les 5 couches de soi',

  'rooms.eyebrow': 'Séjournez avec nous',
  'rooms.headline': 'Boutique au bord de l’Atlantique',
  'rooms.statRooms': 'Chambres',
  'rooms.statSuites': 'Suites',
  'rooms.statBeach': 'Plage',
  'rooms.filter.all': 'Tout',
  'rooms.filter.beachView': 'Vue sur la plage',
  'rooms.filter.palmSide': 'Côté palmiers',
  'rooms.filter.suite': 'Suite',
  'rooms.priceFrom': 'À partir de',
  'rooms.perNight': 'nuit',
  'rooms.view': 'Voir',

  'experiences.eyebrow': 'Vivre pleinement',
  'experiences.headline': 'Quatre façons de s’enraciner.',
  'experiences.blurb':
    'Du yoga au lever du soleil sur la falaise aux cercles de tambour autour du feu, chaque jour à KO-SA se compose de petits retours à soi.',
  'experiences.discover': 'Découvrir',

  'wellness.bgWord': 'Simplement, Respirez',
  'wellness.eyebrow': 'Respirer',
  'wellness.headline.l1': 'Spa, yoga, son —',
  'wellness.headline.l2': 'les cinq couches de soi.',
  'wellness.blurb':
    'Des soins nés de la matière ouest-africaine — karité, palme, sel — dispensés en cabanes ouvertes où seule la marée se fait entendre.',
  'wellness.bookCta': 'Réserver un soin',

  'testimonials.eyebrow': 'Hôtes fidèles',
  'testimonials.headline': 'Paroles du rivage.',

  'booking.eyebrow': 'Réservez votre retour',
  'booking.headline.l1': 'Le rivage est prêt.',
  'booking.headline.l2': 'Et vous ?',
  'booking.blurb':
    'Disponibilités en temps réel, meilleur tarif garanti, et un accueil chaleureux à l’entrée. Réservez en moins de deux minutes.',
  'booking.badgeSecure': 'Réservation sécurisée',
  'booking.badgeBestRate': 'Meilleur tarif garanti',
  'booking.badgeCancel': 'Annulation gratuite',
  'booking.formTitle': 'Vérifier les disponibilités',
  'booking.checkIn': 'Arrivée',
  'booking.checkOut': 'Départ',
  'booking.adults': 'Adultes',
  'booking.adult': 'adulte',
  'booking.adultsPlural': 'adultes',
  'booking.children': 'Enfants',
  'booking.child': 'enfant',
  'booking.childrenPlural': 'enfants',
  'booking.submit': 'Vérifier les disponibilités',
  'booking.submitting': 'Vérification…',

  'footer.tagline': 'Simplement, Appartenez.',
  'footer.about':
    'Un sanctuaire éco-luxueux sur la côte atlantique du Ghana où le rythme de l’océan rencontre la chaleur de l’hospitalité akan.',
  'footer.explore': 'Explorer',
  'footer.connect': 'Nous joindre',
  'footer.newsletter': 'Restez dans l’instant',
  'footer.newsletterBlurb': 'Lettres saisonnières du rivage. Pas de spam seulement les saisons.',
  'footer.copyright': 'Tous droits réservés.',
  'footer.privacy': 'Confidentialité',
  'footer.terms': 'Conditions',
  'footer.admin': 'Admin',

  'chat.cta': 'Discuter avec Abena',
  'chat.title': 'Abena',
  'chat.subtitle': 'Concierge numérique · réponse quasi instantanée',
  'chat.greeting':
    'Akwaaba — je suis Abena, votre concierge KO-SA. Posez-moi vos questions sur la station, nos chambres ou la planification de votre séjour.',
  'chat.placeholder': 'Posez votre question…',
  'chat.send': 'Envoyer',
  'chat.close': 'Fermer la conversation',
  'chat.suggested.rooms': 'Quelles chambres sont disponibles ?',
  'chat.suggested.directions': 'Comment se rendre à KO-SA depuis Accra ?',
  'chat.suggested.spa': 'Parlez-moi du spa',
  'chat.suggested.included': 'Que comprend mon séjour ?',

  'contact.name': 'Nom',
  'contact.email': 'E-mail',
  'contact.phone': 'Téléphone (facultatif)',
  'contact.subject': 'Objet (facultatif)',
  'contact.message': 'Message',
  'contact.send': 'Envoyer la demande',
  'contact.sending': 'Envoi…',
  'contact.thankTitle': 'Merci.',
  'contact.thankBody': 'Nous vous répondrons sous un jour — souvent plus vite.',
  'contact.error.name': 'Veuillez saisir votre nom',
  'contact.error.email': 'Veuillez saisir une adresse e-mail valide',
  'contact.error.message': 'Merci d’écrire quelques mots de plus',
  'contact.error.generic': 'Envoi impossible',

  'cultural.eyebrow': 'Adinkra · Symboles des Akan',
  'cultural.headline': 'Enraciné au Ghana.',
  'cultural.description': 'Nous portons ces quatre symboles à travers la station — gravés dans le bois, dessinés sur le lin, tracés dans chaque accueil.',
  'cultural.footer': 'Akwaaba — vous êtes les bienvenus ici.',

  'gallery.eyebrow': "À travers l'objectif",
  'gallery.headline': 'Galerie',
  'gallery.description': "Un défilement lent à travers la station et le rivage qui l'abrite.",
  'gallery.loadMore': 'Voir plus',

  'tour.eyebrow': 'Visite virtuelle 360°',
  'tour.headline': 'Entrez. Simplement, Explorez.',
  'tour.description': "Parcourez les suites, le spa, le rivage — depuis n'importe où dans le monde.",
  'tour.cta': 'Lancer la visite',
  'tour.footer': 'Propulsé par Google Drive · 6 Scènes',

  'common.learnMore': 'En savoir plus',
  'common.discover': 'Découvrir',
  'common.bookNow': 'Réserver',
  'common.viewAll': 'Voir tout',
  'common.languageEn': 'English',
  'common.languageFr': 'Français',
  'common.languageEs': 'Español',
  'common.toggleLanguage': 'Changer de langue',
  'common.selectLanguage': 'Choisir la langue',
};

const es: Record<keyof typeof en, string> = {
  'nav.rooms': 'Habitaciones',
  'nav.experiences': 'Experiencias',
  'nav.dining': 'Gastronomía',
  'nav.wellness': 'Bienestar',
  'nav.gallery': 'Galería',
  'nav.virtualTour': 'Tour virtual',
  'nav.about': 'Nosotros',
  'nav.blog': 'Diario',
  'nav.contact': 'Contacto',
  'nav.book': 'Reservar',
  'nav.bookYourStay': 'Reserva tu estancia',

  'hero.location': 'Elmina · Ghana · África Occidental',
  'hero.headline': 'Simplemente, Pertenece.',
  'hero.tagline': 'Respirar · Playa · Pertenecer',
  'hero.bookCta': 'Reserva tu escapada',
  'hero.exploreCta': 'Descubre el resort',
  'hero.scrollAria': 'Pasar a la siguiente sección',

  'intro.eyebrow': 'Bienvenidos · Akwaaba',
  'intro.headline.l1': 'KO-SA no es un hotel.',
  'intro.headline.l2': 'Es un lugar al que vuelves.',
  'intro.body':
    'En un tramo de suave costa atlántica en Elmina, donde las palmeras se inclinan con el viento y el océano marca un reloj más lento, hemos creado un lugar para detenerse. Eco-lujo en su esencia, arraigado en la artesanía ghanesa y elevado por los rituales de quienes lo cuidan.',
  'intro.script': 'Simplemente, Respira.',
  'intro.philosophyCta': 'Lee nuestra filosofía las 5 capas del ser',

  'rooms.eyebrow': 'Hospédate con nosotros',
  'rooms.headline': 'Boutique junto al Atlántico',
  'rooms.statRooms': 'Habitaciones',
  'rooms.statSuites': 'Suites',
  'rooms.statBeach': 'Playa',
  'rooms.filter.all': 'Todas',
  'rooms.filter.beachView': 'Vista al mar',
  'rooms.filter.palmSide': 'Junto a los palmares',
  'rooms.filter.suite': 'Suite',
  'rooms.priceFrom': 'Desde',
  'rooms.perNight': 'noche',
  'rooms.view': 'Ver',

  'experiences.eyebrow': 'Vive plenamente',
  'experiences.headline': 'Cuatro formas de echar raíces.',
  'experiences.blurb':
    'Desde yoga al amanecer en el acantilado hasta círculos de tambor junto al fuego, cada día en KO-SA se compone de pequeños regresos a ti mismo.',
  'experiences.discover': 'Descubrir',

  'wellness.bgWord': 'Simplemente, Respira',
  'wellness.eyebrow': 'Respirar',
  'wellness.headline.l1': 'Spa, yoga, sonido —',
  'wellness.headline.l2': 'las cinco capas del ser.',
  'wellness.blurb':
    'Tratamientos nacidos de la materia oeste-africana — karité, palma, sal — realizados en cabañas abiertas donde solo se oye la marea.',
  'wellness.bookCta': 'Reservar un tratamiento',

  'testimonials.eyebrow': 'Huéspedes que regresan',
  'testimonials.headline': 'Palabras desde la orilla.',

  'booking.eyebrow': 'Reserva tu regreso',
  'booking.headline.l1': 'La orilla está lista.',
  'booking.headline.l2': '¿Y tú?',
  'booking.blurb':
    'Disponibilidad en tiempo real, mejor tarifa garantizada y una cálida bienvenida a la entrada. Reserva en menos de dos minutos.',
  'booking.badgeSecure': 'Reserva segura',
  'booking.badgeBestRate': 'Mejor tarifa garantizada',
  'booking.badgeCancel': 'Cancelación gratuita',
  'booking.formTitle': 'Consultar disponibilidad',
  'booking.checkIn': 'Entrada',
  'booking.checkOut': 'Salida',
  'booking.adults': 'Adultos',
  'booking.adult': 'adulto',
  'booking.adultsPlural': 'adultos',
  'booking.children': 'Niños',
  'booking.child': 'niño',
  'booking.childrenPlural': 'niños',
  'booking.submit': 'Consultar disponibilidad',
  'booking.submitting': 'Consultando…',

  'footer.tagline': 'Simplemente, Pertenece.',
  'footer.about':
    'Un santuario eco-lujoso en la costa atlántica de Ghana, donde el ritmo del océano se encuentra con la calidez de la hospitalidad akan.',
  'footer.explore': 'Explorar',
  'footer.connect': 'Conectar',
  'footer.newsletter': 'Mantente en la sensación',
  'footer.newsletterBlurb': 'Cartas estacionales desde la costa. Sin spam, solo estaciones.',
  'footer.copyright': 'Todos los derechos reservados.',
  'footer.privacy': 'Privacidad',
  'footer.terms': 'Términos',
  'footer.admin': 'Admin',

  'chat.cta': 'Chatea con Abena',
  'chat.title': 'Abena',
  'chat.subtitle': 'Conserje digital · suele responder al instante',
  'chat.greeting':
    'Akwaaba — soy Abena, tu conserje de KO-SA. Pregúntame lo que quieras sobre el resort, las habitaciones o cómo planificar tu estancia.',
  'chat.placeholder': 'Pregunta lo que quieras…',
  'chat.send': 'Enviar',
  'chat.close': 'Cerrar chat',
  'chat.suggested.rooms': '¿Qué habitaciones hay disponibles?',
  'chat.suggested.directions': '¿Cómo llego a KO-SA desde Accra?',
  'chat.suggested.spa': 'Háblame del spa',
  'chat.suggested.included': '¿Qué incluye mi estancia?',

  'contact.name': 'Nombre',
  'contact.email': 'Correo electrónico',
  'contact.phone': 'Teléfono (opcional)',
  'contact.subject': 'Asunto (opcional)',
  'contact.message': 'Mensaje',
  'contact.send': 'Enviar consulta',
  'contact.sending': 'Enviando…',
  'contact.thankTitle': 'Gracias.',
  'contact.thankBody': 'Te responderemos en un día — normalmente antes.',
  'contact.error.name': 'Por favor, introduce tu nombre',
  'contact.error.email': 'Por favor, introduce un correo válido',
  'contact.error.message': 'Escríbenos un poco más, por favor',
  'contact.error.generic': 'No se pudo enviar',

  'cultural.eyebrow': 'Adinkra · Símbolos de los Akan',
  'cultural.headline': 'Arraigado en Ghana.',
  'cultural.description': 'Llevamos estos cuatro símbolos por todo el resort — grabados en madera, dibujados en lino, trazados en cada bienvenida.',
  'cultural.footer': 'Akwaaba — eres bienvenido aquí.',

  'gallery.eyebrow': 'A través del lente',
  'gallery.headline': 'Galería',
  'gallery.description': 'Un recorrido pausado por el resort y la costa que lo envuelve.',
  'gallery.loadMore': 'Ver más',

  'tour.eyebrow': 'Tour virtual 360°',
  'tour.headline': 'Entra. Simplemente, Explora.',
  'tour.description': 'Recorre las suites, el spa, la costa — desde cualquier lugar del mundo.',
  'tour.cta': 'Iniciar el tour',
  'tour.footer': 'Con Google Drive · 6 Escenas',

  'common.learnMore': 'Más información',
  'common.discover': 'Descubrir',
  'common.bookNow': 'Reservar',
  'common.viewAll': 'Ver todo',
  'common.languageEn': 'English',
  'common.languageFr': 'Français',
  'common.languageEs': 'Español',
  'common.toggleLanguage': 'Cambiar idioma',
  'common.selectLanguage': 'Seleccionar idioma',
};

export const dictionaries = { en, fr, es } as const;
export type DictKey = keyof typeof en;

export function translate(locale: Locale, key: DictKey): string {
  return dictionaries[locale]?.[key] ?? dictionaries.en[key] ?? key;
}
