import React from 'react';
import { ArrowRight, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="bg-[#1F1F1F] pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-12">
          
          {/* Column 1: Brand */}
          <div className="lg:pr-8">
            <h2 className="font-heading font-bold text-4xl tracking-tight text-white mb-6">
              Bizluxe<span className="text-primary">.</span>
            </h2>
            <p className="text-white/60 font-light leading-relaxed mb-6">
              Curators of the most extraordinary addresses in Dubai. Where architectural mastery meets unrivaled luxury.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          {/* <div>
            <h4 className="text-white font-heading font-bold text-lg mb-4">Explore</h4>
            <ul className="space-y-3">
              <li><a href="#buy" className="text-white/60 hover:text-primary transition-colors">Buy Property</a></li>
              <li><a href="#rent" className="text-white/60 hover:text-primary transition-colors">Rent Property</a></li>
              <li><a href="#sell" className="text-white/60 hover:text-primary transition-colors">Sell Property</a></li>
              <li><a href="#communities" className="text-white/60 hover:text-primary transition-colors">Communities</a></li>
              <li><a href="#developers" className="text-white/60 hover:text-primary transition-colors">Developers</a></li>
            </ul>
          </div> */}

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-white/60">
              <li>Level 12, ICD Brookfield Place</li>
              <li>Dubai International Financial Centre</li>
              <li>Dubai, UAE</li>
              <li className="pt-4"><a href="tel:+97140000000" className="hover:text-primary transition-colors">+971 4 000 0000</a></li>
              <li><a href="mailto:private@Bizluxe.com" className="hover:text-primary transition-colors">private@Bizluxe.com</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-4">The Briefing</h4>
            <p className="text-white/60 mb-4">
              Subscribe for exclusive off-market listings and deep market insights.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border-b border-white/20 pb-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 bottom-4 text-white hover:text-primary transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Bizluxe. All Rights Reserved. Dubai, UAE.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
