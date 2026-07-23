import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// IMPORTANT: this must run synchronously at module-evaluation time, NOT
// inside a React useEffect. Section components create their ScrollTriggers
// inside useLayoutEffect, and React always runs useLayoutEffect BEFORE any
// useEffect in the same component. If plugin registration were deferred to
// a useEffect (as it was before), gsap.timeline({ scrollTrigger: {...} })
// would run first, see an unregistered "scrollTrigger" property, and just
// silently ignore it - no pin, no scrub, no error. That was the bug.
gsap.registerPlugin(ScrollTrigger);

/**
 * Thin hook so components can grab gsap + ScrollTrigger without repeating
 * the import path. Registration itself already happened above, at import
 * time, so by the time any component's useLayoutEffect runs, the plugin
 * is guaranteed to be ready.
 */
export function useGsap() {
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };