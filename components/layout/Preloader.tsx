'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const start = Date.now();
    const min = 1200;
    const finish = () => {
      const remaining = Math.max(0, min - (Date.now() - start));
      setTimeout(() => setShow(false), remaining);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    return () => window.removeEventListener('load', finish);
  }, []);

  const word = 'Simply, Breathe';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          // Inline positioning + colours guarantee a full-screen overlay even
          // before the stylesheet loads. Without this the SSR'd markup (which
          // sits above <Navbar> in the DOM) flashes in normal document flow,
          // making the tagline read as an error "above the nav bar".
          style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: '#1a1a1a', color: '#f9f8f4' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-umber text-cream"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
              transition={{
                opacity: { duration: 0.8, ease: 'easeOut' },
                scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="relative grid place-items-center"
            >
              <span aria-hidden className="absolute inset-0 rounded-full bg-primary/25 blur-2xl scale-110" />
              <Image
                src="/logo.png"
                alt="KO-SA"
                width={120}
                height={120}
                priority
                className="relative object-contain"
              />
            </motion.div>

            <motion.h1
              aria-label={word}
              className="font-belleza text-3xl md:text-5xl tracking-wide"
            >
              {word.split('').map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.04 }}
                  className="inline-block"
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '180px' }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="h-px bg-primary"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
