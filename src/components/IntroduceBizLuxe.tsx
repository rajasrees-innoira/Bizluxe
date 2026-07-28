import React from 'react';
import { motion } from 'framer-motion';
import mansionExterior from '@/assets/mansion-exterior.jpg';

export function IntroduceBizLuxe() {
  return (
    <section
      className="py-24 md:py-32 bg-[#F7F5F2]"
      id="about-bizluxe"
      aria-labelledby="intro-heading"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-[28px] overflow-hidden aspect-[4/5] shadow-[0_30px_80px_-30px_rgba(31,31,31,0.25)]">
              <img
                src={mansionExterior}
                alt="A BizLuxe curated waterfront villa in Dubai"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-white rounded-[24px] px-8 py-6 shadow-[0_20px_50px_-20px_rgba(31,31,31,0.3)] border border-[#E8E4DC]">
              <p className="text-primary font-heading font-bold text-3xl">12+</p>
              <p className="text-[#5F5F5F] text-xs uppercase tracking-wider mt-1">Years in Dubai</p>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <p className="text-primary font-medium tracking-[0.3em] uppercase mb-4 text-sm">
              Introducing BizLuxe
            </p>
            <h2 id="intro-heading" className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[#1F1F1F] leading-[1.1] mb-6">
              Luxury Real Estate,
              <br />
              <span className="text-primary italic font-medium">Thoughtfully Curated.</span>
            </h2>
            <p className="text-[#5F5F5F] text-lg font-light leading-relaxed mb-10 max-w-xl">
              At BizLuxe Estates, we specialize in connecting buyers, investors, and families
              with Dubai's most prestigious properties. From waterfront villas and premium
              apartments to thriving communities and investment opportunities, every listing
              is carefully selected to deliver exceptional value, lifestyle, and long-term growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#collection"
                className="rounded-full bg-primary hover:bg-[#B08F58] text-white font-semibold px-8 py-4 text-sm transition-colors"
              >
                Explore Properties
              </a>
                <a  
                href="/contact"
                className="rounded-full border border-[#D8D8D8] hover:border-primary hover:text-primary text-[#1F1F1F] font-semibold px-8 py-4 text-sm transition-colors"
              >
                Book Consultation
              </a>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}