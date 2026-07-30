import React from 'react';

export function PropertyInfoSection() {
  return (
    <div className="mt-16 md:mt-24 border-t border-[#D8D8D8]/60 pt-12 md:pt-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 text-center sm:text-left">
        <div>
          <p className="text-primary font-heading font-bold text-3xl mb-2">500+</p>
          <p className="text-[#5F5F5F] text-sm leading-relaxed">
            Verified luxury listings across Dubai's most sought-after communities.
          </p>
        </div>
        <div>
          <p className="text-primary font-heading font-bold text-3xl mb-2">24/7</p>
          <p className="text-[#5F5F5F] text-sm leading-relaxed">
            Concierge support from senior advisors - every inquiry gets a personal response.
          </p>
        </div>
        <div>
          <p className="text-primary font-heading font-bold text-3xl mb-2">100%</p>
          <p className="text-[#5F5F5F] text-sm leading-relaxed">
            Discreet transactions, from private viewings to final signature.
          </p>
        </div>
      </div>

      <div className="mt-10 bg-[#F7F5F2] border border-[#D8D8D8]/60 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <h3 className="font-heading font-bold text-lg text-[#1F1F1F] mb-1">
            Can't find what you're looking for?
          </h3>
          <p className="text-[#5F5F5F] text-sm">
            Our advisors have access to off-market listings that never appear here.
          </p>
        </div>
        <a
          href="#consultation"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="shrink-0 rounded-full bg-primary hover:bg-[#A87235] text-white text-sm font-semibold px-6 py-3 transition-colors"
        >
          Talk to an Advisor
        </a>
      </div>
    </div>
  );
}