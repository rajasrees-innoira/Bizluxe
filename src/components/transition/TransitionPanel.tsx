import React from 'react';
import { motion } from 'framer-motion';
import { EASE, COVER_DURATION, REVEAL_DURATION, PANEL_SHADES } from './transitionConfig';

interface TransitionPanelProps {
  index: number;
  total: number;
  phase: 'covering' | 'revealing';
  delay: number;
  onComplete?: () => void;
}

export function TransitionPanel({ index, total, phase, delay, onComplete }: TransitionPanelProps) {
  const shade = PANEL_SHADES[index % PANEL_SHADES.length];
  const isCovering = phase === 'covering';

  return (
    <motion.div
      className="relative h-full"
      style={{
        width: `${100 / total}%`,
        background: `linear-gradient(180deg, ${shade} 0%, #1F1F1F 55%, #17130F 100%)`,
        transformOrigin: isCovering ? 'bottom' : 'top',
        willChange: 'transform, opacity, filter',
      }}
      initial={
        isCovering
          ? { scaleY: 0, opacity: 0.85, filter: 'blur(6px)' }
          : { scaleY: 1, opacity: 1, filter: 'blur(0px)' }
      }
      animate={
        isCovering
          ? { scaleY: 1, opacity: 1, filter: 'blur(0px)' }
          : { scaleY: 0, opacity: 0.92, filter: 'blur(3px)' }
      }
      transition={{
        duration: isCovering ? COVER_DURATION : REVEAL_DURATION,
        delay,
        ease: EASE,
      }}
      onAnimationComplete={onComplete}
    />
  );
}