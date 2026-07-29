import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useGsap } from '../../hooks/useGsap';
import { getBreakpoint } from '../../hooks/useScrollAnimations';
import mansionExterior from '@/assets/collection-golf-villa.jpg';
import penthouseInterior from '@/assets/imgi_11_popular-1-4.jpg';
import marinaNight from '@/assets/portfolio-villa.jpg';
import minimalistInterior from '@/assets/minimalist-interior.jpg';
import resortVilla from '@/assets/resort-villa.jpg';
import beachVilla from '@/assets/beach-villa.jpg';
import emiratesHills from '@/assets/emirates-hills.jpg';

// -----------------------------------------------------------------------------
// ServicesStory - the seven services as one continuous pinned sequence
// (same pin/scrub mechanic as FarmhousesSection, reused deliberately since
// both are "step through N items while the viewport holds still" stories,
// but restyled: full-bleed background per service instead of a card grid).
// -----------------------------------------------------------------------------

interface ServiceStep {
  id: number;
  title: string;
  tagline: string;
  desc: string;
  benefits: string[];
  cta: string;
  image: string;
}

const SERVICES: ServiceStep[] = [
  {
    id: 1,
    title: 'Luxury Buying',
    tagline: 'Acquisition',
    desc: 'Private access to Dubai\u2019s most exceptional residences \u2014 including listings that never reach the open market.',
    benefits: ['Off-market access', 'Senior advisor from day one', 'Full legal diligence'],
    cta: 'Start Your Search',
    image: mansionExterior,
  },
  {
    id: 2,
    title: 'Luxury Selling',
    tagline: 'Disposal',
    desc: 'Bespoke marketing campaigns and a global network of qualified buyers, handled with complete discretion.',
    benefits: ['Confidential, off-market option', 'Global HNWI network', 'Precision valuation'],
    cta: 'List With Us',
    image: penthouseInterior,
  },
  {
    id: 3,
    title: 'Rentals',
    tagline: 'Leasing',
    desc: 'White-glove leasing for tenants and landlords across Dubai\u2019s finest communities.',
    benefits: ['Vetted tenants', 'Fast turnaround', 'Full documentation support'],
    cta: 'Explore Rentals',
    image: marinaNight,
  },
  {
    id: 4,
    title: 'Off-Plan Projects',
    tagline: 'New Developments',
    desc: 'First access to VIP launches from Dubai\u2019s most trusted developers, before they reach the public.',
    benefits: ['Pre-launch pricing', 'Developer due diligence', 'Payment plan guidance'],
    cta: 'View Off-Plan',
    image: minimalistInterior,
  },
  {
    id: 5,
    title: 'Investment Advisory',
    tagline: 'Strategy',
    desc: 'Data-driven insight into yield, appreciation, and portfolio diversification across Dubai\u2019s market.',
    benefits: ['Yield & ROI modelling', 'Golden Visa guidance', 'Portfolio strategy'],
    cta: 'Talk Investment',
    image: resortVilla,
  },
  {
    id: 6,
    title: 'Property Management',
    tagline: 'Stewardship',
    desc: 'End-to-end management that keeps your asset pristine and performing, without you lifting a finger.',
    benefits: ['Tenant placement', 'Maintenance & inspection', 'Owner reporting'],
    cta: 'Let Us Manage',
    image: beachVilla,
  },
  {
    id: 7,
    title: 'Commercial Real Estate',
    tagline: 'Business',
    desc: 'Prime office, retail, and mixed-use opportunities in Dubai\u2019s key business districts.',
    benefits: ['Prime district access', 'Lease negotiation', 'Fit-out advisory'],
    cta: 'Explore Commercial',
    image: emiratesHills,
  },
];

const STEP_VH = 100;

export function ServicesStory() {
  const { gsap } = useGsap();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const bgs = bgRefs.current.filter(Boolean) as HTMLDivElement[];
      const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[];
      const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];
      const count = SERVICES.length;

      gsap.set(bgs, { autoAlpha: 0, scale: 1.08 });
      gsap.set(contents, { autoAlpha: 0, y: 40 });
      gsap.set(bgs[0], { autoAlpha: 1, scale: 1 });
      gsap.set(contents[0], { autoAlpha: 1, y: 0 });
      gsap.set(dots[0], { backgroundColor: 'rgba(255,255,255,0.9)', width: '2.5rem' });

      const bp = getBreakpoint();
      const scale = bp === 'mobile' ? 0.55 : bp === 'tablet' ? 0.75 : 1;
      const stepDistance = window.innerHeight * (STEP_VH / 100) * scale;
      const totalDistance = stepDistance * (count - 1);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalDistance}`,
          scrub: 0.6,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / (count - 1), duration: 0.35, ease: 'power1.inOut' },
        },
        defaults: { ease: 'power2.inOut' },
      });

      SERVICES.forEach((_, i) => {
        if (i === 0) return;
        const label = `step${i}`;
        tl.addLabel(label);
        tl.to(bgs[i - 1], { autoAlpha: 0, scale: 0.96, duration: 1 }, label);
        tl.to(contents[i - 1], { autoAlpha: 0, y: -30, duration: 0.8 }, label);
        tl.fromTo(bgs[i], { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 1 }, `${label}+=0.05`);
        tl.fromTo(contents[i], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9 }, `${label}+=0.2`);
        tl.to(dots[i - 1], { backgroundColor: 'rgba(255,255,255,0.25)', width: '2rem' }, label);
        tl.to(dots[i], { backgroundColor: 'rgba(255,255,255,0.9)', width: '2.5rem' }, label);
      });
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0C0C0C]" id="services">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Backgrounds */}
        {SERVICES.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => { bgRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{ willChange: 'transform, opacity' }}
          >
            <img src={s.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
          </div>
        ))}

        {/* Static heading */}
        <div className="absolute top-14 md:top-16 left-1/2 -translate-x-1/2 z-20 text-center px-6">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
            What We Do
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white">Our Services</h2>
        </div>

        {/* Content per service */}
         <div className="relative z-10 h-full">
          <div className="container mx-auto px-6 md:px-12 h-full">
            <div className="relative max-w-xl h-full">
              {SERVICES.map((s, i) => (
                <div
                  key={s.id}
                  ref={(el) => { contentRefs.current[i] = el; }}
                 className="absolute inset-0 flex flex-col justify-center max-w-xl"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="flex flex-col">
                    <div>
                      {/* <p className="text-primary font-semibold tracking-[0.25em] uppercase text-xs md:text-sm mb-3">
                        {s.tagline}
                      </p> */}
                      <h3 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
                        {s.title}
                      </h3>
                       <p className="text-white/85 font-normal leading-relaxed mb-4 max-w-md">{s.desc}</p>
                      <ul className="flex flex-col gap-2 mb-6">
                        {s.benefits.map((b) => (
                          <li key={b} className="text-white/70 font-medium text-xs md:text-sm tracking-wide flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group inline-flex items-center gap-2 bg-white/95 text-[#1F1F1F] rounded-full px-6 py-3 text-sm font-semibold hover:bg-primary hover:text-white transition-colors duration-300 w-fit"
                    >
                      {s.cta}
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SERVICES.map((s, i) => (
            <span
              key={s.id}
              ref={(el) => { dotRefs.current[i] = el; }}
              className="h-[3px] rounded-full bg-white/25"
              style={{ width: '2rem' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}