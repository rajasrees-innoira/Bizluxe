import React, { useEffect, useMemo, useRef } from 'react';
import { PANEL_COUNT, MAX_STAGGER, getRandomDelays } from './transitionConfig';
import { TransitionPanel } from './TransitionPanel';

interface TransitionOverlayProps {
  phase: 'idle' | 'covering' | 'revealing';
  onCoverComplete: () => void;
  onRevealComplete: () => void;
}

export function TransitionOverlay({ phase, onCoverComplete, onRevealComplete }: TransitionOverlayProps) {
  // Fresh randomized stagger pattern every time we start covering, so no
  // two transitions ever look identical.
  const delays = useMemo(() => getRandomDelays(PANEL_COUNT, MAX_STAGGER), [phase]);
  const completedRef = useRef(0);

  useEffect(() => {
    completedRef.current = 0;
  }, [phase]);

  if (phase === 'idle') return null;

  const handlePanelComplete = () => {
    completedRef.current += 1;
    if (completedRef.current >= PANEL_COUNT) {
      if (phase === 'covering') onCoverComplete();
      if (phase === 'revealing') onRevealComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex pointer-events-none" aria-hidden="true">
      {Array.from({ length: PANEL_COUNT }).map((_, i) => (
        <TransitionPanel
          key={`${phase}-${i}`}
          index={i}
          total={PANEL_COUNT}
          phase={phase}
          delay={delays[i]}
          onComplete={handlePanelComplete}
        />
      ))}
    </div>
  );
}