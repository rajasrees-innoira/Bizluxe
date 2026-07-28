import React, { useRef } from 'react';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import mansionExterior from '@/assets/mansion-exterior.jpg';
import beachVilla from '@/assets/beach-villa.jpg';
import penthouseInterior from '@/assets/penthouse-interior.jpg';
import marinaNight from '@/assets/marina-night.jpg';
import resortVilla from '@/assets/resort-villa.jpg';
import minimalistInterior from '@/assets/minimalist-interior.jpg';
import emiratesHills from '@/assets/emirates-hills.jpg';

interface Collection {
  id: string;
  title: string;
  count: number;
  image: string;
}

const COLLECTIONS: Collection[] = [
  { id: 'villas', title: 'Luxury Villas', count: 142, image: mansionExterior },
  { id: 'beachfront', title: 'Beachfront Homes', count: 58, image: beachVilla },
  { id: 'apartments', title: 'Apartments', count: 210, image: marinaNight },
  { id: 'penthouses', title: 'Penthouses', count: 76, image: penthouseInterior },
  { id: 'guest-houses', title: 'Guest Houses', count: 34, image: minimalistInterior },
  { id: 'farmhouses', title: 'Farm Houses', count: 21, image: emiratesHills },
  { id: 'commercial', title: 'Commercial', count: 63, image: resortVilla },
];

export function FeaturedCollections() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 bg-white" id="featured-collections">
      <div className="container mx-auto px-6 md:px-12 flex items-end justify-between mb-10 md:mb-14">
        <div>
          <p className="text-primary font-medium tracking-[0.3em] uppercase mb-4 text-sm">Browse By</p>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#1F1F1F] leading-[1.05]">
            Featured Collections
          </h2>
        </div>

        <div className="hidden md:flex gap-3">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll collections left"
            className="w-12 h-12 rounded-full border border-[#D8D8D8] flex items-center justify-center text-[#1F1F1F] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll collections right"
            className="w-12 h-12 rounded-full border border-[#D8D8D8] flex items-center justify-center text-[#1F1F1F] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-5 md:gap-7 overflow-x-auto snap-x snap-mandatory scroll-pl-6 md:scroll-pl-12 px-6 md:px-12 pb-4 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {COLLECTIONS.map((c) => (
          <a
            key={c.id}
            href={`#grid?type=${c.id}`}
            className="group relative shrink-0 snap-start w-[78%] sm:w-[46%] md:w-[34%] lg:w-[26%] aspect-[3/4] rounded-[28px] overflow-hidden shadow-[0_20px_60px_-20px_rgba(31,31,31,0.25)]"
          >
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
              <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-2">
                {c.count} Properties
              </p>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-heading font-bold text-xl md:text-2xl text-white leading-tight">
                  {c.title}
                </h3>
                <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <ArrowUpRight size={16} className="text-white" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}