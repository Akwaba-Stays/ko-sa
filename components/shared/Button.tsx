'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold-outline';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const styles: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(44,96,110,0.5)]',
  secondary:
    'bg-secondary text-white hover:bg-secondary-dark',
  ghost:
    'bg-transparent text-cream border border-cream/70 hover:bg-cream hover:text-umber',
  'gold-outline':
    'bg-transparent text-umber border border-primary hover:bg-primary hover:text-white',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-poppins font-medium uppercase tracking-tracked-sm transition-all duration-300 will-change-transform hover:-translate-y-0.5 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]';

interface ButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: undefined;
}

interface LinkProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  prefetch?: boolean;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | LinkProps>(
  function Button(props, ref) {
    const { variant = 'primary', size = 'md', className, fullWidth, children } = props;
    const cls = cn(base, styles[variant], sizes[size], fullWidth && 'w-full', className);

    if ('href' in props && props.href) {
      const { href, target, rel, prefetch } = props;
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          prefetch={prefetch}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cls}
        >
          {children}
        </Link>
      );
    }
    const { variant: _v, size: _s, className: _c, fullWidth: _f, children: _ch, ...rest } = props as ButtonProps;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={cls} {...rest}>
        {children}
      </button>
    );
  },
);
