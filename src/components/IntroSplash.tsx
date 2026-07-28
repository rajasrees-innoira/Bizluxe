import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.webp';

// -----------------------------------------------------------------------------
// IntroSplash
//
// A one-time cinematic opening shown before the site is revealed:
//   1. "BizLuxe" wordmark falls / fades in with a scale-down settle
//   2. Logo image fades UP into place ABOVE the wordmark, entering only
//      after the wordmark has landed
//   3. Holds on screen for a beat
//   4. Panels wipe away to reveal the actual page underneath
//
// The overlay's solid background lives on the exit PANELS themselves (not
// on a parent wrapper that never fades) - once the panels animate away,
// there is nothing left painting over the page.
// -----------------------------------------------------------------------------

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const HOLD_MS = 2600; // how long everything sits on screen before exiting
const SESSION_KEY = 'bizluxe_intro_played';
const PANEL_COUNT = 10;

export function IntroSplash({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<'intro' | 'exiting' | 'done'>(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) {
      return 'done';
    }
    return 'intro';
  });

  useEffect(() => {
    if (phase !== 'intro') return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const holdTimer = window.setTimeout(() => {
      setPhase('exiting');
    }, HOLD_MS);

    return () => {
      window.clearTimeout(holdTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, [phase]);

  // Safety net: guarantee the overlay is gone (and scroll restored) even if
  // an animation callback doesn't fire for some reason.
  useEffect(() => {
    if (phase !== 'exiting') return;
    const failsafe = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      document.body.style.overflow = '';
      setPhase('done');
    }, 1400);
    return () => window.clearTimeout(failsafe);
  }, [phase]);

  if (phase === 'done') {
    return <>{children}</>;
  }

  return (
    <>
      {/* Real site renders underneath the whole time */}
      {children}

      <div className="fixed inset-0 z-[9999] pointer-events-none">
        {phase === 'intro' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0C0C0C]">
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 60% 50% at 50% 45%, hsl(29 53% 36% / 0.18), transparent 65%)',
              }}
            />

            <div className="relative flex flex-col items-center">
              {/* Soft ambient pulse behind everything */}
              <motion.div
                className="absolute -z-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-primary/10 blur-3xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.15, 1], opacity: [0, 0.8, 0.5] }}
                transition={{ duration: 1.6, delay: 0.9, ease: EASE }}
              />

              {/* Logo - sits ABOVE the wordmark, but only fades/floats up
                  into place AFTER the wordmark has landed (delay > title's
                  own animation duration) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
                className="mb-6"
              >
                <img
                  src={logo}
                  alt="Bizluxe"
                  className="h-16 sm:h-20 md:h-24 w-auto object-contain brightness-0 invert"
                />
              </motion.div>

              {/* Wordmark falls from above + fades in + settles */}
              <motion.h1
                initial={{ opacity: 0, y: -120, scale: 1.15, filter: 'blur(14px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, ease: EASE }}
                className="font-heading font-extrabold uppercase tracking-[-0.02em] text-[#F7F5F2] text-[15vw] sm:text-7xl md:text-8xl lg:text-9xl leading-none"
              >
                BizLuxe<span className="text-primary">.</span>
              </motion.h1>

              {/* Thin rule draws in beneath the wordmark */}
              <motion.span
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
                className="mt-6 h-px w-40 sm:w-56 origin-center bg-primary/60"
              />

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
                className="mt-6 text-white/50 text-xs sm:text-sm tracking-[0.35em] uppercase"
              >
                Homes Built To Be Remembered
              </motion.p>
            </div>
          </div>
        )}

        {/* Exit panel wipe. Panels carry the solid color themselves, so
            once they've scaled away nothing is left obscuring the page. */}
        {phase === 'exiting' && (
          <ExitCurtain
            onDone={() => {
              sessionStorage.setItem(SESSION_KEY, '1');
              document.body.style.overflow = '';
              setPhase('done');
            }}
          />
        )}
      </div>
    </>
  );
}

function ExitCurtain({ onDone }: { onDone: () => void }) {
  return (
    <div className="absolute inset-0 flex">
      {Array.from({ length: PANEL_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full"
          style={{
            width: `${100 / PANEL_COUNT}%`,
            background: '#0C0C0C',
            transformOrigin: 'bottom',
          }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{
            duration: 0.65,
            delay: i * 0.045,
            ease: EASE,
          }}
          onAnimationComplete={i === PANEL_COUNT - 1 ? onDone : undefined}
        />
      ))}
    </div>
  );
}