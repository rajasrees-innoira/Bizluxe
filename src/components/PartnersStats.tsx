import React, { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// -----------------------------------------------------------------------------
// Reuses the same count-up mechanic as WhyBixLuze.tsx so the number motion
// language is consistent site-wide.
// -----------------------------------------------------------------------------
function AnimatedCounter({ value, duration = 2000, suffix = '' }: { value: number | string; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const parsedValue = typeof value === 'string' ? Number.parseFloat(value.replace(/[^0-9.]/g, '')) : Number(value);
  const numericValue = Number.isFinite(parsedValue) ? parsedValue : 0;
  const isString = typeof value === 'string';
  const displayValue = isString ? value.replace(/[0-9.]/g, '') : suffix;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else {
          setIsVisible(false);
          setCount(0);
        }
      },
      { threshold: 0.5 },
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const end = numericValue;
    if (end === 0) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, numericValue, duration]);

  return (
    <span ref={nodeRef}>
      {count}
      {isString && displayValue}
      {!isString && suffix}
    </span>
  );
}

const stats = [
  { value: 50, suffix: '+', label: 'Global Alliances' },
  { value: 18, suffix: '', label: 'Countries Represented' },
  { value: 12, suffix: '+', label: 'Years of Partnership' },
  { value: '40B+', suffix: '', label: 'AED Combined Portfolio' },
];

export function PartnersStats() {
  const statsRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', staggerDelay: 0.15 });

  return (
    <section className="bg-[#F7F5F2] py-16 md:py-20 border-b border-[#D8D8D8]/60">
      <div className="container mx-auto px-6 md:px-12">
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-center md:text-left"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className={i !== 0 ? 'md:border-l md:border-[#D8D8D8] md:pl-8' : ''}>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-[#1F1F1F] font-medium text-xs md:text-sm tracking-[0.15em] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}