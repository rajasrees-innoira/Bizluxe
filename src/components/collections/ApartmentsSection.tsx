import React, { useLayoutEffect, useRef } from 'react';
import { useGsap } from '../../hooks/useGsap';
import penthouseInterior from '@/assets/penthouse-interior.jpg';
import marinaNight from '@/assets/marina-night.jpg';
import minimalistInterior from '@/assets/minimalist-interior.jpg';

interface Apartment {
  id: number;
  title: string;
  description: string;
  location: string;
  price: string;
  image: string;
}

const APARTMENTS: Apartment[] = [
  {
    id: 1,
    title: 'Sky Residence 88',
    description: 'Floor-to-ceiling glass suspended above the Dubai skyline, with private elevator access.',
    location: 'Downtown Dubai',
    price: 'AED 12,500,000',
    image: penthouseInterior,
  },
  {
    id: 2,
    title: 'Marina Horizon',
    description: 'A sleek waterfront apartment overlooking the marina promenade and yacht harbour.',
    location: 'Dubai Marina',
    price: 'AED 7,900,000',
    image: marinaNight,
  },
  {
    id: 3,
    title: 'The Minimalist Loft',
    description: 'Pared-back interiors and warm natural light define this architecturally distinct loft.',
    location: 'City Walk',
    price: 'AED 5,400,000',
    image: minimalistInterior,
  },
];

// How much scroll (in vh) the whole pinned reveal sequence takes.
const SEQUENCE_VH = 140;

export function ApartmentsSection() {
  const { gsap } = useGsap();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const count = cards.length;

      // ---- Rest state ----
      // Cards 2..N start basically invisible and sitting lower.
      // Card 1 is kept subtly visible at rest (not fully alpha:0) so the
      // section never reads as "empty" before the user starts scrolling.
      gsap.set(cards.slice(1), { autoAlpha: 0, y: 70 });
      gsap.set(cards[0], { autoAlpha: 0.18, y: 40 });

      const totalDistance = window.innerHeight * (SEQUENCE_VH / 100);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalDistance}`,
          scrub: 0.6,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Each card gets an equal slice of the timeline. Because this is a
      // scrub timeline (not toggleActions), scrolling up naturally reverses
      // through these tweens in exact reverse order - the cards fade back
      // down exactly as they faded up, no extra logic required.
      cards.forEach((card, i) => {
        const label = `card${i}`;
        tl.addLabel(label);
        tl.to(
          card,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          label,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#F7F5F2]" id="apartments">
      <div ref={pinRef} className="relative min-h-screen w-full flex items-center py-24 md:py-0">
        <div className="container mx-auto px-6 md:px-12">
          {/* Heading is static - always visible, never part of the scroll timeline */}
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <p className="text-primary font-medium tracking-[0.3em] uppercase mb-4 text-sm">Sky-High Living</p>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#1F1F1F] leading-[1.05]">
              Signature Apartments
            </h2>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {APARTMENTS.map((apt, i) => (
              <div
                key={apt.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="flex flex-col"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[0_20px_60px_-20px_rgba(31,31,31,0.25)]">
                  <img src={apt.image} alt={apt.title} className="w-full h-full object-cover" />
                </div>

                <div className="w-full h-px bg-[#D8D8D8] my-6" />

                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-heading font-bold text-[#1F1F1F] mb-2">{apt.title}</h3>
                  <p className="text-[#5F5F5F] font-light leading-relaxed mb-4">{apt.description}</p>
                  <p className="text-[#5F5F5F] text-sm mb-2">{apt.location}</p>
                  <span className="mt-auto text-primary font-bold text-lg font-heading">{apt.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}