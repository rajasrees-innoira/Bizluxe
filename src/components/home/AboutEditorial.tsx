import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import mansionExterior from '@/assets/mansion-exterior.jpg';
import penthouseInterior from '@/assets/penthouse-interior.jpg';
import beachVilla from '@/assets/beach-villa.jpg';

// -----------------------------------------------------------------------------
// AboutEditorial — "Who We Are" as a pinned-image / scrolling-copy sequence.
// Left column stays fixed in the viewport while three short statements pass
// through on the right, each one swapping the pinned image.
//
// IMPORTANT: only ONE beat is ever mounted in the copy column at a time.
// An earlier version stacked all three as absolutely-positioned, opacity-
// animated siblings — during the transition window multiple of them were
// partially visible simultaneously, so the text visibly overlapped/smeared.
// Instead we derive a single discrete "active index" from scroll position
// and swap the whole text block via AnimatePresence, so exactly one heading
// is ever in the DOM.
// -----------------------------------------------------------------------------

const BEATS = [
  {
    eyebrow: '01 — Beyond the Listing',
    heading: 'We do more than sell luxury homes.',
    body: 'BizLuxe represents a curated portfolio of architectural masterpieces across Dubai — chosen for design, provenance, and lasting value, introduced only to the buyers they are right for.',
    image: mansionExterior,
  },
  {
    eyebrow: '02 — Beyond the Transaction',
    heading: 'We guide buyers and advise investors.',
    body: 'Every recommendation is backed by market data, legal diligence, and a decade of developer relationships — so your decision is never a leap of faith.',
    image: penthouseInterior,
  },
  {
    eyebrow: '03 — Beyond the Sale',
    heading: 'We manage properties and build relationships that last.',
    body: 'From handover to concierge management, our senior advisors stay with you — the relationship continues long after the keys change hands.',
    image: beachVilla,
  },
];

const count = BEATS.length;

export function AboutEditorial() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Discrete step 0..count-1 derived from continuous scroll progress.
  const activeStep = useTransform(scrollYProgress, (p) =>
    Math.min(count - 1, Math.max(0, Math.floor(p * count))),
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const unsub = activeStep.on('change', (v) => setActive(v));
    return () => unsub();
  }, [activeStep, reduceMotion]);

  const beat = BEATS[active];

  return (
    <section
      ref={ref}
      className="relative bg-white py-24 md:py-32 lg:py-36"
      style={reduceMotion ? undefined : { height: `${count * 100}vh` }}
      id="about-bizluxe"
    >
      <div className={reduceMotion ? 'py-24' : 'sticky top-0 h-screen overflow-hidden flex items-center'}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Pinned image — crossfades with the active beat */}
            <div className="relative order-2 lg:order-1 aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_40px_100px_-30px_rgba(31,31,31,0.3)]">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={beat.image}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img src={beat.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Copy — exactly one beat mounted at a time */}
            <div className="order-1 lg:order-2 relative min-h-[320px]">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={beat.heading}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-primary font-semibold tracking-[0.25em] uppercase text-xs md:text-sm mb-5">
                    {beat.eyebrow}
                  </p>
                  <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#1F1F1F] leading-[1.1] mb-6 max-w-lg">
                    {beat.heading}
                  </h2>
                  <p className="text-[#5F5F5F] text-base md:text-lg font-light leading-relaxed max-w-md">
                    {beat.body}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots — echoes the pattern used elsewhere on the site */}
              <div className="flex gap-2 mt-10">
                {BEATS.map((_, i) => (
                  <span
                    key={i}
                    className="h-[3px] rounded-full transition-all duration-500"
                    style={{
                      width: i === active ? '2.5rem' : '1.5rem',
                      backgroundColor: i === active ? 'hsl(var(--primary))' : 'rgba(31,31,31,0.15)',
                    }}
                  />
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-[#1F1F1F] font-semibold text-sm hover:text-primary transition-colors"
                >
                  Meet BizLuxe
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}