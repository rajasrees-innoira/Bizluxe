import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// -----------------------------------------------------------------------------
// CustomerJourney - a sticky section where a horizontal progress line fills
// as the user scrolls, and each milestone lights up in sequence. Distinct
// from the pinned-image mechanics elsewhere: here the SIGNAL is a single
// drawing line, deliberately restrained against the busier sections around it.
// -----------------------------------------------------------------------------

const MILESTONES = [
  { label: 'Discover', desc: 'We learn your goals and lifestyle first.' },
  { label: 'Consultation', desc: 'A private session with a senior advisor.' },
  { label: 'Selection', desc: 'A shortlist matched to your brief.' },
  { label: 'Investment Advice', desc: 'Yield, appreciation, and risk reviewed.' },
  { label: 'Site Visits', desc: 'Private viewings, on your schedule.' },
  { label: 'Purchase', desc: 'Every term negotiated in your favor.' },
  { label: 'Documentation', desc: 'Legal diligence, handled end to end.' },
  { label: 'Management', desc: 'Ongoing stewardship of your asset.' },
  { label: 'Partnership', desc: 'A relationship that continues for years.' },
];

export function CustomerJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const lineScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative bg-[#F7F5F2]"
      style={reduceMotion ? undefined : { height: '260vh' }}
      id="journey"
    >
      <div className={reduceMotion ? 'py-24' : 'sticky top-0 h-screen flex flex-col justify-center overflow-hidden'}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <p className="text-primary font-medium tracking-[0.3em] uppercase mb-4 text-sm">
              How It Works
            </p>
            <h2 className="font-heading font-bold text-4xl md:text-6xl text-[#1F1F1F] leading-[1.05]">
              Your Journey With BizLuxe
            </h2>
          </div>

          {/* Desktop: horizontal filling line */}
          <div className="hidden md:block relative">
            <div className="absolute left-0 right-0 top-[13px] h-[2px] bg-[#D8D8D8]" />
            <motion.div
              className="absolute left-0 top-[13px] h-[2px] bg-primary origin-left"
              style={reduceMotion ? { scaleX: 1 } : { scaleX: lineScale }}
            />
            <div className="grid grid-cols-9 gap-2">
              {MILESTONES.map((m, i) => {
                const point = i / (MILESTONES.length - 1);
                const dotOpacity = useTransform(
                  scrollYProgress,
                  [Math.max(0, point - 0.08), point],
                  [0.3, 1],
                );
                return (
                  <div key={m.label} className="flex flex-col items-center text-center px-1">
                    <motion.span
                      style={reduceMotion ? { opacity: 1 } : { opacity: dotOpacity }}
                      className="w-[13px] h-[13px] rounded-full bg-primary border-4 border-[#F7F5F2] shadow-[0_0_0_1px_rgba(31,31,31,0.1)] mb-5 z-10"
                    />
                    <h3 className="font-heading font-bold text-sm text-[#1F1F1F] mb-1.5">{m.label}</h3>
                    <p className="text-[#5F5F5F] text-xs font-light leading-snug">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: vertical list, no scroll-pin needed */}
          <div className="md:hidden flex flex-col gap-8">
            {MILESTONES.map((m, i) => (
              <div key={m.label} className="flex gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  {i !== MILESTONES.length - 1 && <span className="w-px flex-1 bg-[#D8D8D8] mt-2" />}
                </div>
                <div className="pb-2">
                  <h3 className="font-heading font-bold text-base text-[#1F1F1F] mb-1">{m.label}</h3>
                  <p className="text-[#5F5F5F] text-sm font-light leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}