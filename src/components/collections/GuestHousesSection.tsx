import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useGsap } from '../../hooks/useGsap';
import { getBreakpoint } from '../../hooks/useScrollAnimations';
import marinaNight from '@/assets/portfolio-penthouse.jpg';
import minimalistInterior from '@/assets/minimalist-interior.jpg';
import penthouseInterior from '@/assets/penthouse-interior.jpg';
import mansionExterior from '@/assets/mansion-exterior.jpg';

interface GuestHouse {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
}

const GUEST_HOUSES: GuestHouse[] = [
  { id: 1, title: 'The Marina Guest House', location: 'Dubai Marina', price: 'AED 3,200,000', image: marinaNight },
  { id: 2, title: 'Minimalist Garden House', location: 'Al Barari', price: 'AED 4,750,000', image: minimalistInterior },
  { id: 3, title: 'Penthouse Guest Suite', location: 'Downtown Dubai', price: 'AED 5,900,000', image: penthouseInterior },
  { id: 4, title: 'Estate Guest Villa', location: 'Emirates Hills', price: 'AED 6,400,000', image: mansionExterior },
];

// Scroll distance dedicated to EACH house's full cycle:
// grow small -> big, show info card, hide info card, shrink big -> small
// (the last step of a cycle overlaps with the next house's grow-in).
const STEP_VH = 130;

// How small the "resting" thumbnail is, as a fraction of full size.
const SMALL_SCALE = 0.4;
const SMALL_RADIUS = 40; // px, rounded corners while small
const FULL_RADIUS = 0; // px, corners once fullscreen

// Fixed timeline-units per house. Every house - including the last -
// gets EXACTLY this much of the timeline, so the snap logic's assumption
// of uniform per-house slices (perHouse = 1 / count) actually holds true.
// This is what fixes the black gap that used to appear on the last house:
// previously the last house's slice was shorter (no shrink-back phase),
// so snapping to `restPoint * perHouse` landed mid-tween instead of on
// the "fully grown + card visible" resting frame.
const SLICE = 1.25;

