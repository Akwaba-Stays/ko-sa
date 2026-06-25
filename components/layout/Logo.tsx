import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';

interface LogoProps {
  variant?: 'horizontal' | 'icon';
  className?: string;
  /** `cream` flattens the colored logo to cream for use over photography / dark surfaces. `color` keeps the brand teal+orange wordmark. */
  tone?: 'color' | 'cream' | 'umber';
  /** Pixel height. Defaults to 40 (horizontal) / 32 (icon). Per brand guide, never below 24px in horizontal mode. */
  height?: number;
}

export function Logo({ variant = 'horizontal', className, tone = 'color', height }: LogoProps) {
  if (variant === 'icon') {
    return (
      <Link href="/" aria-label="Ko Sa Beach Resort" className={cn('inline-block', className)}>
        <AdinkraIcon name="palm" size={height ?? 32} className="text-primary" />
      </Link>
    );
  }

  const h = height ?? 40;
  // The PNG is approx 1024×683 → aspect 1.5:1
  const w = Math.round(h * 1.5);

  // Tone treatments per DESIGN.md §13
  const toneFilter =
    tone === 'cream'
      ? 'brightness(0) invert(0.97)' // flatten to cream over photography / dark surfaces
      : tone === 'umber'
        ? 'brightness(0) saturate(100%) invert(31%) sepia(8%) saturate(776%) hue-rotate(2deg) brightness(94%) contrast(86%)' // flatten to umber #64554A
        : 'none'; // color (default)

  return (
    <Link
      href="/"
      aria-label="Ko Sa Beach Resort"
      className={cn('inline-flex items-center group', className)}
    >
      <Image
        src="/logo.png"
        alt="Ko Sa Beach Resort"
        width={w}
        height={h}
        priority
        className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        style={{ height: h, width: 'auto', filter: toneFilter }}
      />
    </Link>
  );
}
