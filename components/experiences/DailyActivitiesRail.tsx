'use client';

// Daily activities as a dynamic, swipeable rail: one day per card, each card
// roughly two-thirds of the viewport so the next day peeks in and invites a
// swipe (Change Request §Experiences). Prev/next arrows on desktop, native
// horizontal scroll-snap on touch.

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type RailActivity = {
  id: string;
  time: string;
  title: string;
  description: string | null;
  tag: string | null;
  isFree: boolean;
};
export type RailDay = { day: string; label: string; activities: RailActivity[] };

export function DailyActivitiesRail({
  days,
  freeLabel,
}: {
  days: RailDay[];
  freeLabel: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.66, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {days.map((d) => (
          <div
            key={d.day}
            className="snap-start shrink-0 w-[88%] sm:w-[66%] lg:w-[60%] bg-cream rounded-2xl overflow-hidden shadow-sm border border-sand-300/40"
          >
            <div className="bg-teal-700 text-cream px-7 py-5 flex items-baseline justify-between">
              <p className="font-playfair text-2xl">{d.label}</p>
              <p className="font-opensans text-[10px] uppercase tracking-tracked text-cream/60">
                KoSa Beach Resort
              </p>
            </div>
            <div className="divide-y divide-sand-300/40">
              {d.activities.map((a) => (
                <div key={a.id} className="px-7 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-opensans text-[11px] uppercase tracking-tracked text-coral font-semibold">
                      {a.time}
                    </p>
                    {a.isFree && (
                      <span className="text-[10px] font-opensans uppercase tracking-tracked bg-teal/10 text-teal px-2 py-0.5 rounded-full">
                        {freeLabel}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 font-playfair text-lg text-teal leading-tight">{a.title}</h3>
                  {a.description && (
                    <p className="mt-1.5 font-raleway text-sm text-forest/75 leading-relaxed">
                      {a.description}
                    </p>
                  )}
                  {a.tag && <p className="mt-2 font-opensans text-[11px] text-coral italic">{a.tag}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:flex justify-center gap-3 mt-6">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous day"
          className="grid place-items-center h-11 w-11 rounded-full border border-teal/30 text-teal hover:bg-teal hover:text-cream transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next day"
          className="grid place-items-center h-11 w-11 rounded-full border border-teal/30 text-teal hover:bg-teal hover:text-cream transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
