import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import emmarLogo from '@/assets/partners/emmar.jpg';
import azizi from '@/assets/partners/1.png';
import Damac from '@/assets/partners/3.png';
import bing from '@/assets/partners/4.png';
import Prescott from '@/assets/partners/5.png';
import Danube from '@/assets/partners/6.png';
import Nakheel from '@/assets/partners/7.png';
import MERAAS from '@/assets/partners/8.png';
import ARADA from '@/assets/partners/9.png';
import SAMANA from '@/assets/partners/10.png';
import ELLINGTON from '@/assets/partners/11.png';
import ARAS from '@/assets/partners/13.png';
import DUBAISOUTH from '@/assets/partners/14.png';
import MAJIDALFUTTAIM from '@/assets/partners/15.png';
import OMNIYAT from '@/assets/partners/16.png';
import DUABIPROPERTIES from '@/assets/partners/17.jpg';
import SOBHA from '@/assets/partners/18.jpg';
import IMTIAZ from '@/assets/partners/20.jpg';
import TIGER from '@/assets/partners/21.jpg';
import DEYAAR from '@/assets/partners/22.jpg';

// -----------------------------------------------------------------------------
// Full 20-partner showcase. No filter tabs - every alliance is presented as
// part of a single, unified Developers network.
// -----------------------------------------------------------------------------
type Partner = {
  id: number;
  name: string;
  logo: string;
};

const partners: Partner[] = [
  { id: 1, name: 'EMAAR', logo: emmarLogo },
  { id: 2, name: 'AZIZI', logo: azizi },
  { id: 3, name: 'Damac', logo: Damac },
  { id: 4, name: 'Partner Logo 04', logo: bing },
  { id: 5, name: 'Prescott', logo: Prescott },
  { id: 6, name: 'Danube properties', logo: Danube },
  { id: 7, name: 'Nakheel', logo: Nakheel },
  { id: 8, name: 'MERAAS', logo: MERAAS },
  { id: 9, name: 'ARADA', logo: ARADA },
  { id: 10, name: 'SAMANA', logo: SAMANA },
  { id: 11, name: 'ELLINGTON', logo: ELLINGTON },
  { id: 12, name: 'ARAS', logo: ARAS },
  { id: 13, name: 'DUBAI SOUTH', logo: DUBAISOUTH },
  { id: 14, name: 'MAJID AL FUTTAIM', logo: MAJIDALFUTTAIM },
  { id: 15, name: 'OMNIYAT', logo: OMNIYAT },
  { id: 16, name: 'DUABI PROPERTIES', logo: DUABIPROPERTIES },
  { id: 17, name: 'SOBHA', logo: SOBHA },
  { id: 18, name: 'IMTIAZ', logo: IMTIAZ },
  { id: 19, name: 'TIGER', logo: TIGER },
  { id: 20, name: 'DEYAAR', logo: DEYAAR },
];

export function PartnersGrid() {
  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up' });

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden" id="partners-grid">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p className="text-primary font-medium tracking-[0.3em] uppercase mb-4 text-sm">
            The Network
          </p>
          <h2 className="text-4xl md:text-6xl font-heading font-bold leading-[1.05]">
            <span className="text-[#1F1F1F]">CURATED</span>{' '}
            <span className="text-primary italic font-medium">DEVELOPERS</span>
          </h2>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7"
        >
          {partners.map((partner, index) => (
            <PartnerTile key={partner.id} partner={partner} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Individual tile - grayscale-to-color reveal, gold hairline ring, subtle lift
// and 3D tilt on hover. This is the page's signature interaction.
// -----------------------------------------------------------------------------
function PartnerTile({ partner, index }: { partner: Partner; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (index % 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <div className="relative aspect-[4/3] rounded-[24px] md:rounded-[28px] bg-[#F7F5F2] border border-[#D8D8D8]/70 overflow-hidden shadow-[0_10px_30px_-15px_rgba(31,31,31,0.15)] transition-all duration-500 ease-out group-hover:shadow-[0_25px_50px_-15px_rgba(139,90,43,0.25)] group-hover:border-primary/50">
        {/* Gold corner accent */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/0 group-hover:border-primary/60 transition-all duration-500 m-4 rounded-tl-md" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/0 group-hover:border-primary/60 transition-all duration-500 m-4 rounded-br-md" />

        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <img
            src={partner.logo}
            alt={partner.name}
            loading="lazy"
            className="max-w-full max-h-full object-contain grayscale opacity-60 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
          />
        </div>
      </div>
    </motion.div>
  );
}