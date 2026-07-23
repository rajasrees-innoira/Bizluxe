// components/FloatingNavbar.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUp, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import logo from '@/assets/logo.webp';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { name: 'About', href: '/about' },
  { name: 'Collection', href: '/collections' },
  { name: 'Team', href: '/team' },
  { name: 'Our Partners', href: '/partners' },
  { name: 'Contact', href: '/contact' },
];

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home',
};

const BOTTOM_TRIGGER_OFFSET = 120; // px from the true bottom of the page
const BOTTOM_ARROW_OFFSET = 40; // switch X -> up-arrow this close to the end
const TOP_RESET_RATIO = 0.12; // auto-close near top
const SCROLL_CLOSE_THRESHOLD = 40; // px of scroll movement that dismisses an open popup

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [popupHeight, setPopupHeight] = useState(0);

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const scrollAtOpen = useRef(0);

  // -------------------------------------------------------------------------
  // Page label
  // -------------------------------------------------------------------------
  useEffect(() => {
    setCurrentPage(PAGE_LABELS[location] ?? location.replace('/', '').replace('-', ' ') ?? 'Home');
  }, [location]);

  // -------------------------------------------------------------------------
  // Scroll-driven open/close
  // -------------------------------------------------------------------------
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const distanceFromBottom = docHeight - scrollTop;
        const inBottomZone = distanceFromBottom <= BOTTOM_TRIGGER_OFFSET;

        setIsAtBottom(distanceFromBottom <= BOTTOM_ARROW_OFFSET);

        // Fire every time the bottom zone is freshly entered (not just once ever)
        if (inBottomZone && !hasAutoTriggered) {
          scrollAtOpen.current = window.scrollY;
          setIsOpen(true);
          setHasAutoTriggered(true);
        }

        // Re-arm the trigger as soon as the user leaves the zone, so the
        // next time they reach the bottom it fires again
        if (!inBottomZone && hasAutoTriggered) {
          setHasAutoTriggered(false);
        }

        // Auto-close if the popup is open and the user scrolls away from
        // where it opened, but never while still inside the bottom zone
        // (small scroll wobble at the bottom shouldn't dismiss it)
        if (
          isOpen &&
          !inBottomZone &&
          Math.abs(scrollTop - scrollAtOpen.current) > SCROLL_CLOSE_THRESHOLD
        ) {
          setIsOpen(false);
        }

        if (scrollTop <= window.innerHeight * TOP_RESET_RATIO && isOpen) {
          setIsOpen(false);
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAutoTriggered, isOpen]);

  // -------------------------------------------------------------------------
  // Measure popup height (for positioning the bottom X/arrow button)
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (isOpen && popupRef.current) {
      const measure = () => setPopupHeight(popupRef.current?.offsetHeight ?? 0);
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(popupRef.current);
      return () => ro.disconnect();
    }
  }, [isOpen]);

  // -------------------------------------------------------------------------
  // Click outside to close
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        closePopup();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // -------------------------------------------------------------------------
  // ESC to close
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // -------------------------------------------------------------------------
  // Open / close handlers
  // -------------------------------------------------------------------------
  const openPopup = useCallback(() => {
    scrollAtOpen.current = window.scrollY;
    setIsOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => hamburgerRef.current?.focus());
  }, []);

  const handleBottomButtonClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      closePopup();
    } else {
      closePopup();
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      closePopup();
      const go = () => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      };
      if (location !== '/') {
        setLocation('/');
        setTimeout(go, 300);
      } else {
        setTimeout(go, 250);
      }
      return;
    }

    // Regular route link (e.g. /partners, /about) - use client-side routing
    // instead of a full page reload, and close the popup.
    e.preventDefault();
    closePopup();
    setLocation(href);
  };

  return (
    <>
      {/* -------------------------------------------------------------- */}
      {/* Top bar - transparent, centered brand name, CTA on the right   */}
      {/* -------------------------------------------------------------- */}
      <div className="absolute top-0 left-0 w-full z-40 pointer-events-none">
        <div
          className="container mx-auto px-6 md:px-12 flex items-center justify-between"
          style={{ paddingTop: 'max(1.5rem, env(safe-area-inset-top))' }}
        >
          {/* Spacer to balance the CTA on the right, keeps brand name truly centered */}
          <div className="hidden sm:block w-[140px] shrink-0" />

         <Link
  href="/"
  className="pointer-events-auto absolute left-1/2 -translate-x-1/2 font-heading font-extrabold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-lg sm:text-2xl md:text-4xl text-[#FFFFFF]"
>
  BizLuxe<span className="text-primary">.</span>
</Link>

<Button
  className="pointer-events-auto ml-auto bg-[#1F1F1F] text-white hover:bg-primary rounded-full px-3 py-2 text-[11px] sm:px-6 sm:py-5 md:px-8 md:py-6 sm:text-sm md:text-base font-semibold shadow-warm hover:-translate-y-0.5 transition-all duration-300"
  onClick={(e) => handleNavClick(e as any, '#consultation')}
>
  Get a Quote
</Button>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Compact floating bar                                          */}
      {/* -------------------------------------------------------------- */}
      <motion.div
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-auto"
        style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
        animate={{
          opacity: isOpen ? 0 : 1,
          y: isOpen ? 16 : 0,
          scale: isOpen ? 0.96 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
  className="flex items-center gap-2.4 rounded-full bg-[#1F1F1F]/95 backdrop-blur-xl border border-white/10 shadow-warm w-[92vw] max-w-[330px] pl-4 pr-4 sm:pl-8 sm:pr-8 py-2"
  style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
>
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Bizluxe home">
            <img src={logo} alt="Bizluxe" className="h-12 w-auto object-contain brightness-0 invert" />
          </Link>

          {/* Current page label */}
          <span className="flex-1 text-center font-heading text-xl font-semibold tracking-[0.15em] uppercase text-white select-none whitespace-nowrap">
            {currentPage}
          </span>

          {/* Hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={openPopup}
            aria-expanded={isOpen}
            aria-controls="floating-nav-popup"
            aria-label="Open menu"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <span className="flex flex-col items-center justify-center gap-[4px]">
              <span className="block w-3.5 h-[1.5px] bg-white rounded-full" />
              <span className="block w-3.5 h-[1.5px] bg-white rounded-full" />
            </span>
          </button>
        </div>
      </motion.div>

      {/* -------------------------------------------------------------- */}
      {/* Backdrop + Popup                                              */}
      {/* -------------------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-[#1F1F1F]/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />

            {/* Popup panel */}
            <motion.div
              id="floating-nav-popup"
              ref={popupRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-[90%] md:w-[480px] h-auto max-h-[80vh] overflow-hidden rounded-[40px] bg-[#1F1F1F]/95 backdrop-blur-2xl border border-white/10 shadow-2xl"
              initial={{ y: '20%', opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: '15%', opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col items-center px-10 py-12 md:px-14 md:py-14">
                {/* Eyebrow */}
                <p className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-4 self-start">Menu</p>

                {/* Nav links */}
                <nav className="w-full flex flex-col gap-1 mb-10">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.05, duration: 0.4, ease: 'easeOut' }}
                      className="group flex items-center justify-between py-2.5 font-heading font-bold uppercase text-2xl md:text-3xl tracking-tight text-white transition-opacity duration-300 hover:opacity-60"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-500 ease-out group-hover:w-full" />
                      </span>
                      <ArrowUpRight
                        size={20}
                        className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </motion.a>
                  ))}
                </nav>

                {/* CTA */}
                <Button
                  className="w-full h-14 rounded-full bg-primary hover:bg-[#A87235] text-white text-base font-bold shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                  onClick={(e) => handleNavClick(e as any, '#consultation')}
                >
                  Get a Quote
                  <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </motion.div>

            {/* Bottom X / up-arrow - sits below the popup, centered on the page */}
            <motion.button
              type="button"
              onClick={handleBottomButtonClick}
              aria-label={isAtBottom ? 'Back to top' : 'Close menu'}
              className="fixed z-50 left-1/2 -translate-x-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-[#1F1F1F] text-white border border-white/15 shadow-warm hover:bg-primary transition-colors duration-300"
              style={{ top: `calc(50% + ${popupHeight / 2}px + 20px)` }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isAtBottom ? (
                  <motion.span
                    key="up"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ArrowUp size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="x"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.25 }}
                  >
                    <X size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}