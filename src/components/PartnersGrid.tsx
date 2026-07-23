import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
// 20 partner placeholders across four alliance categories.
//
// Replace `logo` with your real asset import, e.g.:
//   import emaarLogo from '@/assets/partners/emaar.png';
// and swap the value below. `name` and `category` can also be edited freely -
// they double as the accessible alt text and the filter tab groupings.
// -----------------------------------------------------------------------------
type Partner = {
  id: number;
  name: string;
  category: 'Developers' | 'Financial Partners' | 'Design & Architecture' | 'Legal & Concierge';
  logo: string;
};

const partners: Partner[] = [
  { id: 1, name: 'EMAAR', category: 'Developers', logo: emmarLogo },
  { id: 2, name: 'AZIZI', category: 'Developers', logo: azizi },
  { id: 3, name: 'Damac', category: 'Developers', logo: Damac },
  { id: 4, name: 'Partner Logo 04', category: 'Developers', logo: bing },
  { id: 5, name: 'Prescott', category: 'Developers', logo: Prescott },

  { id: 6, name: 'Danube properties', category: 'Financial Partners', logo: Danube},
  { id: 7, name: 'Nakheel', category: 'Financial Partners', logo: Nakheel },
  { id: 8, name: 'MERAAS', category: 'Financial Partners', logo: MERAAS },
  { id: 9, name: 'ARADA', category: 'Financial Partners', logo: ARADA },
  { id: 10, name: 'SAMANA', category: 'Financial Partners', logo: SAMANA },

  { id: 11, name: 'ELLINGTON', category: 'Design & Architecture', logo: ELLINGTON },
  { id: 12, name: 'ARAS', category: 'Design & Architecture', logo: ARAS },
  { id: 13, name: 'DUBAI SOUTH', category: 'Design & Architecture', logo: DUBAISOUTH },
  { id: 14, name: 'MAJID AL FUTTAIM', category: 'Design & Architecture', logo: MAJIDALFUTTAIM },
  { id: 15, name: 'OMNIYAT', category: 'Design & Architecture', logo: OMNIYAT },

  { id: 16, name: 'DUABI PROPERTIES', category: 'Legal & Concierge', logo: DUABIPROPERTIES },
  { id: 17, name: 'SOBHA', category: 'Legal & Concierge', logo: SOBHA },
  { id: 18, name: 'IMTIAZ', category: 'Legal & Concierge', logo: IMTIAZ },
  { id: 19, name: 'TIGER', category: 'Legal & Concierge', logo: TIGER },
  { id: 20, name: 'DEYAAR', category: 'Legal & Concierge', logo: DEYAAR},
];

const filters = ['All', 'Developers', 'Financial Partners', 'Design & Architecture', 'Legal & Concierge'] as const;
type Filter = (typeof filters)[number];

export function PartnersGrid() {
  const [active, setActive] = useState<Filter>('All');
  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up' });
  const tabsRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up', staggerDelay: 0.15 });

  const visible = useMemo(
    () => (active === 'All' ? partners : partners.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden" id="partners-grid">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-primary font-medium tracking-[0.3em] uppercase mb-4 text-sm">
            The Network
          </p>
          <h2 className="text-4xl md:text-6xl font-heading font-bold leading-[1.05]">
            <span className="text-[#1F1F1F]">CURATED BY</span>{' '}
            <span className="text-primary italic font-medium">REPUTATION</span>
          </h2>
        </div>

        {/* Filter tabs */}
        <div ref={tabsRef} className="flex flex-wrap items-center justify-center gap-3 mb-16 md:mb-20">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative px-6 py-3 rounded-full text-xs md:text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-500 border ${
                active === f
                  ? 'bg-[#1F1F1F] text-white border-[#1F1F1F]'
                  : 'bg-transparent text-[#5F5F5F] border-[#D8D8D8] hover:border-primary hover:text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((partner, index) => (
              <PartnerTile key={partner.id} partner={partner} index={index} />
            ))}
          </AnimatePresence>
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
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
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

        {/* Hover label bar */}
        
      </div>
    </motion.div>
  );
}