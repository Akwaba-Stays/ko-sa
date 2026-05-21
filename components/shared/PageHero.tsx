import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  height?: 'sm' | 'md' | 'lg';
}

export function PageHero({ eyebrow, title, subtitle, image, height = 'md' }: Props) {
  const heights = {
    sm: 'h-[45vh] min-h-[340px]',
    md: 'h-[60vh] min-h-[460px]',
    lg: 'h-[75vh] min-h-[560px]',
  };

  return (
    <section className={cn('relative w-full overflow-hidden text-cream pt-20', heights[height])}>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover branded-img"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-umber/40 via-umber/30 to-umber/70" />
      <div className="relative h-full container-page flex flex-col justify-end pb-12 md:pb-20">
        {eyebrow && (
          <span className="font-poppins uppercase tracking-tracked text-xs text-primary mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="font-belleza text-display-lg max-w-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 font-raleway text-cream/85 max-w-2xl text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
