import type { Metadata } from 'next';
import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import Link from 'next/link';
import { Section, Eyebrow, Heading, Lede, GoldDivider } from '@/components/shared/Section';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { Button } from '@/components/shared/Button';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'The Five Layers of Self KoSa Philosophy',
  description:
    'KoSa Beach Resort is built on a quiet framework: the five layers of self · Body, breath, mind, knowing, joy the Akan-rooted lens we use to design every stay',
  alternates: { canonical: '/about/philosophy' },
  openGraph: {
    title: 'The Five Layers of Self KoSa',
    description: 'A quiet framework rooted in Akan thought, woven into every part of the resort',
    type: 'article',
  },
};

const layers = [
  {
    n: '01',
    twi: 'Honam',
    en: 'The Body',
    glyph: 'denkyem',
    pillar: 'Breathe',
    body:
      'Soft linen on raffia beds · Salt-water plunges before breakfast · Massage with shea butter the kitchen also cooks with · We treat the body as the first room you stay in the one before the suite',
  },
  {
    n: '02',
    twi: 'Honhom',
    en: 'The Breath',
    glyph: 'denkyem',
    pillar: 'Breathe',
    body:
      'Sunrise yoga on the dune · Sound bowls at dusk · The rhythm of the surf at thirty-eight breaths per minute slower than yours when you arrive, the same as yours when you leave · Breath is the pace we keep',
  },
  {
    n: '03',
    twi: 'Adwene',
    en: 'The Mind',
    glyph: 'asetena',
    pillar: 'Live',
    body:
      'Books in the library curated by Ghanaian writers · No televisions in the rooms · A chess set on the verandah · The mind is given less to chew on, so it can taste again the Atlantic, the palm wine, the conversation across the table',
  },
  {
    n: '04',
    twi: 'Honhom Kronkron',
    en: 'The Knowing',
    glyph: 'knonsonkonson',
    pillar: 'Belong',
    body:
      'The quiet sense of place that arrives on the second morning · The fishermen wave by name · The cook knows you take ginger in your tea · Knowing is what unhurried hospitality grows on its own we just leave it space',
  },
  {
    n: '05',
    twi: 'Anigye',
    en: 'The Joy',
    glyph: 'community',
    pillar: 'Together',
    body:
      'Drumming circles where guests join the rhythm without asking permission · The kitchen feast on Friday · Children of the village teaching guests to climb a coconut palm · Joy is communal here · It is not entertainment it is the by-product of belonging',
  },
];

export default function PhilosophyPage() {
  return (
    <main className="bg-bg-orange">
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden text-cream">
        <div className="absolute inset-0 branded-img">
          <Image
            src="https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/beach/1-772A1842.webp"
            alt="A guest pausing on a sun-warmed verandah at KoSa, palm shadows on the cane chair"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-umber/45 via-umber/15 to-umber/75" />
        </div>
        <div className="relative z-10 container-page h-full flex flex-col items-center justify-center text-center">
          <p className="font-poppins text-xs uppercase tracking-tracked text-cream/85">
            Our Philosophy
          </p>
          <h1 className="mt-6 font-belleza text-display-lg max-w-3xl drop-shadow-[0_2px_30px_rgba(0,0,0,0.3)]">
            The Five Layers of Self
          </h1>
          <p className="mt-6 max-w-xl font-raleway text-cream/85 md:text-lg leading-relaxed">
            A quiet Akan-rooted framework woven into every part of the stay body, breath, mind,
            knowing, joy
          </p>
          <p className="mt-10 font-beth text-3xl md:text-4xl text-primary/95">Simply, Belong</p>
        </div>
      </section>

      {/* Lede */}
      <Section className="bg-bg-orange">
        <div className="max-w-3xl">
          <Eyebrow>Where we begin</Eyebrow>
          <Heading className="mt-5">
            A resort, but really a frame for paying attention
          </Heading>
          <GoldDivider />
          <Lede>
            The brand guide that grew into KoSa carries a single line we kept returning to:{' '}
            <em>every piece of content should speak to the surrounds of KoSa and the five layers
            of self</em>. We took it as instruction. The five layers drawn from Akan thought,
            and gently held are the lens we use to plan a morning, to lay a table, to choose
            the linen. They are not amenities. They are the questions the property asks the guest:{' '}
            <em>how is your body, how is your breath, how is your mind, what do you know now,
            and where is your joy.</em>
          </Lede>
        </div>
      </Section>

      {/* Five layers alternating editorial bands */}
      {layers.map((layer, i) => {
        const isAlt = i % 2 === 1;
        return (
          <section
            key={layer.n}
            className={isAlt ? 'bg-cream' : 'bg-bg-orange'}
            aria-labelledby={`layer-${layer.n}`}
          >
            <div className="container-page py-20 md:py-28 lg:py-32">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isAlt ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image */}
                <div className="lg:col-span-5 relative">
                  <div className="branded-img relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                    <Image
                      src={
                        [
                          'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/wellness/2-772A2097.webp', // body
                          'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/wellness/3-772A2129.webp', // breath
                          'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/resort/10-772A4925.webp', // mind
                          'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/resort/11-772A4926.webp', // knowing
                          'https://ubsgvfouroqkgqufzeat.supabase.co/storage/v1/object/public/kosa-public/gallery/resort/12-772A4928.webp', // joy
                        ][i]
                      }
                      alt={`A scene from KoSa evoking ${layer.en.toLowerCase()}`}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-5 -right-5 hidden md:block">
                    <AdinkraIcon name={layer.glyph as any} size={80} className="text-primary" />
                  </div>
                </div>

                {/* Copy */}
                <div className="lg:col-span-7">
                  <p className="font-poppins text-xs uppercase tracking-tracked text-brown">
                    Layer {layer.n} · {layer.pillar}
                  </p>
                  <h2
                    id={`layer-${layer.n}`}
                    className="mt-5 font-belleza text-display-md text-umber leading-tight"
                  >
                    {layer.twi}
                    <span className="block font-belleza text-3xl md:text-4xl text-primary mt-2">
                      {layer.en}
                    </span>
                  </h2>
                  <p className="mt-8 font-raleway text-lg leading-relaxed text-umber/85 max-w-prose">
                    {layer.body}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Closing */}
      <Section className="bg-umber text-cream text-center" bleed>
        <div className="container-page max-w-2xl mx-auto">
          <p className="font-poppins text-xs uppercase tracking-tracked text-primary">
            And then you arrive
          </p>
          <h2 className="mt-6 font-belleza text-display-md">
            The five layers don&apos;t need to be learned
            <br />
            They need to be remembered
          </h2>
          <p className="mt-8 max-w-xl mx-auto font-raleway text-cream/80 leading-relaxed">
            We don&apos;t teach the philosophy. We design the days so that by the third morning,
            you&apos;ve found it on your own in the shape of the cup, the slowness of breakfast,
            the way the linen smells of the line it dried on.
          </p>
          <p className="mt-10 font-beth text-3xl md:text-4xl text-primary/95">Simply, Belong</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={site.bookingUrl} target="_blank" rel="noreferrer" size="lg">
              Plan your stay
            </Button>
            <Link
              href="/about"
              className="font-poppins text-xs uppercase tracking-tracked text-cream/80 hover:text-primary transition-colors"
            >
              More about KoSa →
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
