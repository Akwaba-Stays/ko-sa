// Inline SVG flags for the language switcher.
//
// Why not emoji? Windows does not ship regional-indicator flag glyphs, so
// emoji flags (🇬🇧 etc.) render as bare letter pairs ("GB"). Inline SVGs render
// identically on every OS, need no network request, and never cause layout
// shift. Keyed by ISO-3166 alpha-2 country code (see LOCALE_META.country).

import type { CSSProperties } from 'react';

const flags: Record<string, JSX.Element> = {
  // United Kingdom - Union Jack
  gb: (
    <>
      <clipPath id="flag-gb-s">
        <path d="M30 15h30v15zM30 15v15H0zM30 15H0V0zM30 15V0h30z" />
      </clipPath>
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath="url(#flag-gb-s)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </>
  ),
  // France - vertical blue/white/red
  fr: (
    <>
      <rect width="60" height="30" fill="#fff" />
      <rect width="20" height="30" fill="#002654" />
      <rect x="40" width="20" height="30" fill="#ED2939" />
    </>
  ),
  // Spain - red/yellow/red horizontal bands (simplified, no crest)
  es: (
    <>
      <rect width="60" height="30" fill="#AA151B" />
      <rect y="7.5" width="60" height="15" fill="#F1BF00" />
    </>
  ),
  // Netherlands - red/white/blue horizontal bands
  nl: (
    <>
      <rect width="60" height="30" fill="#21468B" />
      <rect width="60" height="20" fill="#fff" />
      <rect width="60" height="10" fill="#AE1C28" />
    </>
  ),
  // Germany - black/red/gold horizontal bands
  de: (
    <>
      <rect width="60" height="30" fill="#FFCE00" />
      <rect width="60" height="20" fill="#D00" />
      <rect width="60" height="10" fill="#000" />
    </>
  ),
};

interface FlagProps {
  country: string;
  /** Pixel width; height follows the 2:1 viewBox. */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function Flag({ country, size = 22, className, style }: FlagProps) {
  const art = flags[country];
  if (!art) return null;
  return (
    <svg
      viewBox="0 0 60 30"
      width={size}
      height={size / 2}
      role="img"
      aria-hidden
      className={className}
      style={{ display: 'block', borderRadius: 2, ...style }}
    >
      {art}
    </svg>
  );
}
