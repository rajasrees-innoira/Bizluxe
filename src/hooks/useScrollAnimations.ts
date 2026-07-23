/**
 * Shared helpers for building GSAP ScrollTrigger driven, pinned,
 * scrub-based multi-step sequences (Farmhouses + Guest Houses sections).
 *
 * These are intentionally small & framework-agnostic so each section can
 * build its own gsap.timeline() and simply ask this module "how much
 * scroll distance should step N take on this screen size?".
 */

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export function getBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 640) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Returns the total pinned scroll distance (in px) for a sequence made of
 * `itemCount` steps. Smaller screens get a shorter scroll journey so the
 * pin doesn't feel like it drags on forever on mobile.
 */
export function getPinnedScrollDistance(itemCount: number, perItemVh = 100): number {
  if (typeof window === 'undefined') return itemCount * perItemVh * 10;

  const bp = getBreakpoint();
  const scale = bp === 'mobile' ? 0.6 : bp === 'tablet' ? 0.8 : 1;
  const vh = window.innerHeight;

  return itemCount * (perItemVh / 100) * vh * scale;
}

/** Clamp helper used by several scrub-driven progress calculations. */
export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Given a global 0→1 progress across the whole pinned timeline and the
 * number of steps, returns which step index is active and that step's
 * own local 0→1 progress. Works identically forwards and backwards,
 * which is what keeps reverse-scroll perfectly symmetrical.
 */
export function getStepProgress(globalProgress: number, stepCount: number) {
  const scaled = clamp(globalProgress) * stepCount;
  const index = Math.min(stepCount - 1, Math.floor(scaled));
  const local = clamp(scaled - index);
  return { index, local };
}