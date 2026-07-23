import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useListProperties } from '../hooks/useApi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import palmJumeirah from '@/assets/palm-jumeirah.jpg';
import emiratesHills from '@/assets/emirates-hills.jpg';
import marinaNight from '@/assets/marina-night.jpg';
import resortVilla from '@/assets/resort-villa.jpg';
import beachVilla from '@/assets/beach-villa.jpg';

const fallbackCarousel = [
  { id: 201, title: "Palm Frond Estate", location: "Palm Jumeirah", priceDisplay: "AED 45,000,000", imageUrl: palmJumeirah },
  { id: 202, title: "Golf Course Villa", location: "Emirates Hills", priceDisplay: "AED 38,000,000", imageUrl: emiratesHills },
  { id: 203, title: "Marina Skyline Penthouse", location: "Dubai Marina", priceDisplay: "AED 22,000,000", imageUrl: marinaNight },
  { id: 204, title: "Luxury Beachfront", location: "Jumeirah Bay", priceDisplay: "AED 55,000,000", imageUrl: beachVilla },
  { id: 205, title: "Bvlgari Resort Villa", location: "Jumeirah Bay", priceDisplay: "AED 85,000,000", imageUrl: resortVilla },
];

const toArray = <T,>(value: unknown): T[] => Array.isArray(value) ? value : [];

export function PropertyCarousel() {
  const { data: apiProperties } = useListProperties();
  const properties = toArray<any>(apiProperties).length >= 5
    ? toArray<any>(apiProperties).slice(0, 8)
    : fallbackCarousel;

  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up' });
  const carouselRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', staggerDelay: 0.2 });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps'
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-24 bg-[#F7F5F2] overflow-hidden" id="buy">
      <div className="container mx-auto px-6 md:px-12 mb-16 flex justify-between items-end">
        <div ref={headingRef}>
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-[#1F1F1F]">
            THE COLLECTION
          </h2>
        </div>
        
        <div className="hidden md:flex gap-4">
          <button 
            onClick={scrollPrev}
            className="w-14 h-14 rounded-full border border-[#D8D8D8] flex items-center justify-center text-[#1F1F1F] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext}
            className="w-14 h-14 rounded-full border border-[#D8D8D8] flex items-center justify-center text-[#1F1F1F] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div ref={carouselRef} className="px-6 md:px-12 lg:px-[max(1rem,calc((90vw-1280px)/2))]">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6 md:gap-8 pb-12 px-2 md:px-4">
            {properties.map((prop) => (
              <div 
                key={prop.id} 
                className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_30%] min-w-0"
              >
                <div className="group relative h-[450px] md:h-[550px] rounded-[40px] overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-warm transition-all duration-500 bg-[#E8E6E1]">
                  <img 
                    src={prop.imageUrl} 
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Glass Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-6 rounded-[30px] translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="font-heading font-bold text-xl text-[#1F1F1F] truncate">{prop.title}</h3>
                    <p className="text-[#5F5F5F] text-sm mt-1">{prop.location}</p>
                    <div className="mt-4 pt-4 border-t border-[#D8D8D8]/50 flex justify-between items-center">
                      <p className="text-primary font-bold text-lg">{prop.priceDisplay || `AED ${(prop as any).price?.toLocaleString()}`}</p>
                      <button className="text-[#1F1F1F] hover:text-primary transition-colors">
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
