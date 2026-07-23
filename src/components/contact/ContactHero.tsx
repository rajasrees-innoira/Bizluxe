import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Circle } from 'lucide-react';
import mansionExterior from '@/assets/mansion-exterior.jpg';

function useDubaiClock() {
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const dubai = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));
      const hours = dubai.getHours();
      setIsOpen(hours >= 9 && hours < 19);
      setTime(
        dubai.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return { time, isOpen };
}

export function ContactHero() {
  const { time, isOpen } = useDubaiClock();

  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-[#0C0C0C] flex items-center" id="contact-hero">
      <div className="absolute inset-0 z-0">
        <img src={mansionExterior} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/70 to-[#0C0C0C]/40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(29 53% 36% / 0.18), transparent 65%)',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary font-medium tracking-[0.35em] uppercase text-xs md:text-sm mb-6"
        >
          Let's Talk
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#F7F5F2] text-[13vw] sm:text-6xl md:text-7xl lg:text-[6.5rem] max-w-4xl [text-shadow:0_2px_30px_rgba(0,0,0,0.5)]"
        >
          Begin Your
          <br />
          <span className="text-primary italic font-medium">Extraordinary</span> Address
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-white/70 text-base md:text-lg font-light leading-relaxed"
        >
          Whether you're acquiring, selling, or simply exploring what's possible -
          our senior advisory team responds personally, usually within the hour.
        </motion.p>

        {/* Live status chip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-10 inline-flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-full pl-3 pr-4 py-2 sm:pl-4 sm:pr-5 sm:py-2.5 max-w-full"
        >
          <span className="relative flex h-2.5 w-2.5">
            {/* <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isOpen ? 'bg-emerald-400' : 'bg-white/40'
              } opacity-75`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isOpen ? 'bg-emerald-400' : 'bg-white/50'
              }`}
            /> */}
          </span>
          <span className="text-white/80 text-xs sm:text-sm md:text-lg whitespace-nowrap">
  {isOpen ? 'Our advisors are online' : "We'll respond first thing"} · Dubai {time}
</span>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}