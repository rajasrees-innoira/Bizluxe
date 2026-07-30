import React, { useMemo, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PropertiesHero } from '@/components/properties/PropertiesHero';
import { FeaturedCollections } from '@/components/properties/FeaturedCollections';
import { FilterToolbar } from '@/components/properties/FilterToolbar';
import { PropertyGrid } from '@/components/properties/PropertyGrid';
import { PropertyMap } from '@/components/properties/PropertyMap';
import { QuickViewModal } from '@/components/properties/QuickViewModal';
import { FullscreenGallery } from '@/components/properties/FullscreenGallery';
import { useLikedProperties } from '@/hooks/useLikedProperties';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { PROPERTIES, DEFAULT_FILTERS, filterProperties, type Filters, type Property } from '@/data/Propertydata';
import { PropertyInfoSection } from '@/components/properties/PropertyInfoSection';
export default function Properties() {
  const [mapOpen, setMapOpen] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);
  const [galleryProperty, setGalleryProperty] = useState<Property | null>(null);

  const { liked, toggleLike, isLiked } = useLikedProperties();
  const { recent, markViewed } = useRecentlyViewed();

  const handleFilterChange = (key: keyof Filters, value: string) => {
  setSelectedPinId(null);
  setFilters((prev) => ({
    ...prev,
    [key]: key === 'view' ? value : prev[key] === value ? '' : value,
  }));
};

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSelectedPinId(null);
  };

  const filteredProperties = useMemo(
  () => filterProperties(PROPERTIES, filters, liked, recent),
  [filters, liked, recent],
);

  const visibleProperties = selectedPinId
    ? filteredProperties.filter((p) => p.id === selectedPinId)
    : filteredProperties;

  const handlePinClick = (id: number) => {
    setSelectedPinId((prev) => (prev === id ? null : id));
    setActiveId(id);
    // scroll matching card into view
    requestAnimationFrame(() => {
      document.getElementById(`property-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const openQuickView = (p: Property) => {
    setQuickViewProperty(p);
    markViewed(p.id);
  };

  const openGallery = (p: Property) => {
    setGalleryProperty(p);
    markViewed(p.id);
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-[#F7F5F2]">
      <Navbar />
      <PropertiesHero filters={filters} onFilterChange={handleFilterChange} />
      <FeaturedCollections />

      <FilterToolbar
        mapOpen={mapOpen}
        onToggleMap={() => setMapOpen((v) => !v)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        likedCount={liked.size}
        recentCount={recent.length}
      />

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 md:px-12">
          {selectedPinId && (
            <div className="flex items-center justify-between mb-6 bg-white border border-[#D8D8D8] rounded-2xl px-5 py-3">
              <p className="text-sm text-[#5F5F5F]">Showing 1 property selected on the map.</p>
              <button onClick={() => setSelectedPinId(null)} className="text-sm font-semibold text-primary hover:underline">
                Show all {filteredProperties.length}
              </button>
            </div>
          )}

          <div className={mapOpen ? 'grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-stretch' : ''}>
            <PropertyGrid
              properties={visibleProperties}
              mapOpen={mapOpen}
              activeId={activeId}
              onHover={setActiveId}
              isLiked={isLiked}
              onToggleLike={toggleLike}
              onQuickView={openQuickView}
              onOpenGallery={openGallery}
              showInfoSection={!mapOpen}

            />

            {mapOpen && (
              <div className="hidden lg:block h-full">
                <PropertyMap properties={filteredProperties} activeId={activeId} onSelect={handlePinClick} />
              </div>
            )}
          </div>

          {/* Mobile map toggle - since the map hides on mobile above */}
          <>
              <div className="lg:hidden mt-8">
                <PropertyMap properties={filteredProperties} activeId={activeId} onSelect={handlePinClick} />
              </div>
              <div className="lg:hidden">
                <PropertyInfoSection />
              </div>
            </>

          {visibleProperties.length === 0 && (
            <div className="text-center py-20 text-[#5F5F5F]">
              {filters.view === 'liked' && 'No liked properties yet.'}
              {filters.view === 'recent' && 'No recently viewed properties yet.'}
              {filters.view === 'all' && 'No properties match these filters. Try clearing one.'}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <QuickViewModal property={quickViewProperty} onClose={() => setQuickViewProperty(null)} />
      <FullscreenGallery property={galleryProperty} onClose={() => setGalleryProperty(null)} />
    </div>
  );
}