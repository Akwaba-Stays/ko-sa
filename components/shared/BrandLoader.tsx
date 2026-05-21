'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface BrandLoaderProps {
  size?: number;
  /** Show a label beneath the logo */
  label?: string;
  className?: string;
  /** When true, breathing pulse animation is disabled (e.g. for static placeholders). */
  static?: boolean;
}

/**
 * Branded loading indicator using the KO-SA logo. Soft golden pulse on a
 * transparent background so it composes cleanly over any surface.
 */
export function BrandLoader({
  size = 64,
  label,
  className = '',
  static: isStatic = false,
}: BrandLoaderProps) {
  const pulse = isStatic
    ? {}
    : {
        animate: { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] },
        transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const },
      };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <motion.div
        {...pulse}
        className="relative grid place-items-center"
        style={{ width: size, height: size }}
      >
        {/* Soft halo */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
        />
        <Image
          src="/logo.png"
          alt="KO-SA"
          width={size}
          height={size}
          priority
          className="relative object-contain drop-shadow-sm"
        />
      </motion.div>
      {label && (
        <span className="font-poppins uppercase tracking-tracked text-[10px] text-umber/70">
          {label}
        </span>
      )}
    </div>
  );
}
