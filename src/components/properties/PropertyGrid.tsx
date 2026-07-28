import React, { useEffect, useState } from 'react';
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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

useEffect(() => {
  setVisibleCount(PAGE_SIZE);
}, [properties]);

  const visible = properties.slice(0, visibleCount);
  const hasMore = visibleCount < properties.length;

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    // Small delay so the button state change is visible and the new cards'
    // whileInView animation has a clean beat to trigger on — this is what
    // stops the "instant snap + flash" of content appearing mid-frame.
    window.setTimeout(() => {
      setVisibleCount((v) => v + PAGE_SIZE);
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