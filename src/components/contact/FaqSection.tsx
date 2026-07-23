import React, { useLayoutEffect, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useGsap } from '../../hooks/useGsap';

const FAQS = [
  {
    q: 'How quickly will I hear back after submitting an inquiry?',
    a: 'Our advisory team personally reviews every inquiry and typically responds within 60 minutes during business hours, and first thing the next morning otherwise.',
  },
  {
    q: 'Do you work with international buyers?',
    a: 'Yes - a significant share of our clientele purchases remotely. We offer virtual tours, video walkthroughs, and full remote transaction support with vetted legal partners.',
  },
  {
    q: 'Can you help me sell or list a property confidentially?',
    a: 'Absolutely. We offer fully discreet, off-market listing services for clients who prefer not to have their property publicly marketed.',
  },
  {
    q: 'Is there a fee for an initial consultation?',
    a: 'No - your first consultation with a senior advisor is complimentary, with no obligation.',
  },
  {
    q: 'Which areas of Dubai do you specialise in?',
    a: 'We focus on the ultra-luxury segment across Palm Jumeirah, Emirates Hills, Downtown Dubai, Dubai Marina, and Jumeirah Bay Island.',
  },
];

export function FaqSection() {
  const { gsap } = useGsap();
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(listRef.current?.children ?? []),
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 85%', end: 'top 50%', scrub: 1 },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#F7F5F2]" id="faq">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div>
            <p className="text-primary font-medium tracking-[0.3em] uppercase mb-4 text-sm">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1F1F1F] leading-[1.05]">
              Common
              <br />
              Questions
            </h2>
            <p className="mt-6 text-[#5F5F5F] font-light leading-relaxed max-w-xs">
              Can't find what you're looking for? Reach out directly - we're happy to help.
            </p>
          </div>

          <div ref={listRef} className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${i}`}
                  className="border-b border-[#D8D8D8]/70 last:border-0"
                >
                  <AccordionTrigger className="text-left text-lg md:text-xl font-heading font-semibold text-[#1F1F1F] hover:no-underline hover:text-primary py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#5F5F5F] font-light leading-relaxed text-base pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}