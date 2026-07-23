// ExclusiveCollection.tsx
import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useListProperties } from '../hooks/useApi';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import mansionExterior from '@/assets/mansion-exterior.jpg';
import penthouseInterior from '@/assets/penthouse-interior.jpg';
import beachVilla from '@/assets/beach-villa.jpg';

// -----------------------------------------------------------------------------
// Content - unchanged data, unchanged images
// -----------------------------------------------------------------------------

const fallbackProperties = [
  {
    id: 101,
    title: 'The Waterway Mansion',
    priceDisplay: 'AED 165,000,000',
    description:
      'An architectural marvel nestled on the Trunk of Palm Jumeirah. Timeless elegance, unmatched privacy, and panoramic views of the Arabian Gulf.',
    location: 'Palm Jumeirah',
    tag: 'Palm Jumeirah · Dubai',
    imageUrl: mansionExterior,
  },
  {
    id: 102,
    title: 'Burj Khalifa Penthouse',
    priceDisplay: 'AED 95,000,000',
    description:
      'Occupy the sky in this one-of-a-kind penthouse. Floor-to-ceiling views of the Burj Khalifa and the iconic Dubai skyline.',
    location: 'Downtown Dubai',
    tag: 'Downtown Dubai · 124th Floor',
    imageUrl: penthouseInterior,
  },
  {
    id: 103,
    title: 'Jumeirah Bay Island Estate',
    priceDisplay: 'AED 120,000,000',
    description:
      'An exclusive island sanctuary with private beach access, lush landscapes, and breathtaking views of the Dubai skyline.',
    location: 'Jumeirah Bay',
    tag: 'Jumeirah Bay · Island Estate',
    imageUrl: beachVilla,
  },
];

const toArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? value : []);

// -----------------------------------------------------------------------------
// Section
// -----------------------------------------------------------------------------

export function ExclusiveCollection() {
  const { data: apiProperties } = useListProperties({ category: 'mansion' });
  const properties =
    toArray<any>(apiProperties).length >= 3
      ? toArray<any>(apiProperties).slice(0, 3)
      : fallbackProperties;

  return (
  <section className="relative bg-white py-24 md:py-32" id="exclusive-collection">
    <div className="container mx-auto px-6 md:px-12">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <p className="text-primary font-medium tracking-[0.3em] uppercase mb-4 text-sm">
          Exclusive Collection
        </p>
        <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-[1.05]">
          <span className="text-[#1F1F1F]">THE EXCLUSIVE</span>
          <br />
          <span className="text-primary italic font-medium">COLLECTION</span>
        </h2>
        <p className="text-[#5F5F5F] text-lg font-light">
          Discover Dubai's most exceptional residences, curated for discerning buyers seeking
          architectural excellence, privacy, and timeless luxury.
        </p>
      </div>
    </div>

    <div className="flex flex-col gap-16 md:gap-24">
      {properties.map((prop, index) => (
        <PropertyReveal key={prop.id} property={prop} index={index} />
      ))}
    </div>
  </section>
);
}

// -----------------------------------------------------------------------------
// One editorial reveal.
//
// IMPORTANT - this is NOT pinned. There is no position: sticky and no
// scroll-jacking. The page scrolls completely naturally the entire time.
// The image itself sits in normal document flow; only its `scale` transform
// changes continuously as it travels through the viewport, which is what
// creates the "shrinking" effect while scrolling stays fluid.
//
// `progress` is derived purely from this element's position relative to the
// viewport (useScroll + offset), so it is a pure function of scroll position:
// - scrolling down increases it, scrolling up decreases it, with no
//   direction-specific logic and no "play once" triggers (no useInView,
//   no whileInView). That's what makes reverse-scroll automatically replay
//   the exact opposite sequence, and lets the whole thing replay every time
//   the user re-enters the section - there is no state to reset.
// - offset ['start 0.9', 'start 0.3']: progress 0 when the top of this block
//   is still near the bottom of the viewport (just entering), progress 1
//   once it has travelled up to ~30% from the top (settled, still fully
//   visible). Everything below is keyed off that single 0→1 value.
// -----------------------------------------------------------------------------

