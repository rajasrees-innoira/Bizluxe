import React, { useLayoutEffect, useRef } from 'react';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { useGsap } from '../../hooks/useGsap';
import { getBreakpoint } from '../../hooks/useScrollAnimations';
import { TEAM_MEMBERS } from './teamData';

const STEP_VH = 100; // scroll distance dedicated to EACH member's step, in vh units

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function TeamSection() {
  const { gsap } = useGsap();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
      const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[];
      const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];
      const count = TEAM_MEMBERS.length;

      // ---- Rest state: only member 0 visible ----
      gsap.set(images, { autoAlpha: 0, scale: 1.05 });
      gsap.set(contents, { autoAlpha: 0, y: 30 });
      gsap.set(images[0], { autoAlpha: 1, scale: 1 });
      gsap.set(contents[0], { autoAlpha: 1, y: 0 });
      gsap.set(dots[0], { backgroundColor: 'rgba(31,31,31,0.9)', width: '2.5rem' });

      const bp = getBreakpoint();
      const scale = bp === 'mobile' ? 0.6 : bp === 'tablet' ? 0.8 : 1;
      const stepDistance = window.innerHeight * (STEP_VH / 100) * scale;
      const totalDistance = stepDistance * (count - 1); // N-1 transitions between N members

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalDistance}`,
          scrub: 0.6,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Only after this whole sequence completes does the pin release
          // and the page continues scrolling into whatever comes next
          // (Footer). Snapping keeps every stop landing cleanly on a member.
          snap: {
            snapTo: 1 / (count - 1),
            duration: 0.35,
            ease: 'power1.inOut',
          },
        },
        defaults: { ease: 'power2.inOut' },
      });

      // Each transition (0→1, 1→2, ... ) gets an EQUAL, fixed slice of the
      // timeline - purely scroll-driven, no timers. Both directions use the
      // same "fade up" motion: the OUTGOING member fades out while rising
      // (moving up and disappearing), and the INCOMING member fades in
      // while rising into place (starting lower, moving up as it appears).
      // The image-left/image-right layout still alternates per member
      // (see the JSX below) for visual variety, but the transition motion
      // itself is consistently vertical.
      TEAM_MEMBERS.forEach((_, i) => {
        if (i === 0) return;

        const prevImage = images[i - 1];
        const prevContent = contents[i - 1];
        const currImage = images[i];
        const currContent = contents[i];
        const label = `step${i}`;

        tl.addLabel(label);

        // Outgoing - fades up and disappears.
        tl.to(prevImage, { autoAlpha: 0, y: -40, scale: 0.96, duration: 1 }, label);
        tl.to(prevContent, { autoAlpha: 0, y: -40, duration: 0.9 }, label);

        // Incoming - starts lower, fades up and appears.
        tl.fromTo(
          currImage,
          { autoAlpha: 0, y: 40, scale: 1.05 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1 },
          `${label}+=0.1`,
        );
        tl.fromTo(
          currContent,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          `${label}+=0.25`,
        );

        tl.to(dots[i - 1], { backgroundColor: 'rgba(31,31,31,0.15)', width: '2rem' }, label);
        tl.to(dots[i], { backgroundColor: 'rgba(31,31,31,0.9)', width: '2.5rem' }, label);
      });
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#F7F5F2]" id="team">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden flex flex-col">
        {/* Static heading - always visible, not part of the per-member animation */}
        <div className="pt-24 md:pt-20 pb-6 md:pb-8 text-center px-6 shrink-0">
          <p className="text-primary font-medium tracking-[0.3em] uppercase mb-3 text-xs md:text-sm">
            The People Behind BizLuxe
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1F1F1F] leading-[1.05]">
            Meet The Team
          </h2>
        </div>

        {/* Stage - one member locked in view at a time */}
        <div className="flex-1 flex items-center overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
           <div className="relative w-full max-w-5xl mx-auto h-[600px] sm:h-[540px] md:h-[440px]">
              {TEAM_MEMBERS.map((member, i) => {
                const reversed = i % 2 !== 0;
                return (
                  <div
                    key={member.id}
                    className={`absolute inset-0 flex flex-col ${
                      reversed ? 'md:flex-row-reverse' : 'md:flex-row'
                    } items-center gap-8 md:gap-14`}
                  >
                    {/* Image / placeholder */}
                    <div
                      ref={(el) => {
                        imageRefs.current[i] = el;
                      }}
                      className="w-full md:w-[42%] shrink-0"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <div className="relative aspect-[4/5] max-h-[230px] sm:max-h-[280px] md:max-h-[800px] mx-auto rounded-[32px] md:rounded-[36px] overflow-hidden shadow-[0_30px_80px_-25px_rgba(31,31,31,0.3)] bg-[#1F1F1F]">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="w-full h-full object-fill" />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#2A2A2A] to-[#141211]">
                            <span className="font-heading text-5xl md:text-6xl font-bold text-primary/70">
                              {getInitials(member.name)}
                            </span>
                            <span className="mt-3 text-white/25 text-[10px] uppercase tracking-[0.3em]">
                              Add Photo
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      ref={(el) => {
                        contentRefs.current[i] = el;
                      }}
                      className={`w-full md:w-[58%] text-center ${
                        reversed ? 'md:text-right' : 'md:text-left'
                      }`}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <p className="text-primary font-semibold tracking-[0.25em] uppercase text-xs md:text-sm mb-3">
                        {member.role}
                      </p>
                      <h3 className="text-3xl md:text-5xl font-heading font-bold text-[#1F1F1F] mb-4 leading-tight">
                        {member.name}
                      </h3>
                      <p
                        className={`text-[#5F5F5F] font-light leading-relaxed max-w-md mb-6 mx-auto ${
                          reversed ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'
                        }`}
                      >
                        {member.bio}
                      </p>
                      <a
                        href={member.href}
                        target={member.href?.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className={`group inline-flex items-center gap-2 text-[#1F1F1F] font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                          reversed ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-sm group-hover:shadow-warm">
                          <Linkedin
                            size={15}
                            className="text-[#1F1F1F] group-hover:text-white transition-colors duration-300"
                          />
                        </span>
                        <span className="relative">
                          View Profile
                          <span className="absolute left-0 -bottom-1 w-full h-px bg-[#1F1F1F] scale-x-100 origin-left transition-colors duration-300 group-hover:bg-primary" />
                        </span>
                        <ArrowUpRight
                          size={15}
                          className="text-[#1F1F1F] transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress dots - one per member, clearly shows position in the sequence */}
        <div className="flex gap-2 justify-center pb-8 md:pb-10 shrink-0">
          {TEAM_MEMBERS.map((m, i) => (
            <span
              key={m.id}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="h-[3px] rounded-full bg-[#1F1F1F]/15"
              style={{ width: '2rem' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}