export function GuestHousesSection() {
  const { gsap } = useGsap();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
      const infos = infoRefs.current.filter(Boolean) as HTMLDivElement[];
      const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];
      const count = GUEST_HOUSES.length;

      // ---- Rest state ----
      // House 0 starts already small-but-visible (a centered thumbnail),
      // everything else fully hidden. Info cards all start hidden.
      gsap.set(images, { autoAlpha: 0, scale: SMALL_SCALE, borderRadius: SMALL_RADIUS });
      gsap.set(infos, { autoAlpha: 0, y: 24 });
      gsap.set(images[0], { autoAlpha: 1 });
      gsap.set(dots[0], { backgroundColor: 'rgba(255,255,255,0.9)', width: '2.5rem' });

      const bp = getBreakpoint();
      const scale = bp === 'mobile' ? 0.75 : bp === 'tablet' ? 0.9 : 1;
      const stepDistance = window.innerHeight * (STEP_VH / 100) * scale;
      const totalDistance = stepDistance * count;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalDistance}`,
          scrub: 0.6,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // snap temporarily disabled to isolate the auto-scroll issue
          // snap: {
          //   snapTo: (value: number) => {
          //     const perHouse = 1 / count;
          //     const restPoint = 0.55;
          //     const houseIndex = Math.round((value - restPoint * perHouse) / perHouse);
          //     const clamped = Math.min(count - 1, Math.max(0, houseIndex));
          //     return clamped * perHouse + restPoint * perHouse;
          //   },
          //   duration: 0.4,
          //   ease: 'power1.inOut',
          // },
        },
        defaults: { ease: 'power2.inOut' },
      });

      GUEST_HOUSES.forEach((_, i) => {
        // Fixed absolute start position per house - NOT a running label
        // whose position depends on how many tweens the previous house
        // happened to add. This guarantees every house (including the
        // last one, which has no shrink-back phase) occupies exactly
        // `SLICE` units, keeping spacing perfectly uniform.
        const start = i * SLICE;
        const label = `house${i}`;
        tl.addLabel(label, start);

        const image = images[i];
        const info = infos[i];

         // ---- Phase 0: reveal as a small, fully-visible thumbnail ----
        // Instant (zero-duration) so opacity is already 1 the moment this
        // house's slot begins - matching house 0's pre-set state exactly.
        // Only scale/radius animate from here on, so every house grows
        // the same clean "small -> big" way under direct scroll control,
        // with no fade mixed into the grow tween.
        tl.set(image, { autoAlpha: 1 }, start);

        // ---- Phase 1: grow from small thumbnail to fullscreen ----
        tl.to(
          image,
          {
            scale: 1,
            borderRadius: FULL_RADIUS,
            duration: 0.55,
          },
          start,
        );

        // ---- Phase 2: once fully grown, reveal the info card ----
        tl.fromTo(
          info,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.25 },
          start + 0.55,
        );

        // Progress dot lights up as soon as this house starts growing.
        if (i > 0) {
          tl.to(dots[i - 1], { backgroundColor: 'rgba(255,255,255,0.25)', width: '2rem' }, start);
        }
        tl.to(dots[i], { backgroundColor: 'rgba(255,255,255,0.9)', width: '2.5rem' }, start);

         // ---- Phase 3: hide the info card, then shrink back to small ----
        // Timed to START exactly when the NEXT house begins growing
        // (start + SLICE), not at a fixed early offset. This means the
        // card stays fully visible for the entire "resting" pause between
        // houses, and only starts hiding once the user actively scrolls
        // forward into the next house - it will never appear to vanish
        // while the scroll is stopped.
        // (skipped after the last house - it just stays big at rest,
        // but it still reserves the same SLICE width as every other house
        // so the timeline stays evenly spaced overall)
if (i < count - 1) {
          const nextStart = start + SLICE;
          // Hide/shrink now finishes exactly AT nextStart (not starting
          // there), so there's zero overlap with the next house's grow
          // tween - each image gets a clean, uncontested window to scale
          // up. The 0.95/1.15 offsets sit comfortably after the 0.55 rest
          // point, so the card still stays visible through any scroll
          // pause, it just no longer races the next image's entrance.
          tl.to(info, { autoAlpha: 0, y: -14, duration: 0.2 }, start + 0.95);
          tl.to(
            image,
            {
              autoAlpha: 0,
              scale: SMALL_SCALE,
              borderRadius: SMALL_RADIUS,
              duration: 0.25,
            },
            nextStart - 0.25,
          );
        }
      });

      // Safety net: explicitly pin the timeline's total duration to
      // count * SLICE so totalDistance (computed above from STEP_VH)
      // and the timeline's own length can never silently drift apart.
      tl.duration(count * SLICE);
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#141211]" id="guest-houses">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Heading - static, always visible, never part of the scroll timeline */}
        <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 z-20 text-center px-6">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
            Private Retreats
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">Guest Houses</h2>
        </div>

        {/* Growing/shrinking images - each sits centered, small at rest,
            fullscreen once grown. transformOrigin center keeps the growth
            centered instead of anchored to a corner. */}
        {GUEST_HOUSES.map((house, i) => (
          <div
            key={house.id}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="absolute inset-0 overflow-hidden"
            style={{
              willChange: 'transform, opacity',
              transformOrigin: 'center center',
              zIndex: i,
            }}
          >
            <img src={house.image} alt={house.title} className="w-full h-full object-cover" />
            {/* Gentle scrim so the corner card and heading always stay legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/25" />
          </div>
        ))}

        {/* Info card - only appears once its image has fully grown */}
        {GUEST_HOUSES.map((house, i) => (
          <div
            key={`info-${house.id}`}
            ref={(el) => {
              infoRefs.current[i] = el;
            }}
            className="absolute inset-x-0 bottom-0 md:inset-x-auto md:right-0 md:bottom-0 z-20 w-full md:w-[560px] lg:w-[620px]"
            style={{ willChange: 'transform, opacity' }}
          >
<div className="w-full bg-[#000000]/80 backdrop-blur-2xl border border-[#C9A46A]/40 rounded-tl-md p-5 md:p-6 pl-12 md:pl-20 flex flex-col justify-between">
              <p className="text-[#c7b4a1] font-semibold tracking-[0.25em] uppercase text-xs mb-2">
                {house.location}
              </p>
              <h3 className="text-lg md:text-2xl font-heading font-bold text-[#c7b4a1] mb-4 leading-tight">
                {house.title}
              </h3>
              <div className="flex items-center justify-between gap-3 border-t border-white/15 pt-4 mb-2">
                <span className="text-[#c7b4a1] font-heading text-lg md:text-xl font-bold">{house.price}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <button
                  onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md rounded-full px-4 py-2.5 text-primary text-xs font-semibold transition-colors duration-300 hover:-translate-y-0.5 shadow-lg"
                >
                  Request Private Viewing
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button className="group inline-flex items-center gap-1 text-white hover:text-white text-xs font-medium transition-colors duration-300">
                  View Details
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Progress dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {GUEST_HOUSES.map((house, i) => (
            <span
              key={house.id}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="h-[3px] rounded-full bg-white/25"
              style={{ width: '2rem' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}