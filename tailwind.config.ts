import type { Config } from 'tailwindcss';

// KO-SA Beach Resort palette — per KOSA Brand Guide §4 colour palette.
//   Teal       primary brand colour (logo, headlines on cream, buttons)
//   Forest     supporting deep green for body text & footer
//   Coral      energetic accent for callouts & section eyebrows
//   Sand       warm off-white page background
//   Cream      pure cream surface for cards
//   Sunshine   golden accent for highlights, ratings, micro-marks
// Legacy aliases (`umber`, `gold`, `bg-orange`, `warm-grey`, `brown`) are kept
// pointing to the closest new colour so existing components don't break.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        // ── KOSA brand palette ──────────────────────────────────────────
        teal: {
          DEFAULT: '#0F7B8F',
          50: '#E6F1F4',
          100: '#CCE3E9',
          200: '#99C7D2',
          300: '#66AABC',
          400: '#338EA5',
          500: '#0F7B8F',
          600: '#0C6273',
          700: '#094956',
          800: '#06313A',
          900: '#03181D',
        },
        forest: {
          DEFAULT: '#2D4F2C',
          50: '#E9EFE9',
          100: '#D3DFD2',
          500: '#2D4F2C',
          700: '#1E3A1D',
          900: '#0F1F0E',
        },
        coral: {
          DEFAULT: '#E8765B',
          50: '#FDEBE6',
          100: '#FBD6CD',
          400: '#EE8E78',
          500: '#E8765B',
          600: '#D45E42',
          700: '#A8462F',
        },
        sand: {
          DEFAULT: '#F5E9D0',
          50: '#FFFCF5',
          100: '#FBF4E2',
          200: '#F5E9D0',
          300: '#EAD9B0',
          400: '#D9C18A',
          light: '#FAF4E4',
        },
        cream: {
          DEFAULT: '#FBF8F1',
          50: '#FFFEFB',
          100: '#FBF8F1',
          200: '#F5EFE0',
        },
        sunshine: {
          DEFAULT: '#F5B82E',
          50: '#FEF6E1',
          100: '#FCE9B3',
          400: '#F7C859',
          500: '#F5B82E',
          600: '#D69C18',
          700: '#A37811',
        },

        // ── Semantic tokens (used by shadcn-style components) ────────────
        primary: { DEFAULT: '#0F7B8F', dark: '#094956', foreground: '#FBF8F1' },
        secondary: { DEFAULT: '#E8765B', dark: '#A8462F', foreground: '#FBF8F1' },
        accent: { DEFAULT: '#F5B82E', dark: '#A37811', foreground: '#0F1F0E' },
        muted: { DEFAULT: '#F5E9D0', foreground: '#2D4F2C' },
        cta: { DEFAULT: '#E8765B', light: '#EE8E78' },
        card: { DEFAULT: '#FBF8F1', foreground: '#2D4F2C' },
        border: { DEFAULT: '#EAD9B0' },
        ring: { DEFAULT: '#0F7B8F' },

        // ── Legacy aliases — keep older components compiling ────────────
        // Map every name once used in the codebase to the closest new colour.
        umber: {
          DEFAULT: '#2D4F2C',
          50: '#FBF8F1',
          100: '#F5E9D0',
          500: '#2D4F2C',
          700: '#1E3A1D',
          900: '#0F1F0E',
        },
        brown: { DEFAULT: '#A8462F', 500: '#A8462F', 700: '#7A311F' },
        gold: { DEFAULT: '#F5B82E', 500: '#F5B82E', 600: '#D69C18' },
        'warm-grey': { DEFAULT: '#EAD9B0' },
        'bg-orange': { DEFAULT: '#FAF4E4' },
      },
      fontFamily: {
        // ── The only three brand fonts (KOSA Brand Guide §4) ────────────
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        raleway: ['var(--font-raleway)', 'Inter', 'sans-serif'],
        sans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
        opensans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
        // ── Legacy aliases → mapped onto the brand fonts so any older ───
        //    markup (font-belleza / font-poppins / font-beth) stays in-brand.
        belleza: ['var(--font-playfair)', 'Georgia', 'serif'], // → Playfair
        beth: ['var(--font-playfair)', 'Georgia', 'serif'], // → Playfair (italic accents)
        poppins: ['var(--font-raleway)', 'Inter', 'sans-serif'], // → Raleway
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 10vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.05' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.15' }],
      },
      letterSpacing: {
        tracked: '0.18em',
        'tracked-sm': '0.08em',
      },
      maxWidth: {
        'screen-2xl': '1536px',
        'screen-3xl': '1920px',
        prose: '68ch',
      },
      backgroundImage: {
        // Subtle wave pattern reminiscent of the brand guide cover
        waves:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1440' height='180' viewBox='0 0 1440 180'><path d='M0,120 Q360,60 720,120 T1440,120 V180 H0 Z' fill='%23F5E9D0' fill-opacity='0.6'/></svg>\")",
        'topo-sand':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'><g fill='none' stroke='%23EAD9B0' stroke-opacity='0.12'><path d='M0 300 Q150 250 300 300 T600 300'/><path d='M0 350 Q150 300 300 350 T600 350'/><path d='M0 400 Q150 350 300 400 T600 400'/><path d='M0 250 Q150 200 300 250 T600 250'/></g></svg>\")",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll-indicator': 'scrollIndicator 2.4s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        scrollIndicator: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(10px)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
