import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import mansionExterior from '@/assets/mansion-exterior.jpg';
import marinaNight from '@/assets/marina-night.jpg';
import emiratesHills from '@/assets/emirates-hills.jpg';
import beachVilla from '@/assets/beach-villa.jpg';
import resortVilla from '@/assets/resort-villa.jpg';
import minimalistInterior from '@/assets/minimalist-interior.jpg';

interface Collection {
  id: string;
  title: string;
  description: string;
  count: number;
  image: string;
  href: string;
}

const COLLECTIONS: Collection[] = [
  { id: 'villas', title: 'Villas', description: 'Standalone luxury residences with private gardens and pools.', count: 142, image: mansionExterior, href: '/properties?type=Villa' },
  { id: 'apartments', title: 'Apartments', description: 'Sky-high urban living in Dubai\'s most iconic towers.', count: 210, image: marinaNight, href: '/properties?type=Apartment' },
  { id: 'communities', title: 'Communities', description: 'Master-planned neighborhoods built for families and lifestyle.', count: 24, image: emiratesHills, href: '/properties' },
  { id: 'farmhouses', title: 'Farmhouses', description: 'Private countryside retreats just outside the city.', count: 21, image: beachVilla, href: '/properties?type=Farmhouse' },
  { id: 'commercial', title: 'Commercial', description: 'Prime office and retail space in key business districts.', count: 63, image: resortVilla, href: '/properties?type=Commercial' },
  { id: 'off-plan', title: 'Off Plan Projects', description: 'VIP access to upcoming developments before public launch.', count: 38, image: minimalistInterior, href: '/properties' },
];

export function PropertyCollections() {
  return (
    <section className="py-24 md:py-32 bg-white" id="collections" aria-labelledby="collections-heading">
      <div className="container mx-auto px-6 md:px-12 max-w-[1440px]">
        <header className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="text-primary font-medium tracking-[0.3em] uppercase mb-4 text-sm">Browse By Category</p>
          <h2 id="collections-heading" className="font-heading font-bold text-4xl md:text-6xl text-[#1F1F1F] leading-[1.05] mb-6">
            Explore Our Property Collections
          </h2>
          <p className="text-[#5F5F5F] text-lg font-light leading-relaxed">
            Browse carefully curated collections designed for every lifestyle and investment goal.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {COLLECTIONS.map((c, i) => (
            <motion.a
              key={c.id}
              href={c.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[28px] overflow-hidden aspect-[4/5] shadow-[0_20px_50px_-25px_rgba(31,31,31,0.25)]"
            >
              <img
                src={c.image}
                alt={`${c.title} - BizLuxe property collection`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Bronze overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/25 mix-blend-multiply transition-colors duration-500" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-2">{c.count} Properties</p>
                <h3 className="font-heading font-bold text-2xl text-white mb-2">{c.title}</h3>
                <p className="text-white/70 text-sm font-light leading-relaxed mb-4 max-w-[85%]">{c.description}</p>
                <span className="inline-flex items-center gap-2 text-white text-sm font-semibold">
                  Explore
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}