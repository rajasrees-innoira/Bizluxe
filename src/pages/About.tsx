import React, { useRef } from 'react';
import { Link } from 'wouter';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Handshake,
  Globe2,
  Sparkles,
  Eye,
  Users,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import mansionExterior from '@/assets/mansion-exterior.jpg';
import penthouseInterior from '@/assets/penthouse-interior.jpg';
import emiratesHills from '@/assets/emirates-hills.jpg';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
// =============================================================================
// Scroll-linked word reveal - the paragraph "lights up" word by word as it
// scrolls through the viewport. No IntersectionObserver, no fade-up classes.
// Pure scroll position -> opacity, the mechanic from the reference video.
// =============================================================================

function RevealWord({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.28em]">
      {children}
    </motion.span>
  );
}

function ScrollRevealParagraph({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.88', 'start 0.3'],
  });

  const words = text.split(' ');

  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1.4 / words.length;
        return (
          <RevealWord key={`${w}-${i}`} progress={scrollYProgress} range={[start, Math.min(end, 1)]}>
            {w}
          </RevealWord>
        );
      })}
    </p>
  );
}

// =============================================================================
// Marquee - rotated infinite ticker, same device as the reference's
// "3D Map · 3D Map ·" banner, restyled to BixLuze's palette.
// =============================================================================

function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="relative py-10 md:py-14 bg-[#1F1F1F] -rotate-2 scale-[1.04] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
      <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite]">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-heading font-extrabold uppercase tracking-tight text-3xl md:text-5xl text-white/90 px-6"
          >
            {item}
            <span className="text-primary mx-6 text-2xl">&#10022;</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  );
}

// =============================================================================
// A pillar card that fills in (outline -> solid) as it scrolls into view.
// whileInView + backgroundColor animation - different mechanic from Home's
// hover-only cards.
// =============================================================================

function FillCard({
  index,
  title,
  desc,
  icon: Icon,
}: {
  index: number;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <motion.div
      initial={{ backgroundColor: 'rgba(255,255,255,0)' }}
      whileInView={{ backgroundColor: 'rgba(178,127,63,1)' }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 1.0, delay: index * 0.35, ease: [0.32, 1, 0.36, 1] }}
      className="group relative border border-dashed border-primary/50 rounded-[4px] p-8 md:p-10 min-h-[280px] flex flex-col justify-between"
    >
      <div>
        <span className="font-serif italic text-4xl md:text-5xl text-[#1F1F1F] group-hover:text-white transition-colors duration-500">
          0{index + 1}
        </span>
        <div className="w-10 h-px bg-[#1F1F1F]/30 group-hover:bg-white/40 my-5 transition-colors duration-500" />
        <h3 className="text-xl md:text-2xl font-heading font-bold text-[#1F1F1F] group-hover:text-white transition-colors duration-500 mb-3">
          {title}
        </h3>
        <p className="text-[#5F5F5F] group-hover:text-white/80 text-sm md:text-base font-light leading-relaxed transition-colors duration-500">
          {desc}
        </p>
      </div>
      <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500 mt-8" strokeWidth={1.25} />
    </motion.div>
  );
}

// =============================================================================
// Content
// =============================================================================

const trustPillars = [
  {
    icon: ShieldCheck,
    title: 'Absolute Discretion',
    desc: 'Every transaction handled with white-glove confidentiality, from inquiry to signature.',
  },
  {
    icon: Handshake,
    title: 'Proven Track Record',
    desc: "A decade of closed deals across Dubai's most prestigious addresses.",
  },
  {
    icon: Globe2,
    title: 'A Global Network',
    desc: 'Direct access to qualified buyers, investors, and off-market opportunities worldwide.',
  },
];

const differentiators = [
  { icon: Sparkles, label: 'Editorial Eye', line: 'We judge architecture and provenance the way a curator would.' },
  { icon: Eye, label: 'Radical Transparency', line: "Honest valuations, even when it isn't what you want to hear." },
  { icon: Users, label: 'Senior Advisors Only', line: 'You work with a partner from day one - never a hand-off.' },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
 const heroTextRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', staggerDelay: 0.15 });


  return (
    <main className="min-h-screen bg-[#F7F5F2] overflow-hidden">
      <Navbar />

      {/* ================================================================ */}
      {/* HERO - quiet, typographic, no video. Deliberately unlike Home.   */}
      {/* ================================================================ */}
      <section className="relative h-[85vh] min-h-[560px] flex items-end overflow-hidden bg-[#0C0C0C]">
        <div className="absolute inset-0 z-0">
          <img
            src={mansionExterior}
            alt="Bizluxe - About Us"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/50 to-[#0C0C0C]/10" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pb-16 md:pb-24">
          <div ref={heroTextRef} className="max-w-4xl">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">About Us</span>
            </div>
            <h1 className="font-heading font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Who We Are,
              <br />
              <span className="text-primary italic font-medium">Beyond the Address</span>
            </h1>
            <p className="mt-8 text-white/75 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              Bizluxe exists for buyers who expect more than a listing - a trusted partner who understands
              architecture, discretion, and true luxury living in Dubai.
            </p>
          </div>
        </div>
      </section>
      {/* ================================================================ */}
      {/* WHO WE ARE - scroll-driven paragraph reveal                      */}
      {/* ================================================================ */}
      <section className="py-20 md:py-32" id="who-we-are">
        <div className="container mx-auto px-6 md:px-12">
          <span className="block text-center text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-8">
            Who We Are
          </span>
          <ScrollRevealParagraph
            text="BixLuze is a curated advisory, not a listings portal. We represent a small portfolio of architectural masterpieces across Dubai, chosen for design, provenance, and lasting value - and we introduce them only to the buyers they're right for."
            className="max-w-5xl mx-auto text-center font-heading font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] text-[#1F1F1F]"
          />
        </div>
      </section>

      {/* Marquee divider */}
      <Marquee
        items={[
            'Trust',
            'Integrity',
            'Discretion',
            'Prestige',
            'Refined Living',
            'Private Advisory',
            'Curated Excellence',
            'Global Standards',
            'Architectural Excellence',
            'Investment Confidence',
            'Luxury Redefined',
            'Timeless Elegance',
        ]}
        />

      {/* ================================================================ */}
      {/* WHY TRUST US                                                     */}
      {/* ================================================================ */}
      <section className="py-24 md:py-36 bg-[#F7F5F2]" id="why-trust-us">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-16 md:mb-20">
            <div className="lg:w-[30%]">
              <span className="block text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-4">
                Why Trust Us
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1F1F1F] leading-tight">
                Trust that's earned,
                <br />
                not assumed.
              </h2>
            </div>
            <div className="lg:w-[70%] lg:pt-2">
              <ScrollRevealParagraph
                text="Every recommendation we make is backed by market data, legal diligence, and a decade of relationships across Dubai's developer landscape - so your decision is never a leap of faith."
                className="text-2xl md:text-3xl lg:text-4xl leading-[1.35] font-light text-[#1F1F1F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {trustPillars.map((item, i) => (
              <FillCard key={item.title} index={i} title={item.title} desc={item.desc} icon={item.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Image + overlapping stat cards (bottom-edge overlap treatment)   */}
      {/* ================================================================ */}
      <section className="relative">
        <div className="h-[55vh] md:h-[65vh] w-full overflow-hidden">
          <img src={emiratesHills} alt="A BixLuze represented estate" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F5F2] via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="relative -mt-20 md:-mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { value: '12+', label: 'Years in Dubai Real Estate' },
              { value: '1,250+', label: 'Properties Represented' },
              { value: 'AED 12B+', label: 'In Closed Transactions' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-[24px] shadow-[0_30px_70px_-25px_rgba(31,31,31,0.35)] p-8 md:p-10"
              >
                <p className="font-serif italic text-4xl md:text-5xl text-[#1F1F1F] mb-2">{stat.value}</p>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5F5F5F]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* HOW WE WORK - vertical numbered rows, not icon cards             */}
      {/* ================================================================ */}
      <section className="py-24 md:py-36" id="how-we-work">
        <div className="container mx-auto px-6 md:px-12">
          <span className="block text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
            How We Work
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-6xl text-[#1F1F1F] leading-[1.05] max-w-2xl mb-16 md:mb-20">
            Four steps. Zero pressure.
          </h2>

          <div className="flex flex-col">
            {[
              { title: 'Discover', desc: 'We learn your goals and lifestyle before a single property is shown.' },
              { title: 'Curate', desc: 'A private shortlist matched to your brief - including off-market listings.' },
              { title: 'Negotiate', desc: 'Senior advisors handle every term and valuation, so you negotiate from strength.' },
              { title: 'Close & Beyond', desc: 'From handover to concierge management, the relationship continues.' },
            ].map((step, i, arr) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 1.0, delay: i * 0.20, ease: [0.32, 1, 0.36, 1] }}
                className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-8 md:py-10 border-t ${
                  i === arr.length - 1 ? 'border-b' : ''
                } border-[#D8D8D8]`}
              >
                <span className="font-serif italic text-3xl md:text-4xl text-primary md:w-24 shrink-0">
                  0{i + 1}
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#1F1F1F] md:w-64 shrink-0">
                  {step.title}
                </h3>
                <p className="text-[#5F5F5F] font-light text-base md:text-lg leading-relaxed md:max-w-xl">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* WHY WE'RE DIFFERENT                                              */}
      {/* ================================================================ */}
      <section className="py-24 md:py-36 bg-[#1F1F1F] text-white" id="why-different">
        <div className="container mx-auto px-6 md:px-12">
          <span className="block text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-6">
            Why We're Different
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-16 md:mb-20">
            We're not brokers.
            <br />
            <span className="font-serif italic font-normal text-primary">We're lifestyle architects.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="border-t border-white/15 pt-8">
                  <Icon className="w-7 h-7 text-primary mb-6" strokeWidth={1.5} />
                  <h3 className="font-heading font-bold text-xl mb-3">{item.label}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{item.line}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CLOSING - dual link cards, matching the reference's closing beat */}
      {/* ================================================================ */}
      <section className="py-24 md:py-32 bg-[#F7F5F2]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-14">
            <h2 className="font-heading font-bold text-4xl md:text-6xl text-[#1F1F1F] leading-[1.05]">
              Ready for your
              <span className="font-serif italic font-normal text-primary"> next chapter?</span>
            </h2>
            <p className="mt-6 text-[#5F5F5F] text-lg font-light">
              Whichever way you'd like to start, we're one message away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Link
    href="/#consultation"
    className="group flex items-center gap-3 sm:gap-6 bg-white rounded-[28px] p-4 sm:p-5 hover:-translate-y-1.5 transition-all duration-500 shadow-[0_20px_50px_-25px_rgba(31,31,31,0.25)]"
  >
    <div className="w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-[20px] overflow-hidden shrink-0">
      <img src={penthouseInterior} alt="Book a consultation" className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-heading font-bold text-base sm:text-xl md:text-2xl text-[#1F1F1F]">
        Book a private <span className="font-serif italic font-normal text-primary">consultation</span>
      </p>
    </div>
    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1F1F1F] group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-500">
      <ArrowUpRight className="text-white w-4 h-4 sm:w-5 sm:h-5" size={20} />
    </div>
  </Link>

  <Link
    href="/#collection"
    className="group flex items-center gap-3 sm:gap-6 bg-white rounded-[28px] p-4 sm:p-5 hover:-translate-y-1.5 transition-all duration-500 shadow-[0_20px_50px_-25px_rgba(31,31,31,0.25)]"
  >
    <div className="w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-[20px] overflow-hidden shrink-0">
      <img src={mansionExterior} alt="View the collection" className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-heading font-bold text-base sm:text-xl md:text-2xl text-[#1F1F1F]">
        View the <span className="font-serif italic font-normal text-primary">collection</span>
      </p>
    </div>
    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1F1F1F] group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors duration-500">
      <ArrowUpRight className="text-white w-4 h-4 sm:w-5 sm:h-5" size={20} />
    </div>
  </Link>
</div>
        </div>
      </section>

      <Footer />
    </main>
  );
}