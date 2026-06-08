'use client';

// Filterable grid of events/activities (pulled from the Events CMS, sourced
// from ko-sa.com/activities). Category chips filter client-side; cards show an
// image, category, description, transport badge and a WhatsApp enquiry CTA.

import { useMemo, useState } from 'react';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { Bus, CalendarHeart } from 'lucide-react';
import { waLink } from '@/lib/pricing';

export interface PublicEvent {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
  transportIncluded: boolean;
  priceNote: string | null;
}

interface Labels {
  all: string;
  enquire: string;
  transport: string;
  empty: string;
}

export function EventsExplorer({ events, labels }: { events: PublicEvent[]; labels: Labels }) {
  // Categories present in the data, in first-seen order.
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const e of events) if (!seen.includes(e.category)) seen.push(e.category);
    return seen;
  }, [events]);

  const [active, setActive] = useState<string>('all');
  const filtered = useMemo(
    () => (active === 'all' ? events : events.filter((e) => e.category === active)),
    [events, active],
  );

  return (
    <div>
      {/* Category filter chips */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2.5 mb-10 justify-center">
          {['all', ...categories].map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-full font-opensans text-xs uppercase tracking-tracked-sm border transition-all duration-300 ${
                  isActive
                    ? 'bg-teal text-cream border-teal shadow-sm'
                    : 'border-forest/20 text-forest/75 hover:border-coral hover:text-coral'
                }`}
              >
                {cat === 'all' ? labels.all : cat}
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-forest/60 py-16 font-raleway">{labels.empty}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((e) => (
            <article
              key={e.id}
              className="group flex flex-col bg-cream rounded-xl overflow-hidden border border-sand-300/40 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] branded-img overflow-hidden bg-gradient-to-br from-teal-100 to-sand">
                {e.image ? (
                  <Image
                    src={e.image}
                    alt={e.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-teal/30">
                    <CalendarHeart size={40} />
                  </div>
                )}
                <span className="absolute top-3 left-3 text-[10px] font-opensans uppercase tracking-tracked bg-cream/90 text-teal px-2.5 py-1 rounded-full">
                  {e.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-playfair text-lg text-teal leading-tight">{e.title}</h3>
                <p className="mt-2 font-raleway text-sm text-forest/75 leading-relaxed flex-1">{e.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-opensans text-forest/55">
                  {e.transportIncluded && (
                    <span className="inline-flex items-center gap-1 text-teal">
                      <Bus size={13} /> {labels.transport}
                    </span>
                  )}
                  {e.priceNote && <span>{e.priceNote}</span>}
                </div>
                <a
                  href={waLink(`Hi Ko-Sa! I'd like to book the ${e.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 self-start inline-flex items-center gap-2 rounded-full bg-coral text-cream font-opensans uppercase tracking-tracked-sm text-[11px] px-5 py-2.5 hover:bg-coral-600 transition-colors"
                >
                  {labels.enquire} →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
