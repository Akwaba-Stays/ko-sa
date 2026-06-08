'use client';

// Interactive, filterable dining menu. Section names become filter tabs;
// selecting one shows that section's dishes. Dishes show dietary badges and a
// price when one is set. Driven entirely by the Dining CMS.

import { useMemo, useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string;
  dietary: string[];
  isFeatured: boolean;
}
interface MenuSection {
  id: string;
  name: string;
  description: string | null;
  items: MenuItem[];
}

const DIETARY_LABEL: Record<string, string> = {
  VG: 'Vegetarian', VEGAN: 'Vegan', GF: 'Gluten-free', DF: 'Dairy-free', HALAL: 'Halal',
};

export function DiningMenu({
  sections,
  labels,
}: {
  sections: MenuSection[];
  labels: { all: string; popular: string };
}) {
  const withItems = useMemo(() => sections.filter((s) => s.items.length > 0), [sections]);
  const [active, setActive] = useState<string>('all');

  const visible = active === 'all' ? withItems : withItems.filter((s) => s.id === active);
  if (withItems.length === 0) return null;

  return (
    <div>
      {/* Section filter tabs */}
      <div className="flex flex-wrap gap-2.5 mb-10 justify-center">
        {[{ id: 'all', name: labels.all }, ...withItems].map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              aria-pressed={isActive}
              className={`px-4 py-2 rounded-full font-opensans text-xs uppercase tracking-tracked-sm border transition-all duration-300 ${
                isActive
                  ? 'bg-teal text-cream border-teal shadow-sm'
                  : 'border-forest/20 text-forest/75 hover:border-coral hover:text-coral'
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto space-y-12">
        {visible.map((section) => (
          <div key={section.id}>
            <div className="flex items-center gap-3 mb-5">
              <UtensilsCrossed size={18} className="text-coral shrink-0" />
              <h3 className="font-playfair text-2xl text-teal">{section.name}</h3>
            </div>
            {section.description && (
              <p className="-mt-3 mb-5 font-raleway text-sm italic text-forest/60">{section.description}</p>
            )}
            <ul className="divide-y divide-sand-300/50">
              {section.items.map((item) => (
                <li key={item.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-opensans font-semibold text-forest">{item.name}</p>
                      {item.isFeatured && (
                        <span className="text-[9px] font-opensans uppercase tracking-tracked bg-coral/15 text-coral px-2 py-0.5 rounded-full">
                          {labels.popular}
                        </span>
                      )}
                      {item.dietary.map((d) => (
                        <span
                          key={d}
                          title={DIETARY_LABEL[d] ?? d}
                          className="text-[9px] font-opensans uppercase tracking-tracked bg-teal/10 text-teal px-2 py-0.5 rounded-full"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                    {item.description && (
                      <p className="mt-1 font-raleway text-sm text-forest/65 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                  {item.price !== null && (
                    <span className="shrink-0 font-opensans font-semibold text-teal">
                      {formatCurrency(item.price, item.currency)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
