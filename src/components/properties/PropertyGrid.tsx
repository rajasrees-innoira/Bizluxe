import React, { useEffect, useRef, useState } from 'react';
import type { Property } from '../../data/Propertydata';
import { PropertyCard } from './PropertyCard';
import { Loader2 } from 'lucide-react';

const PAGE_SIZE = 6;

interface PropertyGridProps {
  properties: Property[];
  mapOpen: boolean;
  activeId: number | null;
  onHover: (id: number | null) => void;
  isLiked: (id: number) => boolean;
  onToggleLike: (id: number) => void;
  onQuickView: (property: Property) => void;
  onOpenGallery: (property: Property) => void;
}

// sessionStorage key - visibleCount is stashed here per filtered-list
// signature so it survives a remount of <PropertyGrid> (e.g. the parent
// re-rendering / the grid briefly leaving and re-entering the DOM as you
// scroll), instead of silently resetting back to PAGE_SIZE. sessionStorage
// (not localStorage) means it clears itself once the browser tab closes,
// so it never "sticks" across a real new visit.
const STORAGE_KEY = 'bizluxe_property_grid_visible_count';

function readStoredState(): { signature: string; count: number } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoredState(signature: string, count: number) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ signature, count }));
  } catch {
    /* sessionStorage unavailable (e.g. private mode) - safe to ignore */
  }
}

export function PropertyGrid({
  properties,
  mapOpen,
  activeId,
  onHover,
  isLiked,
  onToggleLike,
  onQuickView,
  onOpenGallery,
}: PropertyGridProps) {
  // Lightweight signature of the CURRENT filtered list (the ids in it,
  // joined) instead of relying on array identity. Parent components often
  // recompute `properties` into a brand-new array reference on every
  // render even when the actual contents haven't changed - keying off the
  // real ids means we only treat it as "a new list" when the properties
  // actually differ (a new filter/search was applied), not on every render.
  const listSignature = properties.map((p) => p.id).join(',');

  // Initialize from sessionStorage on first mount (or immediately after a
  // remount) so a page that was scrolled away from and back to - or a
  // component that got torn down and rebuilt by a parent re-render - picks
  // up exactly where the user left off instead of snapping back to
  // PAGE_SIZE.
  const [visibleCount, setVisibleCount] = useState<number>(() => {
    const stored = readStoredState();
    if (stored && stored.signature === listSignature) {
      return Math.min(Math.max(stored.count, PAGE_SIZE), properties.length || PAGE_SIZE);
    }
    return Math.min(PAGE_SIZE, properties.length || PAGE_SIZE);
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Only reset to PAGE_SIZE when the actual set of properties changes (a
  // new filter/search was applied) - never merely because this component
  // instance is fresh.
  const prevSignatureRef = useRef(listSignature);
  useEffect(() => {
    if (prevSignatureRef.current !== listSignature) {
      prevSignatureRef.current = listSignature;
      setVisibleCount(Math.min(PAGE_SIZE, properties.length));
      writeStoredState(listSignature, Math.min(PAGE_SIZE, properties.length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listSignature]);

  // Keep sessionStorage in sync whenever visibleCount changes (e.g. after
  // clicking Load More), so the persisted value is always current.
  useEffect(() => {
    writeStoredState(listSignature, visibleCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount, listSignature]);

  const visible = properties.slice(0, visibleCount);
  const hasMore = visibleCount < properties.length;

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    // Small delay so the button state change is visible and the newly
    // revealed cards' whileInView animation has a clean beat to trigger on.
    // Reveals EVERYTHING remaining in one go, rather than paginating again -
    // once you've asked to see more, all the hidden properties show up.
    window.setTimeout(() => {
      setVisibleCount(properties.length);
      setIsLoadingMore(false);
    }, 400);
  };

  return (
    <div>
      <div
        className={`grid gap-5 md:gap-7 ${
          mapOpen ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {visible.map((p) => (
          <PropertyCard
            key={p.id}
            property={p}
            active={activeId === p.id}
            isLiked={isLiked(p.id)}
            onToggleLike={onToggleLike}
            onHover={onHover}
            onQuickView={onQuickView}
            onOpenGallery={onOpenGallery}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10 md:mt-14">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="relative flex items-center justify-center gap-2 min-w-[220px] rounded-full border border-[#D8D8D8] px-8 py-4 text-sm font-semibold text-[#1F1F1F] hover:border-primary hover:text-primary transition-colors disabled:opacity-70 disabled:cursor-wait"
          >
            {isLoadingMore ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Loading...
              </>
            ) : (
              `Load More Properties (${properties.length - visibleCount} more)`
            )}
          </button>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Informative section below Load More                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-16 md:mt-24 border-t border-[#D8D8D8]/60 pt-12 md:pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 text-center sm:text-left">
          <div>
            <p className="text-primary font-heading font-bold text-3xl mb-2">500+</p>
            <p className="text-[#5F5F5F] text-sm leading-relaxed">
              Verified luxury listings across Dubai's most sought-after communities.
            </p>
          </div>
          <div>
            <p className="text-primary font-heading font-bold text-3xl mb-2">24/7</p>
            <p className="text-[#5F5F5F] text-sm leading-relaxed">
              Concierge support from senior advisors - every inquiry gets a personal response.
            </p>
          </div>
          <div>
            <p className="text-primary font-heading font-bold text-3xl mb-2">100%</p>
            <p className="text-[#5F5F5F] text-sm leading-relaxed">
              Discreet transactions, from private viewings to final signature.
            </p>
          </div>
        </div>

        <div className="mt-10 bg-[#F7F5F2] border border-[#D8D8D8]/60 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#1F1F1F] mb-1">
              Can't find what you're looking for?
            </h3>
            <p className="text-[#5F5F5F] text-sm">
              Our advisors have access to off-market listings that never appear here.
            </p>
          </div>
          <a
            href="#consultation"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 rounded-full bg-primary hover:bg-[#A87235] text-white text-sm font-semibold px-6 py-3 transition-colors"
          >
            Talk to an Advisor
          </a>
        </div>
      </div>
    </div>
  );
}