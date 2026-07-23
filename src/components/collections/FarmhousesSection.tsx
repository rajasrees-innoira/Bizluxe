import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useGsap } from '../../hooks/useGsap';
import { getBreakpoint } from '../../hooks/useScrollAnimations';
import mansionExterior from '@/assets/mansion-exterior.jpg';
import emiratesHills from '@/assets/emirates-hills.jpg';
import palmJumeirah from '@/assets/palm-jumeirah.jpg';
import beachVilla from '@/assets/beach-villa.jpg';

interface Farmhouse {
  id: number;
  title: string;
  location: string;
  description: string;
  amenities: string[];
  price: string;
  image: string;
}

const FARMHOUSES: Farmhouse[] = [
  {
    id: 1,
    title: 'The Vineyard Retreat',
    location: 'Al Barari, Dubai',
    description:
      'A sprawling countryside farmhouse wrapped in olive groves and private vineyards, designed for slow mornings and long dinners under the stars.',
    amenities: ['6 Bedrooms', 'Private Vineyard', 'Equestrian Stables', 'Spa Pavilion'],
    price: 'AED 48,000,000',
    image: mansionExterior,
  },
  {
    id: 2,
    title: 'Emirates Hills Farmhouse',
    location: 'Emirates Hills, Dubai',
    description:
      'Set against rolling golf-course greens, this farmhouse pairs rustic timber architecture with uncompromising modern luxury.',
    amenities: ['7 Bedrooms', 'Golf Course Views', 'Wine Cellar', 'Guest Cottage'],
    price: 'AED 62,000,000',
    image: emiratesHills,
  },
  {
    id: 3,
    title: 'Palm Orchard Estate',
    location: 'Palm Jumeirah, Dubai',
    description:
      'A rare waterfront farmhouse where date-palm orchards meet private beach frontage, blending agrarian charm with island living.',
    amenities: ['5 Bedrooms', 'Private Beach', 'Orchard Gardens', 'Boat Dock'],
    price: 'AED 55,000,000',
    image: palmJumeirah,
  },
  {
    id: 4,
    title: 'Coastal Farmstead',
    location: 'Jumeirah Bay, Dubai',
    description:
      'Framed by sea breeze and open skies, this farmstead offers barn-inspired living spaces with panoramic coastal views.',
    amenities: ['6 Bedrooms', 'Sea View Terrace', 'Working Greenhouse', 'Pool House'],
    price: 'AED 71,000,000',
    image: beachVilla,
  },
];

const STEP_VH = 100; // scroll distance dedicated to EACH property transition, in vh units

export function FarmhousesSection() {
  const { gsap, ScrollTrigger } = useGsap();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
      const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[];
      const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];
      const count = FARMHOUSES.length;

      // ---- Rest state: only property 0 visible ----
      gsap.set(images, { autoAlpha: 0, scale: 1.06, xPercent: 0 });
      gsap.set(contents, { autoAlpha: 0, y: 30 });
      gsap.set(images[0], { autoAlpha: 1, scale: 1 });
      gsap.set(contents[0], { autoAlpha: 1, y: 0 });
      gsap.set(dots[0], { backgroundColor: 'rgba(255,255,255,0.9)', width: '2.5rem' });

      // Total pinned scroll distance = one full "step" per property.
      // Smaller screens get a shorter journey so it doesn't drag on.
      const bp = getBreakpoint();
      const scale = bp === 'mobile' ? 0.65 : bp === 'tablet' ? 0.8 : 1;
      const stepDistance = window.innerHeight * (STEP_VH / 100) * scale;
      const totalDistance = stepDistance * (count - 1); // N-1 transitions between N properties

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalDistance}`,
          scrub: 0.6,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Snap the scrub progress to whole steps, so each scroll gesture
          // lands cleanly on a property instead of stopping mid-crossfade.
          snap: {
            snapTo: 1 / (count - 1),
            duration: 0.35,
            ease: 'power1.inOut',
          },
        },
        defaults: { ease: 'power2.inOut' },
      });

      // Each transition (0→1, 1→2, 2→3) gets an EQUAL, fixed slice of the
      // timeline's total duration - this is what ties it purely to scroll
      // position rather than any wall-clock timer.
      FARMHOUSES.forEach((_, i) => {
        if (i === 0) return;

        const prevImage = images[i - 1];
        const prevContent = contents[i - 1];
        const currImage = images[i];
        const currContent = contents[i];
        const label = `step${i}`;

        tl.addLabel(label);

        // Outgoing property fades/slides away.
        tl.to(prevImage, { autoAlpha: 0, scale: 0.94, xPercent: -6, duration: 1 }, label);
        tl.to(prevContent, { autoAlpha: 0, y: -30, duration: 0.8 }, label);

        // Incoming property fades/scales/parallaxes in.
        tl.fromTo(
          currImage,
          { autoAlpha: 0, scale: 1.06, xPercent: 6 },
          { autoAlpha: 1, scale: 1, xPercent: 0, duration: 1 },
          `${label}+=0.05`,
        );
        tl.fromTo(
          currContent,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          `${label}+=0.2`,
        );

        // Progress dot for this step.
        tl.to(dots[i - 1], { backgroundColor: 'rgba(255,255,255,0.25)', width: '2rem' }, label);
        tl.to(dots[i], { backgroundColor: 'rgba(255,255,255,0.9)', width: '2.5rem' }, label);
      });
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0F0E0D]" id="farmhouses">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
            {/* Image stack - ~60% width on desktop */}
            <div className="relative w-full md:w-[80%] aspect-[4/3] md:aspect-[16/10] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
              {FARMHOUSES.map((property, i) => (
                <div
                  key={property.id}
                  ref={(el) => { imageRefs.current[i] = el; }}
                  className="absolute inset-0"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover transform scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Content stack - ~40% width on desktop */}
            <div className="relative w-full md:w-[40%] h-[400px] md:h-[440px]">
              {FARMHOUSES.map((property, i) => (
                <div
                  key={property.id}
                  ref={(el) => { contentRefs.current[i] = el; }}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <p className="text-primary font-semibold tracking-[0.25em] uppercase text-xs mb-3">
                    {property.location}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight mb-4">
                    {property.title}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed mb-6">{property.description}</p>

                  <ul className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                    {property.amenities.map((a) => (
                      <li key={a} className="text-white/50 text-xs md:text-sm tracking-wide flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-6">
                    <span className="text-primary font-bold text-xl md:text-2xl font-heading">{property.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live progress dots - reflect current scroll step */}
          <div className="hidden md:flex gap-2 mt-12 justify-center">
            {FARMHOUSES.map((p, i) => (
              <span
                key={p.id}
                ref={(el) => { dotRefs.current[i] = el; }}
                className="h-[3px] rounded-full bg-white/25 transition-none"
                style={{ width: '2rem' }}
              />
            ))}
          </div>

          {/* Mobile scroll hint */}
          {/* <p className="md:hidden text-center text-white/40 text-xs uppercase tracking-widest mt-8">
            Scroll to explore
          </p> */}
        </div>
      </div>
    </section>
  );
}