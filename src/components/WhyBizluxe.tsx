import React, { useEffect, useRef, useState } from 'react';
// import { useGetStats } from '@workspace/api-client-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import minimalistInterior from '@/assets/minimalist-interior.jpg';
// import { useGetStats } from '../../../../lib/api-client-react/src/generated/api';

// Animated Counter Component
function AnimatedCounter({ value, duration = 2000, suffix = "" }: { value: number | string, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Extract number from string if it contains characters (like 12B)
  const parsedValue = typeof value === 'string'
    ? Number.parseFloat(value.replace(/[^0-9.]/g, ''))
    : Number(value);
  const numericValue = Number.isFinite(parsedValue) ? parsedValue : 0;
  const isString = typeof value === 'string';
  const displayValue = isString ? value.replace(/[0-9.]/g, '') : suffix;


useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setCount(0); // reset so it counts up again next time
      }
    },
    { threshold: 0.5 }
  );

  if (nodeRef.current) {
    observer.observe(nodeRef.current);
  }

  return () => observer.disconnect();
}, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = numericValue;
    if (start === end) return;

    let startTime: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
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

const fallbackStats = {
  totalProperties: 1250,
  clientSatisfaction: 98,
  totalTransactionsAED: "12B+",
  totalCommunities: 24
};

export function WhyBizluxe() {
  const stats = fallbackStats;

  const textRef = useScrollAnimation({ type: "fade-up", once: false });
const imageRef = useScrollAnimation({ type: "mask-reveal", once: false });
const statsRef = useScrollAnimation({
  type: "fade-up",
  staggerDelay: 0.3,
  once: false,
});

  return (
    <section className="py-24 bg-[#F7F5F2] overflow-hidden" id="about">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* Image Side - 55% */}
          <div className="w-full lg:w-[55%] relative">
            <div className="rounded-[80px] overflow-hidden relative aspect-[4/5] bg-[#D8D8D8]">
              <img 
                src={minimalistInterior} 
                alt="Luxury Interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-[1px] border-white/20 rounded-[80px] m-4"></div>
            </div>

          </div>

          {/* Text Side - 45% */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <div ref={textRef}>
              <p className="text-primary font-medium tracking-widest uppercase mb-4 text-sm">The Bizluxe Standard</p>
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-[#1F1F1F] mb-8 leading-[1.1]">
                WE DON'T JUST SELL PROPERTIES. <br/>
                <span className="text-primary font-medium italic">WE CURATE LIFESTYLES.</span>
              </h2>
              
              <div className="text-[#5F5F5F] text-lg font-light leading-relaxed space-y-6">
                <p>
                  Bizluxe represents the absolute pinnacle of luxury real estate in Dubai. We cater to an exclusive clientele who expect nothing short of extraordinary. 
                </p>
                <p>
                  Our portfolio is a meticulously curated collection of architectural masterpieces - from sky-high penthouses in Downtown to sprawling beachfront estates on Palm Jumeirah.
                </p>
              </div>
            </div>

            <div ref={statsRef} className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[#D8D8D8] pt-8">
              <div>
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                  <AnimatedCounter value={stats.totalProperties} />+
                </h3>
                <p className="text-[#1F1F1F] font-medium text-sm tracking-wide uppercase">Luxury Properties</p>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                  <AnimatedCounter value={stats.totalTransactionsAED} />
                </h3>
                <p className="text-[#1F1F1F] font-medium text-sm tracking-wide uppercase">Transactions (AED)</p>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                  <AnimatedCounter value={stats.clientSatisfaction} />%
                </h3>
                <p className="text-[#1F1F1F] font-medium text-sm tracking-wide uppercase">Client Satisfaction</p>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                  <AnimatedCounter value={stats.totalCommunities} />
                </h3>
                <p className="text-[#1F1F1F] font-medium text-sm tracking-wide uppercase">Elite Communities</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
