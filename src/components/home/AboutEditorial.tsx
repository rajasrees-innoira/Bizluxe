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

const BEATS = [
  {
    eyebrow: '01 - Beyond the Listing',
    heading: 'We do more than sell luxury homes.',
    body: 'BizLuxe represents a curated portfolio of architectural masterpieces across Dubai - chosen for design, provenance, and lasting value, introduced only to the buyers they are right for.',
    image: mansionExterior,
  },
  {
    eyebrow: '02 - Beyond the Transaction',
    heading: 'We guide buyers and advise investors.',
    body: 'Every recommendation is backed by market data, legal diligence, and a decade of developer relationships - so your decision is never a leap of faith.',
    image: penthouseInterior,
  },
  {
    eyebrow: '03 - Beyond the Sale',
    heading: 'We manage properties and build relationships that last.',
    body: 'From handover to concierge management, our senior advisors stay with you - the relationship continues long after the keys change hands.',
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
      className="relative bg-white py-16 sm:py-24 md:py-32 lg:py-36"
      style={reduceMotion ? undefined : { height: `${count * 100}vh` }}
      id="about-bizluxe"
    >
      <div
  className={
    reduceMotion
      ? 'py-16 sm:py-24'
      : 'sticky top-0 h-screen overflow-hidden flex items-center'
  }
>
  <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12 max-w-[1600px] 2xl:max-w-[1800px]">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-16 xl:gap-20 items-center">
      {/* Image — smaller ceiling on md so it doesn't eat the viewport */}
      <div
        className="
          relative order-2 lg:order-1
          w-full mx-auto lg:mx-0
          max-w-[200px] sm:max-w-[240px] md:max-w-[220px]
          lg:max-w-[380px] xl:max-w-[440px] 2xl:max-w-[500px]
          aspect-[4/5]
          rounded-[18px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px]
          overflow-hidden
          shadow-[0_16px_40px_-20px_rgba(31,31,31,0.3)]
          md:shadow-[0_30px_80px_-25px_rgba(31,31,31,0.3)]
        "
      >
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

      {/* Text */}
      <div className="order-1 lg:order-2 relative text-center lg:text-left">
        <AnimatePresence initial={false} mode="wait">
          <motion.div key={beat.heading} /* ...unchanged... */>
            <p className="text-primary font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[10px] sm:text-xs md:text-xs lg:text-sm mb-2 sm:mb-4 md:mb-3">
              {beat.eyebrow}
            </p>
            <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-2xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-[#1F1F1F] leading-[1.15] mb-3 sm:mb-4 md:mb-3 lg:mb-6 max-w-xl mx-auto lg:mx-0">
              {beat.heading}
            </h2>
            <p className="text-[#5F5F5F] text-xs sm:text-sm md:text-sm lg:text-lg xl:text-xl font-light leading-relaxed max-w-md xl:max-w-lg mx-auto lg:mx-0">
              {beat.body}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 sm:mt-5 md:mt-4 lg:mt-8 flex justify-center lg:justify-start">
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

              <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-[#1F1F1F] font-semibold text-sm xl:text-base hover:text-primary transition-colors"
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