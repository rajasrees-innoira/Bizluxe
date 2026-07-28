import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// -----------------------------------------------------------------------------
// TrustStats - sits directly under the Hero. Establishes credibility in the
// first scroll before any selling happens. Deliberately text-forward and
// quiet: a single hairline-divided row, not cards, so it reads like a
// masthead statistic strip (Sotheby's / FT-style) rather than a dashboard.
// -----------------------------------------------------------------------------

function AnimatedCounter({
  value,
  suffix = '',
  duration = 1800,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
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

const STATS = [
  { value: 12, suffix: '+', label: 'Years in Dubai Real Estate' },
  { value: 1250, suffix: '+', label: 'Luxury Properties Represented' },
  { value: 480, suffix: '+', label: 'Satisfied Clients' },
  { value: 12, suffix: 'B+', label: 'AED in Closed Transactions' },
  { value: 24, suffix: '', label: 'Communities Covered' },
];

export function TrustStats() {
  return (
    <section className="relative bg-[#F7F5F2] border-y border-[#D8D8D8]/60" aria-label="BizLuxe at a glance">
      <div className="container mx-auto px-6 md:px-12 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-10">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm">
            BizLuxe at a Glance
          </p>
          <p className="text-[#5F5F5F] text-sm font-light max-w-sm">
            A decade of discretion, precision, and results across Dubai's most prestigious addresses.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`py-4 md:py-0 ${
                i !== 0 ? 'md:border-l md:border-[#D8D8D8] md:pl-6' : ''
              } ${i % 2 !== 0 ? 'border-l border-[#D8D8D8] pl-4 md:pl-6' : 'pr-4'}`}
            >
              <h3 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#1F1F1F] mb-1.5">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-[#5F5F5F] text-[11px] md:text-xs font-medium tracking-[0.1em] uppercase leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}