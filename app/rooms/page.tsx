import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/shared/PageHero';
import { rooms } from '@/lib/content/home';
import { formatCurrency } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Rooms & Villas',
  description:
    'Beachfront suites, palm-side villas and garden rooms luxury accommodation at KO-SA Beach Resort, Elmina, Ghana.',
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay in the Feeling"
        title="Rooms & Villas at KO-SA"
        subtitle="Twelve rooms and four suites each composed for slow mornings and full nights of rest."
        image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-20 md:py-28 bg-bg-orange">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rooms.map((r) => (
              <div key={r.slug} className="card-3d">
                <Link
                  href={`/rooms/${r.slug}`}
                  className="card-3d-inner group block bg-cream rounded-sm overflow-hidden shadow-sm transition-colors duration-500"
                >
                  <div className="branded-img card-shine relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="card-3d-img object-cover"
                    />
                  </div>
                  <div className="card-3d-float p-6">
                    <span className="font-poppins uppercase tracking-tracked text-[10px] text-primary">
                      {r.category}
                    </span>
                    <h2 className="mt-2 font-belleza text-2xl text-umber group-hover:text-primary transition-colors">
                      {r.name}
                    </h2>
                    <p className="font-beth text-xl text-umber/70 mt-1">{r.tagline}</p>
                    <div className="mt-4 flex justify-between items-end">
                      <span className="text-xs font-poppins uppercase tracking-tracked text-umber/60">
                        From {formatCurrency(r.price, r.currency)} / night
                      </span>
                      <span className="text-xs font-poppins uppercase tracking-tracked-sm text-primary transition-transform group-hover:translate-x-1">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