function PropertyReveal({ property, index }: { property: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const overlapRight = index % 2 === 0;

  // Scroll measured across the ENTIRE tall wrapper (default offset:
  // ['start end', 'end start']) - this is what makes 0→1 span the full
  // pin duration instead of just the moment the element enters/exits.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 34,
    mass: 0.4,
  });

  // ---- Image: small → full size while pinned, over the first 60% ----
  // (bumped up so the starting thumbnail reads bigger, and the settled
  // image is noticeably larger/zoomed-in rather than landing at 1:1)
  const imageScale = useTransform(progress, [0, 0.6], [0.78, 1]);
  const imageRadius = useTransform(progress, [0, 0.6], [48, 24]);

  // ---- Card: fades up only once the image has finished expanding ----
  const cardOpacity = useTransform(progress, [0.4, 0.55], [0, 1]);
  const cardY = useTransform(progress, [0.6, 0.85], [80, 0]);
 const cardScale = useTransform(progress, [0.6, 0.85], [0.98, 1]);

  const stagger = (start: number) => ({
    opacity: useTransform(progress, [start, start + 0.05], [0, 1]),
    y: useTransform(progress, [start, start + 0.05], [14, 0]),
  });
  const locStagger = stagger(0.62);
  const titleStagger = stagger(0.68);
  const descStagger = stagger(0.74);
  const priceStagger = stagger(0.8);
  const btnStagger = stagger(0.86);
  const linkStagger = stagger(0.9);

  const staticFallback = useReducedMotion();

  return (
    // Tall wrapper gives scroll room for the pin. 300vh = plenty of scroll
    // distance for the image-grow + card-reveal sequence before release.
    <div ref={ref} className={cn('relative', staticFallback ? '' : 'h-[300vh]')}>
      {/* Sticky inner container is what actually stays fixed in the
          viewport while the wrapper above scrolls underneath it. */}
      <div
        className={cn(
          'container mx-auto px-6 md:px-12',
          staticFallback ? '' : 'sticky top-0 h-screen flex items-center overflow-hidden',
        )}
      >
        <div className="relative mx-auto w-full" style={{ maxWidth: 1280 }}>
          {/* ---------------- Hero image ---------------- */}
          <motion.div
            className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden"
            style={
              staticFallback
                ? { borderRadius: 32 }
                : {
                    scale: imageScale,
                    borderRadius: imageRadius as any,
                    transformOrigin: 'center center',
                    willChange: 'transform',
                  }
            }
          >
            <img
              src={property.imageUrl}
              alt={property.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-primary font-bold text-sm md:text-base tracking-wide shadow-lg">
              {property.priceDisplay}
            </div>

            {/* ---------------- Info card ---------------- */}
            {/* Nested inside the image container so it is clipped/bounded
                by the image's own edges - it can never overflow past the
                image's right or bottom border. */}
           <motion.div
              className={cn(
                'absolute inset-x-0 bottom-0 md:inset-x-auto md:right-0 md:bottom-0',
                'w-full md:w-[560px] lg:w-[620px]',
              )}
              style={
                staticFallback
                  ? { opacity: 1 }
                  : {
                      opacity: cardOpacity,
                      y: cardY,
                      scale: cardScale,
                      willChange: 'transform, opacity',
                    }
              }
            >
              <div className="w-full bg-[#000000]/80 backdrop-blur-2xl border border-[#C9A46A]/40 rounded-tl-md p-5 md:p-6 flex flex-col justify-between">
                {/* <motion.p
                style={staticFallback ? undefined : { opacity: locStagger.opacity, y: locStagger.y }}
                className="text-primary font-semibold tracking-[0.15em] uppercase text-[10px] mb-2"
              >
                {property.tag || property.location}
              </motion.p> */}

              <motion.h3
                style={staticFallback ? undefined : { opacity: titleStagger.opacity, y: titleStagger.y }}
                className="text-lg md:text-2xl font-heading font-bold text-[#c7b4a1] mb-2 leading-tight"
              >
                {property.title}
              </motion.h3>

              <motion.p
                style={staticFallback ? undefined : { opacity: descStagger.opacity, y: descStagger.y }}
               className="text-[#c7b4a1] text-sm md:text-[12px] font-light leading-relaxed mb-4 line-clamp-2"
              >
                {property.description}
              </motion.p>

              <div className="flex flex-wrap items-center justify-end px-4 gap-5">
                <motion.button
                  style={staticFallback ? undefined : { opacity: btnStagger.opacity, y: btnStagger.y }}
                  onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-primary rounded-full px-4 py-2.5 text-xs font-semibold transition-colors duration-300 hover:-translate-y-0.5 shadow-lg"
                >
                  Request Private Viewing
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
                <motion.button
                  style={staticFallback ? undefined : { opacity: linkStagger.opacity, y: linkStagger.y }}
                  className="group inline-flex items-center gap-1 text-white hover:text-white text-xs font-medium transition-colors duration-300"
                >
                  View Details
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}