import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const developers = [
  "EMAAR",
  "OMNIYAT",
  "DAMAC",
  "ELLINGTON",
  "SOBHA",
  "BINGHATTI",
  "NAKHEEL",
  "MERAAS"
];

export function DeveloperPartners() {
  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up' });
  const carouselRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', staggerDelay: 0.2 });

  const [emblaRef] = useEmblaCarousel(
    {
      align: 'start',
      loop: true,
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 1.2,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  return (
    <section className="py-24 bg-[#1F1F1F] overflow-hidden" id="developers">
      <div className="container mx-auto px-6 md:px-12 mb-2">
        <div ref={headingRef} className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            <span className="text-primary">OUR DEVELOPER</span>{' '}
            <span className="text-white">PARTNERS</span>
          </h2>
        </div>
      </div>

      <div ref={carouselRef} className="w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-center gap-12 md:gap-24 px-12 py-8">
            {[...developers, ...developers].map((dev, index) => (
              <div 
                key={`${dev}-${index}`} 
                className="flex-[0_0_auto] group cursor-pointer"
              >
                <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-[#5F5F5F] tracking-widest uppercase transition-all duration-300 group-hover:text-primary group-hover:scale-110">
                  {dev}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}