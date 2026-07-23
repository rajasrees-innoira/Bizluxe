import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import palmJumeirah from '@/assets/palm-jumeirah.jpg';
import emiratesHills from '@/assets/emirates-hills.jpg';
import marinaNight from '@/assets/marina-night.jpg';
import resortVilla from '@/assets/resort-villa.jpg';

// -----------------------------------------------------------------------------
// Content - same communities, same images, same prices
// -----------------------------------------------------------------------------

const communities = [
  { id: 1, name: 'Palm Jumeirah', startingPriceDisplay: 'AED 15,000,000', imageUrl: palmJumeirah },
  { id: 2, name: 'Emirates Hills', startingPriceDisplay: 'AED 25,000,000', imageUrl: emiratesHills },
  { id: 3, name: 'Dubai Marina', startingPriceDisplay: 'AED 3,500,000', imageUrl: marinaNight },
  { id: 4, name: 'Jumeirah Bay', startingPriceDisplay: 'AED 18,000,000', imageUrl: resortVilla },
];

// Progressive descent per card, applied only at the lg breakpoint and up
const STEP_OFFSET_PX = 50;

// -----------------------------------------------------------------------------
// Small diamond + rule divider used above each community name
// -----------------------------------------------------------------------------

function DiamondDivider() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-1.5 h-1.5 rotate-45 bg-primary shrink-0" />
      <span className="w-8 h-px bg-primary/60" />
    </div>
  );
}

export function Communities() {
  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', once: false });

  return (
    <section className="py-24 md:py-[140px] bg-[#F7F5F2]" id="communities">
      <div className="container mx-auto px-6 md:px-12">
        {/* ------------------------------------------------------------ */}
        {/* Header                                                       */}
        {/* ------------------------------------------------------------ */}
        <div
          ref={headingRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-6 mb-16 md:mb-20"
        >
          <div className="text-center lg:text-left">
            <h2 className="font-heading font-bold leading-[0.95] text-4xl sm:text-5xl md:text-6xl">
              <span className="text-primary block">ICONIC</span>
              <span className="text-[#1F1F1F] block">COMMUNITIES</span>
            </h2>
            <span className="hidden lg:block w-14 h-px bg-primary/50 mt-6 mb-6" />
            <p className="text-[#5F5F5F] text-base md:text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0 mt-4 lg:mt-0">
              Discover Dubai's most iconic destinations where architecture, luxury, and lifestyle come
              together to create extraordinary living experiences.
            </p>
          </div>

          <a
            href="#collection"
            className="group inline-flex items-center gap-2 self-center lg:self-end text-[#1F1F1F] font-medium text-sm tracking-wide shrink-0"
          >
            {/* <span className="relative pb-1">
              Explore All
              <span className="absolute left-0 -bottom-0 w-full h-px bg-[#1F1F1F] origin-left scale-x-100 transition-transform duration-500 group-hover:bg-primary" />
            </span>
            <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5 group-hover:text-primary" /> */}
          </a>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Cascading staircase row                                      */}
        {/* ------------------------------------------------------------ */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-8 md:gap-8 lg:gap-9">
          {communities.map((community, index) => (
            <CommunityCard
              key={community.id}
              community={community}
              index={index}
              className={
                index % 2 !== 0 ? 'md:mt-10 lg:mt-0' : '' // gentle tablet rhythm; lg uses precise px offsets instead
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Card
// -----------------------------------------------------------------------------

function CommunityCard({
  community,
  index,
  className = '',
}: {
  community: (typeof communities)[number];
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`flex-1 lg:w-1/4 ${className}`}
      style={{ marginTop: undefined }}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
whileInView={{
  opacity: 1,
  y: 0,
  scale: 1,
  transition: { duration: 2.7, delay: index * 0.32, ease: [0.16, 1, 0.3, 1] },
}}
exit={{ opacity: 0, y: 40, scale: 0.97 }}
viewport={{ once: false, amount: 0.3 }}
    >
      {/* lg+ staircase offset applied via a plain style wrapper so Tailwind
          doesn't need dynamic class names */}
      <div
        className="hidden lg:block"
        style={{ height: index * STEP_OFFSET_PX }}
        aria-hidden="true"
      />

      <a
        href="#collection"
        aria-label={`Explore properties in ${community.name}, starting from ${community.startingPriceDisplay}`}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[#F7F5F2] rounded-[28px]"
      >
        <div
          className="relative overflow-hidden rounded-[28px] md:rounded-[32px] aspect-[3/4] border border-[#1F1F1F]/5 shadow-[0_20px_50px_-20px_rgba(31,31,31,0.25)] transition-all duration-[600ms] ease-out group-hover:-translate-y-2 group-hover:shadow-[0_30px_70px_-20px_rgba(31,31,31,0.35)] group-hover:border-primary/40"
        >
          <img
            src={community.imageUrl}
            alt={community.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-[28px] md:rounded-[32px] ring-1 ring-inset ring-primary/0 group-hover:ring-primary/30 transition-all duration-[600ms] ease-out" />
        </div>

        <div className="pt-5 px-1">
          <DiamondDivider />
          <h3 className="font-heading font-semibold text-2xl md:text-[1.7rem] text-[#1F1F1F] mb-1.5 tracking-tight">
            {community.name}
          </h3>
          <p className="text-[#5F5F5F] text-sm">
            Starting from <span className="font-semibold text-primary">{community.startingPriceDisplay}</span>
          </p>
        </div>
      </a>
    </motion.div>
  );
}