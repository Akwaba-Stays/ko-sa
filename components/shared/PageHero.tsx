import { SmoothImage as Image } from '@/components/shared/SmoothImage';
import { cn } from '@/lib/utils';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  /** Reserved for future variants; all heroes now bleed full-screen. */
  height?: 'sm' | 'md' | 'lg' | 'full';
}

export function PageHero({ eyebrow, title, subtitle, image }: Props) {
  return (
    // True full-screen, edge-to-edge. 100svh keeps it immersive on mobile too;
    // the image bleeds with no padding/borders cutting it off.
    <section className="relative w-full overflow-hidden text-cream h-[100svh] min-h-[560px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover branded-img"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/45 via-teal-900/25 to-teal-900/80" />
      <div className="relative h-full container-page flex flex-col justify-end pb-20 md:pb-28">
        {eyebrow && (
          <span className="font-opensans uppercase tracking-tracked text-xs text-sunshine mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className={cn('font-playfair max-w-4xl', 'text-[clamp(2.5rem,6vw,5rem)] leading-[1.04]')}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 font-raleway text-cream/85 max-w-2xl text-base md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
