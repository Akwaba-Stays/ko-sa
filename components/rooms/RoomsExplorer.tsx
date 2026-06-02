'use client';

// Rooms listing with live search + category filter and per-card image carousels.
// Production-grade: debounced text search across name/tagline/description/
// amenities, category chips, result count, empty state, and uniform cards.

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Carousel } from '@/components/shared/Carousel';
import { displayCategory, type PublicRoom } from '@/lib/cms/types';

type Labels = {
  searchPlaceholder: string;
  all: string;
  suite: string;
  palmSide: string;
  beachView: string;
  upTo: string;
  guestsUnit: string;
  cardCta: string;
  resultsOne: string;
  resultsMany: string;
  empty: string;
  view: string;
  bookingUrl: string;
};

const CATS = ['All', 'Suite', 'Beach View', 'Palm Side'] as const;

export function RoomsExplorer({ rooms, labels }: { rooms: PublicRoom[]; labels: Labels }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<(typeof CATS)[number]>('All');

  const catLabel = (c: (typeof CATS)[number]) =>
    c === 'All' ? labels.all : c === 'Suite' ? labels.suite : c === 'Palm Side' ? labels.palmSide : labels.beachView;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rooms.filter((r) => {
      if (active !== 'All' && displayCategory(r.category) !== active) return false;
      if (!q) return true;
      const hay = [r.name, r.tagline, r.description, r.bedConfig, ...(r.amenities ?? []), ...(r.features ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [rooms, query, active]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full bg-cream border border-sand-300/70 rounded-full pl-11 pr-10 py-3 text-sm text-forest focus:border-coral focus:outline-none transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-forest/40 hover:text-coral"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`px-4 py-2 rounded-full font-opensans text-xs uppercase tracking-tracked-sm border transition-all duration-300 ${
                active === c
                  ? 'bg-teal text-cream border-teal shadow-sm'
                  : 'border-forest/20 text-forest/75 hover:border-coral hover:text-coral'
              }`}
            >
              {catLabel(c)}
            </button>
          ))}
        </div>
      </div>

      <p className="font-opensans text-xs uppercase tracking-tracked text-forest/50 mb-6">
        {filtered.length === 1 ? labels.resultsOne : labels.resultsMany.replace('{n}', String(filtered.length))}
      </p>

      {filtered.length === 0 ? (
        <p className="text-center text-forest/60 py-16">{labels.empty}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((r) => {
            const cat = displayCategory(r.category);
            const catText = cat === 'Suite' ? labels.suite : cat === 'Palm Side' ? labels.palmSide : labels.beachView;
            const images = r.gallery?.length ? r.gallery : r.image ? [r.image] : [];
            return (
              <article
                key={r.id}
                className="group bg-cream rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col h-full"
              >
                <div className="relative">
                  {images.length > 0 ? (
                    <Carousel
                      images={images}
                      alt={r.name}
                      aspect="aspect-[4/3]"
                      rounded="rounded-none"
                      dots={images.length > 1}
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-sand-light" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-opensans uppercase tracking-tracked text-[10px] text-coral">{catText}</span>
                  <h2 className="mt-2 font-playfair text-2xl text-teal group-hover:text-coral transition-colors line-clamp-1 min-h-[2rem]">
                    <Link href={`/rooms/${r.slug}`}>{r.name}</Link>
                  </h2>
                  <p className="font-raleway italic text-forest/70 mt-1 line-clamp-1 min-h-[1.5rem]">{r.tagline || ' '}</p>
                  <p className="mt-3 text-sm text-forest/70 leading-relaxed line-clamp-2 min-h-[2.75rem]">
                    {r.description || ' '}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-opensans text-forest/60 min-h-[1.25rem]">
                    <span>
                      {labels.upTo} {r.maxGuests} {labels.guestsUnit}
                    </span>
                    {r.sizeSqm ? <span>· {r.sizeSqm} m²</span> : null}
                    {r.bedConfig ? <span>· {r.bedConfig}</span> : null}
                  </div>
                  <div className="mt-auto pt-5 border-t border-sand-300/60 flex gap-2">
                    <Link
                      href={`/rooms/${r.slug}`}
                      className="flex-1 text-center text-xs font-opensans uppercase tracking-tracked-sm text-teal border border-teal/30 hover:border-coral hover:text-coral transition-colors rounded-full px-4 py-3 mt-4"
                    >
                      {labels.view}
                    </Link>
                    <a
                      href={labels.bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center text-xs font-opensans uppercase tracking-tracked-sm text-cream bg-coral hover:bg-coral-600 transition-colors rounded-full px-4 py-3 mt-4"
                    >
                      {labels.cardCta}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
