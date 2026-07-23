import React from 'react';
import { useListProperties } from '../hooks/useApi';
import { BedDouble, Bath, SquareSquare } from 'lucide-react';
import { Button } from './ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import mansionExterior from '@/assets/mansion-exterior.jpg';
import penthouseInterior from '@/assets/penthouse-interior.jpg';
import beachVilla from '@/assets/beach-villa.jpg';

const fallbackProperties = [
  {
    id: 1,
    title: "The OMNIYAT Sky Mansion",
    priceDisplay: "AED 125,000,000",
    location: "Palm Jumeirah",
    community: "Palm Jumeirah",
    bedrooms: 6,
    bathrooms: 8,
    areaDisplay: "14,500 sq ft",
    imageUrl: penthouseInterior
  },
  {
    id: 2,
    title: "Signature Sector E Villa",
    priceDisplay: "AED 85,000,000",
    location: "Emirates Hills",
    community: "Emirates Hills",
    bedrooms: 7,
    bathrooms: 9,
    areaDisplay: "22,000 sq ft",
    imageUrl: mansionExterior
  },
  {
    id: 3,
    title: "Beachfront Reserve",
    priceDisplay: "AED 62,500,000",
    location: "Dubai Marina",
    community: "Dubai Marina",
    bedrooms: 5,
    bathrooms: 6,
    areaDisplay: "9,800 sq ft",
    imageUrl: beachVilla
  }
];

const toArray = <T,>(value: unknown): T[] => Array.isArray(value) ? value : [];

export function FeaturedProperties() {
  const { data: apiProperties, isLoading } = useListProperties({ featured: true });
  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up' });

  const properties = toArray<any>(apiProperties).length > 0
    ? toArray<any>(apiProperties).slice(0, 3)
    : fallbackProperties;
  const listRef = useStaggeredAnimation<HTMLDivElement>(properties.length, 0.15, { type: 'fade-up' });

  if (isLoading && !apiProperties) {
    return <section className="py-32 bg-[#F7F5F2] min-h-screen"></section>;
  }

  return (
    <section className="py-24 bg-[#F7F5F2] overflow-hidden" id="collection">
      <div className="container mx-auto px-6 md:px-12">
        <div ref={headingRef} className="mb-12 max-w-4xl">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold flex flex-col lg:flex-row gap-x-4">
  <span className="text-primary">CURATED</span>
  <span className="text-[#1F1F1F]">FOR THE EXCEPTIONAL</span>
</h2>
        </div>

        <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {properties.map((prop, idx) => (
            <div 
              key={prop.id} 
              className={`group relative flex flex-col transition-all duration-500 hover:-translate-y-2
                ${idx === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
              `}
            >
              <div
                className={`relative w-full overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[60px] bg-[#E8E6E1] shadow-sm group-hover:shadow-warm transition-shadow duration-500
                  ${idx === 0
                    ? 'aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-[840px]'
                    : 'aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-[400px]'
                  }
                `}
              >
                <img
                  src={prop.imageUrl || fallbackProperties[idx % 3].imageUrl}
                  alt={prop.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />

                {/* Small overlay info card on image (keeps footprint minimal) */}
                <div className="absolute left-5 bottom-5 z-20 bg-white/95 px-10 py-4 rounded-full shadow-md flex items-center gap-4 max-w-[85%]">
                  <div className="flex-1 min-w-0">
                    <p className="text-primary font-heading font-bold text-2xl truncate">{prop.priceDisplay || `AED ${(prop as any).price?.toLocaleString()}`}</p>
                    <p className="text-[#5F5F5F] text-[16px] mt-0.5 truncate">{prop.location}</p>
                  </div>
                  <Button className="hidden md:inline-flex bg-[#1F1F1F] text-white rounded-full px-4 py-2 text-[15px] shrink-0">Details</Button>
                </div>
                {/* subtle overlay to improve contrast when needed */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}