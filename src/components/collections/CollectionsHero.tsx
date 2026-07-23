import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import mansionExterior from '@/assets/mansion-exterior.jpg';
import penthouseInterior from '@/assets/penthouse-interior.jpg';
import beachVilla from '@/assets/beach-villa.jpg';
import marinaNight from '@/assets/marina-night.jpg';

const SLIDES = [mansionExterior, penthouseInterior, beachVilla, marinaNight];
const SLIDE_DURATION_MS = 5000;

export function CollectionsHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[100vh] min-h-[720px] w-full overflow-hidden bg-[#0C0C0C]" id="collections-hero">
      {/* Crossfading background slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 2.4, ease: 'easeInOut' },
              scale: { duration: SLIDE_DURATION_MS / 1000 + 2.4, ease: 'linear' },
            }}
          >
            <img
              src={SLIDES[active]}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Luxury scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/50 to-[#0C0C0C]/30" />
        <div className="absolute inset-0 bg-[#0C0C0C]/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary font-medium tracking-[0.35em] uppercase text-xs md:text-sm mb-6"
        >
          BizLuxe Collections
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.94, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.12, 0.8, 0.26, 0.8] }}
          className="font-heading font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#F7F5F2] text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl [text-shadow:0_2px_30px_rgba(0,0,0,0.5)]"
        >
          The Finest
          <br />
          <span className="text-primary italic font-medium">Collection</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-white/75 text-base md:text-lg font-light leading-relaxed"
        >
          A curated portfolio of farmhouses, penthouses and private estates -
          each one chosen for its architecture, privacy and enduring value.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}