import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Button } from './ui/button';

export function PartnersCTA() {
  const textRef = useScrollAnimation<HTMLDivElement>({ type: 'scale-in' });

  return (
    <section className="relative py-28 md:py-36 bg-[#141211] overflow-hidden">
      {/* Ambient glow, consistent with Categories.tsx */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(29 53% 36% / 0.16), transparent 65%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div ref={textRef} className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <p className="text-primary font-medium tracking-[0.3em] uppercase mb-6 text-sm">
            Join The Network
          </p>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-[1.05] mb-8">
            BECOME A <span className="text-primary italic font-medium">BIXLUZE</span> PARTNER
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed mb-12 max-w-xl">
            We collaborate with a select few in each discipline. If your work meets our standard
            of excellence, our advisory team would welcome the conversation.
          </p>

          <Button
  className="group inline-flex items-center gap-2 bg-primary hover:bg-white text-white hover:text-[#1F1F1F] rounded-full px-6 py-4 text-sm sm:px-10 sm:py-7 sm:text-base font-semibold shadow-warm hover:-translate-y-1 transition-all duration-500"
  onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
>
            Enquire About Partnership
            <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}