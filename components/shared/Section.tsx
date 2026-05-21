import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bleed?: boolean;
  as?: 'section' | 'div' | 'article';
}

export function Section({ children, className, bleed, as: Tag = 'section', ...rest }: SectionProps) {
  return (
    <Tag className={cn('relative py-20 md:py-28 lg:py-36', className)} {...rest}>
      {bleed ? children : <div className="container-page">{children}</div>}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block font-poppins text-xs uppercase tracking-tracked text-primary',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Heading({
  children,
  as: Tag = 'h2',
  className,
}: {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}) {
  return (
    <Tag className={cn('font-belleza text-display-md text-umber leading-tight', className)}>
      {children}
    </Tag>
  );
}

export function Lede({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('font-raleway text-lg md:text-xl leading-relaxed text-umber/80 max-w-prose', className)}>
      {children}
    </p>
  );
}

export function GoldDivider({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('flex items-center gap-4 my-8', className)}>
      <span className="h-px flex-1 bg-primary/40" />
      {children ?? <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
      <span className="h-px flex-1 bg-primary/40" />
    </div>
  );
}
