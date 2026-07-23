import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { TransitionOverlay } from './TransitionOverlay';
import { HOLD_DURATION, REVEAL_DURATION } from './transitionConfig';

type Phase = 'idle' | 'covering' | 'revealing';

interface TransitionContextValue {
  isAnimating: boolean;
  navigate: (path: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('usePageTransition must be used within <PageTransition>');
  return ctx;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [phase, setPhase] = useState<Phase>('idle');
  const pendingPath = useRef<string | null>(null);
  const prevLocation = useRef(location);
  const selfInitiated = useRef(false);

  const navigate = useCallback(
    (path: string) => {
      if (phase !== 'idle') return;
      if (path === location) return;
      selfInitiated.current = true;
      pendingPath.current = path;
      setPhase('covering');
    },
    [phase, location],
  );

  const handleCoverComplete = useCallback(() => {
    // Fully covered - safe to swap the route and snap scroll to the top of
    // the new page's hero before anything is revealed.
    if (pendingPath.current) {
      setLocation(pendingPath.current);
      pendingPath.current = null;
    }
    window.scrollTo(0, 0);
    window.setTimeout(() => setPhase('revealing'), HOLD_DURATION);
  }, [setLocation]);

  const handleRevealComplete = useCallback(() => {
    setPhase('idle');
  }, []);

  // Catch navigation we didn't initiate ourselves (browser back/forward,
  // or any stray setLocation elsewhere) and give it the same treatment.
  useEffect(() => {
    if (location === prevLocation.current) return;
    prevLocation.current = location;

    if (selfInitiated.current) {
      selfInitiated.current = false;
      return;
    }

    window.scrollTo(0, 0);
    if (phase === 'idle') {
      setPhase('covering');
      window.setTimeout(() => setPhase('revealing'), REVEAL_DURATION * 1000 + HOLD_DURATION);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <TransitionContext.Provider value={{ isAnimating: phase !== 'idle', navigate }}>
      <div style={{ pointerEvents: phase !== 'idle' ? 'none' : 'auto' }}>{children}</div>
      <TransitionOverlay
        phase={phase}
        onCoverComplete={handleCoverComplete}
        onRevealComplete={handleRevealComplete}
      />
    </TransitionContext.Provider>
  );
}