import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import logo from '@/assets/logo.webp';

function DiamondMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-primary shrink-0">
      <rect
        x="7"
        y="0.7"
        width="8.9"
        height="8.9"
        transform="rotate(45 7 0.7)"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

const EXPLORE_LINKS = [
  { name: 'About', href: '/about' },
  { name: 'Properties', href: '/properties' },
  { name: 'Team', href: '/team' },
  { name: 'Our Partners', href: '/partners' },
  { name: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="relative bg-[#1F1F1F] pt-20 md:pt-28 pb-8 overflow-hidden">
      {/* Ambient glow, consistent with Categories/PartnersHero */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 15% 0%, hsl(29 53% 36% / 0.14), transparent 60%), radial-gradient(ellipse 50% 40% at 90% 100%, hsl(29 53% 36% / 0.10), transparent 65%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* ---------------------------------------------------------- */}
        {/* Middle: brand + link columns                               */}
        {/* ---------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 py-16 md:py-20">
          {/* Column 1: Brand */}
          <div className="lg:pr-8 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <img src={logo} alt="Bizluxe" className="h-9 w-auto object-contain brightness-0 invert" />
              <span className="font-heading font-extrabold uppercase tracking-[0.1em] text-xl text-white">
                Bizluxe<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-white/50 font-light leading-relaxed mb-8 max-w-xs">
              Curators of the most extraordinary addresses in Dubai - where architectural mastery meets
              unrivaled luxury.
            </p>
            <div className="flex gap-3">
              {[Instagram, Linkedin, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              {/* <DiamondMark /> */}
              <h4 className="text-white font-heading font-bold text-sm tracking-[0.2em] uppercase">Explore</h4>
            </div>
            <ul className="space-y-3.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-white/55 hover:text-white transition-colors duration-300"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-primary transition-all duration-500 ease-out group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              {/* <DiamondMark /> */}
              <h4 className="text-white font-heading font-bold text-sm tracking-[0.2em] uppercase">Contact</h4>
            </div>
            <ul className="space-y-3.5 text-white/55 font-light">
              <li>1301 Aspin Commercial Tower</li>
              <li>Shaikh Zayed Road</li>
              <li>Dubai, UAE</li>
              <li className="pt-3">
                <a href="tel:+971 58 108 3300" className="text-white/85 font-normal hover:text-primary transition-colors">
                  
                  +971 58 108 3300
                </a>
              </li>
              <li>
                <a href="mailto:inquiries@bizluxeproperties.ae" className="text-white/85 font-normal hover:text-primary transition-colors">
                  inquiries@bizluxeproperties.ae
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              {/* <DiamondMark /> */}
              <h4 className="text-white font-heading font-bold text-sm tracking-[0.2em] uppercase">The Briefing</h4>
            </div>
            <p className="text-white/50 font-light leading-relaxed mb-6">
              Subscribe for exclusive off-market listings and deep market insights.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-transparent border-b border-white/20 pb-4 pr-8 text-white placeholder:text-white/35 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-0 top-0 bottom-4 text-white/70 hover:text-primary transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Bottom bar                                                  */}
        {/* ---------------------------------------------------------- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-white/35 tracking-wide">
          <p>© {new Date().getFullYear()} Bizluxe. All Rights Reserved. Dubai, UAE.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}