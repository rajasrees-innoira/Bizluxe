import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import heroVideo from '@/assets/hero.mp4';
import heroPoster from '@/assets/hero.jpg';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', staggerDelay: 0.2 });
  const buttonsRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', staggerDelay: 0.4 });
  const statsRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', staggerDelay: 0.6 });

  useEffect(() => {
    // Ensure autoplay kicks in on browsers that need an explicit play() call
    videoRef.current?.play().catch(() => {
      /* autoplay may be blocked until user interaction - safe to ignore */
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[720px] flex items-end overflow-hidden bg-[#0C0C0C]"
      id="home"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Minimal scrim: just enough for legibility, video stays the hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/25 to-transparent" />
        <div className="absolute inset-0 bg-[#0C0C0C]/10" />
      </div>

      {/* Content - bottom-center aligned, compact and legible over motion */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 pb-20 md:pb-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div ref={headingRef} className="flex flex-col items-center">
          
            <h1 className="font-heading font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[#F7F5F2] text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              Homes Built
              <br />
              <span className="text-primary italic font-medium">To Be Remembered</span>
            </h1>
          </div>

          <div ref={buttonsRef} className="mt-5 mb-4 flex flex-wrap justify-center gap-3">
            <Button
  className="bg-white text-[#0C0C0C] hover:bg-primary hover:text-white rounded-full px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold shadow-warm hover:-translate-y-1 transition-all duration-300"
              onClick={() => {
                document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
             Explore Properties
</Button>
<Button
  variant="outline"
  className="border-white/70 text-white hover:bg-white hover:text-[#0C0C0C] rounded-full px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base font-semibold hover:-translate-y-1 transition-all duration-300 bg-transparent backdrop-blur-sm"
              onClick={() => {
                document.getElementById('publish')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Publish Property
            </Button>
          </div>
        </div>
      </div>

      
    </section>
  );
}