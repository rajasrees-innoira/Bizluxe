import React, { useLayoutEffect, useRef, useState } from 'react';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { useGsap } from '../../hooks/useGsap';

interface Office {
  id: string;
  city: string;
  address: string;
  hours: string;
  mapQuery: string;
}

const OFFICES: Office[] = [
  {
    id: 'difc',
    city: 'Dubai - DIFC',
    address: 'Level 12, ICD Brookfield Place, Dubai International Financial Centre',
    hours: 'Mon – Sat, 9:00 AM – 7:00 PM',
    mapQuery: 'ICD Brookfield Place DIFC Dubai',
  },
  {
    id: 'marina',
    city: 'Dubai - Marina',
    address: 'Marina Plaza, Sheikh Zayed Road, Dubai Marina',
    hours: 'Mon – Sat, 9:00 AM – 7:00 PM',
    mapQuery: 'Marina Plaza Dubai Marina',
  },
  {
    id: 'palm',
    city: 'Palm Jumeirah',
    address: 'Golden Mile Galleria, Palm Jumeirah',
    hours: 'By private appointment',
    mapQuery: 'Golden Mile Galleria Palm Jumeirah',
  },
];

export function OfficeLocationsSection() {
  const { gsap } = useGsap();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(OFFICES[0]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(cardsWrapRef.current?.children ?? []),
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsWrapRef.current, start: 'top 85%', end: 'top 55%', scrub: 1 },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white" id="offices">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-[0.3em] uppercase mb-4 text-sm">Visit Us</p>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#1F1F1F] leading-[1.05]">
            Our Offices
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {/* Office cards */}
          <div ref={cardsWrapRef} className="lg:col-span-2 flex flex-col gap-5">
            {OFFICES.map((office) => {
              const isActive = office.id === active.id;
              return (
                <button
                  key={office.id}
                  onClick={() => setActive(office)}
                  className={`group text-left rounded-3xl p-6 border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1F1F1F] border-[#1F1F1F] shadow-warm'
                      : 'bg-[#F7F5F2] border-transparent hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={`text-xs uppercase tracking-widest mb-2 ${
                          isActive ? 'text-primary' : 'text-primary'
                        }`}
                      >
                        {office.hours}
                      </p>
                      <h3
                        className={`text-xl md:text-2xl font-heading font-bold mb-2 ${
                          isActive ? 'text-white' : 'text-[#1F1F1F]'
                        }`}
                      >
                        {office.city}
                      </h3>
                      <p className={`text-sm font-light leading-relaxed ${isActive ? 'text-white/60' : 'text-[#5F5F5F]'}`}>
                        {office.address}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className={`shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                        isActive ? 'text-primary' : 'text-[#5F5F5F]'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live map */}
          <div className="lg:col-span-3 relative rounded-[32px] md:rounded-[40px] overflow-hidden min-h-[360px] lg:min-h-0 shadow-[0_30px_80px_-25px_rgba(31,31,31,0.3)]">
            <iframe
              key={active.id}
              title={`Map - ${active.city}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(active.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="absolute inset-0 w-full h-full grayscale-[15%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 flex items-center gap-3 shadow-lg">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div className="min-w-0">
                <p className="text-[#1F1F1F] font-semibold text-sm truncate">{active.city}</p>
                <p className="text-[#5F5F5F] text-xs flex items-center gap-1.5">
                  <Clock size={12} /> {active.hours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}