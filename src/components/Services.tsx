import React from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { Key, Home, Banknote, ShieldCheck, HardHat, Compass, Landmark } from 'lucide-react';

const services = [
  { icon: Key, title: "Buy & Sell", desc: "Access the most exclusive properties in Dubai with complete discretion and expertise." },
  { icon: Banknote, title: "Investment", desc: "Data-driven insights for high-yield real estate investments and portfolio diversification." },
  { icon: ShieldCheck, title: "Property Management", desc: "White-glove management for your luxury assets, ensuring pristine condition and seamless tenancy." },
  { icon: HardHat, title: "Off-Plan Projects", desc: "First access to VIP launches and the most anticipated developments before they hit the market." },
  { icon: Landmark, title: "Luxury Consult", desc: "Bespoke advisory on interior design, architecture, and luxury real estate acquisitions." },
  { icon: Compass, title: "Relocation", desc: "End-to-end concierge services for high-net-worth individuals relocating to the UAE." }
];

export function Services() {
  const headingRef = useScrollAnimation<HTMLDivElement>({ type: 'fade-up' });
  const listRef = useStaggeredAnimation<HTMLDivElement>(services.length, 0.1);

  return (
    <section className="py-24 bg-white" id="services">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <div ref={headingRef} className="lg:w-1/2">
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-[#1F1F1F] leading-none mb-6">
              EXPERT<br/>
              <span className="text-primary">ADVISORY</span>
            </h2>
            <p className="text-[#5F5F5F] text-xl font-light max-w-md">
              A comprehensive suite of bespoke services designed exclusively for the ultra-high-net-worth individual.
            </p>
          </div>
        </div>

        <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title} 
                className="group relative pt-8 border-t border-[#D8D8D8] hover:border-primary transition-colors duration-500 cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700 ease-out"></div>
                
                <div className="w-16 h-16 rounded-full bg-[#F7F5F2] flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-500">
                  <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-[#1F1F1F] mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-[#5F5F5F] font-light leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
