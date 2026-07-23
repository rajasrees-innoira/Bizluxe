import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import mansionExterior from '@/assets/mansion-exterior.jpg';
import penthouseInterior from '@/assets/service-management.jpg';
import beachVilla from '@/assets/beach-villa.jpg';
import resortVilla from '@/assets/resort-villa.jpg';
import marinaNight from '@/assets/community-business-bay.jpg';
import minimalistInterior from '@/assets/minimalist-interior.jpg';

// -----------------------------------------------------------------------------
// Content - unchanged categories, unchanged images
// -----------------------------------------------------------------------------

const categories = [
  {
    name: 'Villas',
    tagline: 'Luxury Residence Collection',
    image: mansionExterior,
    area: 'villas',
  },
  {
    name: 'Penthouses',
    tagline: 'Skyline Luxury Living',
    image: penthouseInterior,
    area: 'penthouses',
  },
  {
    name: 'Beach Homes',
    tagline: 'Waterfront Living',
    image: beachVilla,
    area: 'beach',
  },
  {
    name: 'Resorts',
    tagline: 'World Class Experiences',
    image: resortVilla,
    area: 'resorts',
  },
  {
    name: 'Apartments',
    tagline: 'Urban Luxury Living',
    image: marinaNight,
    area: 'apartments',
  },
  {
    name: 'Commercial',
    tagline: 'Prime Business Spaces',
    image: minimalistInterior,
    area: 'commercial',
  },
];

// -----------------------------------------------------------------------------
// Small diamond mark used as the header divider ornament
// -----------------------------------------------------------------------------

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

export function Categories() {
  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up' });
  const gridRef = useStaggeredAnimation<HTMLDivElement>(categories.length, 0.12, { type: 'fade-up' });

  return (
    <section className="relative py-32 md:py-40 bg-[#141211] text-white overflow-hidden">
      {/* Ambient luxury background - vignette + soft radial glows, no texture/noise */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 20% 0%, hsl(29 53% 36% / 0.12), transparent 60%), radial-gradient(ellipse 55% 45% at 85% 100%, hsl(29 53% 36% / 0.10), transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #0A0908 100%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* ---------------------------------------------------------------- */}
        {/* Editorial header                                                */}
        {/* ---------------------------------------------------------------- */}
        <div ref={headingRef} className="flex flex-col items-center text-center mb-20 md:mb-24">
          

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-8">
            Curated Portfolios
          </h2>

          <div className="flex items-center gap-4 mb-8 w-full max-w-[220px]">
            <span className="flex-1 h-px bg-white/15" />
            <DiamondMark />
            <span className="flex-1 h-px bg-white/15" />
          </div>

          <p className="text-white/55 font-light text-base md:text-lg leading-relaxed max-w-[650px]">
            Discover hand-selected collections of Dubai's most exceptional residences, curated for
            discerning buyers seeking timeless architecture and elevated living.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Editorial masonry grid                                          */}
        {/* ---------------------------------------------------------------- */}
        <div ref={gridRef}>
          <div
            className="hidden md:grid md:col-span-3 gap-6 md:gap-8"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: '340px 300px 300px',
              gridTemplateAreas: `
                "villas penthouses beach"
                "villas apartments beach"
                "resorts apartments commercial"
              `,
            }}
          >
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} style={{ gridArea: category.area }} />
            ))}
          </div>

          {/* Mobile: single column, alternating heights, no grid-area needed */}
          <div className="grid md:hidden grid-cols-1 gap-6">
            {categories.map((category, i) => (
              <CategoryCard
                key={category.name}
                category={category}
                className={i % 3 === 0 ? 'h-[420px]' : i % 3 === 1 ? 'h-[320px]' : 'h-[360px]'}
              />
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Bottom CTA                                                      */}
        {/* ---------------------------------------------------------------- */}
        {/* <div className="mt-20 md:mt-24 flex flex-col items-center">
          <button className="group flex items-center gap-3 text-primary font-heading font-semibold tracking-[0.25em] uppercase text-sm hover:text-white transition-colors duration-500">
            Explore All Portfolios
            <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1.5" />
          </button>
          <span className="mt-6 w-16 h-px bg-white/15" />
        </div> */}
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Card
// -----------------------------------------------------------------------------

function CategoryCard({
  category,
  style,
  className = '',
}: {
  category: (typeof categories)[number];
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      style={style}
      className={`group relative overflow-hidden rounded-[28px] cursor-pointer border border-primary/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-all duration-[600ms] ease-out hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.75)] ${className}`}
    >
      {/* Image */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover scale-100 transition-transform duration-[600ms] ease-out group-hover:scale-105"
      />

      {/* Gradient overlay - richens on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-[600ms] ease-out group-hover:from-black/95 group-hover:via-black/35" />

      {/* Glass highlight along the top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms]" />

      {/* Soft border glow on hover */}
      <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-primary/0 group-hover:ring-primary/30 transition-all duration-[600ms] ease-out" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between gap-4 transform transition-transform duration-[600ms] ease-out group-hover:-translate-y-1.5">
        <div>
          <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight mb-1.5">{category.name}</h3>
          <p className="text-primary/90 text-xs md:text-sm font-medium tracking-wide">{category.tagline}</p>
        </div>
        <ArrowRight
          size={20}
          className="text-white/80 shrink-0 mb-1 transition-all duration-[600ms] ease-out group-hover:translate-x-1.5 group-hover:text-primary"
        />
      </div>
    </div>
  );
}