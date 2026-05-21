import type { Config } from 'tailwindcss';

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
        // KO-SA palette — extracted from logo.png
        umber: {
          DEFAULT: '#1a1a1a',
          50: '#f9f8f4',
          100: '#f0ede5',
          500: '#5c5c5c',
          700: '#1a1a1a',
          900: '#0d0d0d',
        },
        brown: { DEFAULT: '#5c5c5c', 500: '#5c5c5c', 700: '#3d3530' },
        gold: { DEFAULT: '#d36f0c', 500: '#d36f0c', 600: '#b55d09' },
        sand: { DEFAULT: '#f9f8f4', light: '#fdfcf9' },
        cream: { DEFAULT: '#f9f8f4' },
        'warm-grey': { DEFAULT: '#e0ddd4' },
        'bg-orange': { DEFAULT: '#f0ede5' },
        primary: { DEFAULT: '#2c606e', dark: '#234e5a', foreground: '#ffffff' },
        secondary: { DEFAULT: '#d36f0c', dark: '#b55d09', foreground: '#ffffff' },
        accent: { DEFAULT: '#d36f0c', dark: '#b55d09', foreground: '#ffffff' },
        muted: { DEFAULT: '#f0ede5', foreground: '#5c5c5c' },
        cta: { DEFAULT: '#d36f0c', light: '#e07f1d' },
        card: { DEFAULT: '#ffffff', foreground: '#1a1a1a' },
        border: { DEFAULT: '#e0ddd4' },
        ring: { DEFAULT: '#2c606e' },
      },
      fontFamily: {
        belleza: ['var(--font-belleza)', 'serif'],
        raleway: ['var(--font-raleway)', 'sans-serif'],
        beth: ['var(--font-beth-ellen)', 'cursive'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
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
        'topo-sand':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'><g fill='none' stroke='%23B4A26D' stroke-opacity='0.08'><path d='M0 300 Q150 250 300 300 T600 300'/><path d='M0 350 Q150 300 300 350 T600 350'/><path d='M0 400 Q150 350 300 400 T600 400'/><path d='M0 250 Q150 200 300 250 T600 250'/></g></svg>\")",
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
