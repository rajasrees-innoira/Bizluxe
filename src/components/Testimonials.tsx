import React from 'react';
import { useListTestimonials } from '../hooks/useApi';
import { useStaggeredAnimation, useScrollAnimation } from '../hooks/useScrollAnimation';
import { Star } from 'lucide-react';
import bgImage from '@/assets/mansion-exterior.jpg';

const fallbackTestimonials = [
  {
    id: 1,
    clientName: "Alexander Rothschild",
    clientTitle: "Private Investor",
    quote: "Bizluxe operates on a different echelon. Their understanding of the ultra-luxury market in Dubai is unparalleled. They didn't just find me a penthouse; they found a masterpiece that wasn't even on the market.",
    rating: 5,
    propertyType: "Downtown Penthouse"
  },
  {
    id: 2,
    clientName: "Sophia Chen",
    clientTitle: "Tech Entrepreneur",
    quote: "The discretion, the access, and the execution were flawless. Purchasing my villa on Palm Jumeirah was handled with the precision of a Swiss watch. Truly white-glove service from start to finish.",
    rating: 5,
    propertyType: "Signature Villa, Palm Jumeirah"
  },
  {
    id: 3,
    clientName: "Mohammed Al-Fayed",
    clientTitle: "CEO",
    quote: "I have worked with many brokers globally, but the Bizluxe team brings an editorial eye to real estate. They understand architecture, provenance, and true luxury better than anyone in the UAE.",
    rating: 5,
    propertyType: "Emirates Hills Estate"
  }
];

const toArray = <T,>(value: unknown): T[] => Array.isArray(value) ? value : [];

export function Testimonials() {
  const { data: apiTestimonials } = useListTestimonials();
  const testimonials = toArray<any>(apiTestimonials).length >= 3
    ? toArray<any>(apiTestimonials).slice(0, 3)
    : fallbackTestimonials;

  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', once: false });
const listRef = useStaggeredAnimation<HTMLDivElement>(testimonials.length, 0.2, { once: false });
  return (
    <section className="relative py-24 overflow-hidden bg-[#1F1F1F]" id="testimonials">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img src={bgImage} alt="Architecture" className="w-full h-full object-cover filter grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1F1F] via-transparent to-[#1F1F1F]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div ref={headingRef} className="mb-12 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white">
            WHAT OUR <span className="text-primary italic font-medium">CLIENTS SAY</span>
          </h2>
        </div>

        <div ref={listRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-12 rounded-[40px] hover:bg-white/10 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-white/90 font-serif text-lg md:text-xl leading-relaxed italic mb-10">
                "{testimonial.quote}"
              </p>
              
              <div className="mt-auto border-t border-white/10 pt-6">
                <h4 className="text-white font-heading font-bold text-xl">{testimonial.clientName}</h4>
                <p className="text-primary text-sm mt-1">{testimonial.clientTitle}</p>
                <p className="text-white/40 text-xs mt-2 uppercase tracking-wider">{testimonial.propertyType}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
