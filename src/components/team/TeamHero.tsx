import React from 'react';
import { motion } from 'framer-motion';
import mansionExterior from '@/assets/mansion-exterior.jpg';

export function TeamHero() {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden bg-[#0C0C0C] flex items-center" id="team-hero">
      <div className="absolute inset-0 z-0">
        <img src={mansionExterior} alt="" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-[#0C0C0C]/40" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(29 53% 36% / 0.18), transparent 65%)',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary font-medium tracking-[0.35em] uppercase text-xs md:text-sm mb-6"
        >
          Our People
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#F7F5F2] text-[13vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] max-w-4xl mx-auto [text-shadow:0_2px_30px_rgba(0,0,0,0.5)]"
        >
          The Team Behind
          <br />
          <span className="text-primary italic font-medium">Every Address</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl mx-auto text-white/70 text-base md:text-lg font-light leading-relaxed"
        >
          A small group of specialists - in advisory, development, leasing, and listings -
          united by one standard: nothing short of extraordinary.
        </motion.p>
      </div>
    </section>
  );
}