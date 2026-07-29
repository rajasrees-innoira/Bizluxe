import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import mansionExterior from '@/assets/collection-island-villa.jpg';

// -----------------------------------------------------------------------------
// Ticker content - the words that scroll beneath the headline. These are the
// *categories* of alliance BixLuze curates, not a sequence, so no numbering.
// -----------------------------------------------------------------------------
const allianceWords = [
  'DEVELOPERS',
  'PRIVATE BANKS',
  'ARCHITECTS',
  'LEGAL COUNSEL',
  'CONCIERGE',
  'DESIGN HOUSES',
];

function DiamondMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-primary shrink-0">
      <rect
        x="7"
        y="0.7"
        width="8.9"
        height="8.9"
        transform="rotate(45 7 0.7)"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

export function PartnersHero() {
  const eyebrowRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up' });
  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', staggerDelay: 0.15 });
  const subRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', staggerDelay: 0.3 });

  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28 min-h-[85vh] flex flex-col justify-end">
  {/* Background image */}
  <div className="absolute inset-0 z-0">
    <img
      src={mansionExterior}
      alt=""
      className="w-full h-full object-cover scale-105"
    />
    <div className="absolute inset-0 bg-black/60" />
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 55% 45% at 50% 0%, hsl(29 53% 36% / 0.18), transparent 60%), radial-gradient(ellipse 45% 35% at 90% 90%, hsl(29 53% 36% / 0.10), transparent 65%)',
      }}
    />
  </div>

  <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Left-aligned, bottom-anchored text block */}
        <div ref={eyebrowRef} className="flex flex-col items-start text-left">
          {/* <div className="flex items-center gap-4 mb-6 text-primary">
            <span className="w-8 h-px bg-primary/50" />
            <span className="text-xs font-semibold tracking-[0.35em] uppercase">
              Alliances Built On Trust
            </span>
            <span className="w-8 h-px bg-primary/50" />
          </div> */}
        </div>

        <div ref={headingRef} className="text-left">
          <h1 className="font-heading font-extrabold uppercase leading-[0.92] tracking-tighter text-white text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl">
            OUR
            <br />
            <span className="text-primary italic font-medium">PARTNERS</span>
          </h1>
        </div>

        <div ref={subRef} className="flex flex-col items-start mt-10">
          <p className="text-white/60 font-light text-base md:text-lg leading-relaxed max-w-[620px] text-left">
            Every acquisition BixLuze delivers is backed by a private network of the region's most
            distinguished developers, institutions and craftsmen - assembled over a decade,
            trusted without exception.
          </p>
        </div>
      </div>

      {/* Ambient marquee of alliance categories - continuous slow steady scroll */}
      <div className="mt-20 md:mt-24 border-t border-white/10 relative z-10">
        <div className="overflow-hidden">
          <div className="flex items-center gap-16 md:gap-28 px-12 pt-10 animate-marquee w-max">
            {[...allianceWords, ...allianceWords, ...allianceWords, ...allianceWords].map((word, index) => (
              <div
                key={`${word}-${index}`}
                className="flex-[0_0_auto] flex items-center gap-16 md:gap-28"
              >
                <span className="text-2xl md:text-4xl font-heading font-bold text-white/80 tracking-widest uppercase whitespace-nowrap">
                  {word}
                </span>
                <DiamondMark />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}