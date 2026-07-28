import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronDown, Building2, Home as HomeIcon, Store } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import mansionExterior from '@/assets/mansion-exterior.jpg';
import type { Filters, DealType } from '@/data/Propertydata';
// -----------------------------------------------------------------------------
// Content
// -----------------------------------------------------------------------------
interface PropertiesHeroProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
}
// type DealType = 'buy' | 'rent' | 'commercial';

const DEAL_TYPES: { id: DealType; label: string }[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'rent', label: 'Rent' },
  { id: 'commercial', label: 'Commercial' },
];

const PROPERTY_TYPES = ['Villa', 'Penthouse', 'Apartment', 'Farmhouse', 'Guest House', 'Commercial'];
const PRICE_RANGES = ['AED 1M – 5M', 'AED 5M – 15M', 'AED 15M – 40M', 'AED 40M+'];
const BEDROOM_OPTIONS = ['Studio', '1+', '2+', '3+', '4+', '5+'];

const STATS = [
  { value: 500, suffix: '+', label: 'Properties' },
  { value: 12, suffix: '', label: 'Cities' },
  { value: 50, suffix: '+', label: 'Luxury Communities' },
  { value: 24, suffix: '/7', label: 'Concierge' },
];

// -----------------------------------------------------------------------------
// Animated counter (matches the mechanic already used in WhyBizluxe / PartnersStats)
// -----------------------------------------------------------------------------

function AnimatedCounter({ value, suffix = '', duration = 1800 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * value));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [visible, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Hero
// -----------------------------------------------------------------------------

export function PropertiesHero({ filters, onFilterChange }: PropertiesHeroProps) {
  const [dealType, setDealType] = useState<DealType>('buy');

  return (
    <section className="relative w-full bg-[#0C0C0C]" id="properties-hero">
      {/* ---------------------------------------------------------------- */}
      {/* Cinematic backdrop                                                */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative h-[78vh] min-h-[620px] w-full overflow-hidden flex flex-col">
        <div className="absolute inset-0 z-0">
          <img
            src={mansionExterior}
            alt=""
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/55 to-[#0C0C0C]/25" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 45% at 50% 20%, hsl(29 53% 36% / 0.16), transparent 65%)',
            }}
          />
        </div>

        {/* Headline */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-primary font-medium tracking-[0.35em] uppercase text-xs md:text-sm mb-6"
          >
            The BizLuxe Marketplace
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#F7F5F2] text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl [text-shadow:0_2px_30px_rgba(0,0,0,0.5)]"
          >
            Every Address,
            <br />
            <span className="text-primary italic font-medium">One Collection</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-white/70 text-base md:text-lg font-light leading-relaxed"
          >
            Search hundreds of Dubai's most exceptional residences - curated, verified,
            and ready to explore in seconds.
          </motion.p>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Floating search card - anchored to the bottom edge of the hero */}
        {/* -------------------------------------------------------------- */}
        
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Stats bar - sits below the floating card, absorbs its overhang    */}
      {/* ---------------------------------------------------------------- */}
      {/* <div className="bg-[#0C0C0C] pt-24 md:pt-28 pb-14 md:pb-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={i !== 0 ? 'md:border-l md:border-white/10' : ''}
              >
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-white/50 font-medium text-xs md:text-sm tracking-[0.15em] uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
}