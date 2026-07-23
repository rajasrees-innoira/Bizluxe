import { useEffect, useRef, RefObject } from 'react';

type AnimationType = 'fade-up' | 'mask-reveal' | 'scale-in' | 'blur-to-sharp';

interface UseScrollAnimationProps {
  type?: AnimationType;
  threshold?: number;
  staggerDelay?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>({
  type = 'fade-up',
  threshold = 0.15,
  staggerDelay = 0,
  rootMargin = '0px',
  once = true,
}: UseScrollAnimationProps = {}): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Add base classes
    element.classList.add('animate-on-scroll', type);
    if (staggerDelay > 0) {
      element.style.transitionDelay = `${staggerDelay}s`;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          element.classList.remove('is-visible');
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Fallback: if the element is already visible at mount time
    // (above the fold, or the observer's first tick got missed),
    // reveal it immediately instead of waiting forever.
    const rect = element.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isAlreadyVisible) {
      element.classList.add('is-visible');
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [type, threshold, staggerDelay, rootMargin, once]);

  return ref;
}

export function useStaggeredAnimation<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  baseDelay: number = 0.15,
  options: Omit<UseScrollAnimationProps, 'staggerDelay'> = {}
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    children.forEach((child, index) => {
      child.classList.add('animate-on-scroll', options.type || 'fade-up');
      child.style.transitionDelay = `${index * baseDelay}s`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => {
            child.classList.add('is-visible');
          });
          if (options.once !== false) {
            observer.unobserve(container);
          }
        } else if (options.once === false) {
          children.forEach((child) => {
            child.classList.remove('is-visible');
          });
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, [itemCount, baseDelay, options.once, options.rootMargin, options.threshold, options.type]);

  return containerRef;
}
