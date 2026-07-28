import React, { useState } from 'react';
import { SlidersHorizontal, Map, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import type { Filters } from '../../data/Propertydata';
// import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FilterToolbarProps {
  mapOpen: boolean;
  onToggleMap: () => void;
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onResetFilters: () => void;
  likedCount: number;
  recentCount: number;
}

interface AdvancedFilters {
  amenities: string[];
  developer: string;
  completion: string; // 'Ready' | 'Off Plan' | ''
  facing: string;
}

// interface FilterToolbarProps {
//   mapOpen: boolean;
//   onToggleMap: () => void;
//   filters: Filters;
//   onFilterChange: (key: keyof Filters, value: string) => void;
//   onResetFilters: () => void;
// }

const AMENITIES = ['Pool', 'Gym', 'Smart Home', 'Parking'];
const DEVELOPERS = ['EMAAR', 'DAMAC', 'SOBHA', 'NAKHEEL', 'OMNIYAT'];
const FACINGS = ['North', 'South', 'East', 'West', 'Sea View'];

const FILTERS: { id: keyof Filters; label: string; options: string[] }[] = [
  { id: 'location', label: 'Location', options: ['Palm Jumeirah', 'Emirates Hills', 'Dubai Marina', 'Downtown', 'Business Bay'] },
  { id: 'price', label: 'Price', options: ['Under 5M', '5M - 15M', '15M - 40M', '40M+'] },
  { id: 'bedrooms', label: 'Bedrooms', options: ['Studio', '1+', '2+', '3+', '4+', '5+'] },
  { id: 'bathrooms', label: 'Bathrooms', options: ['1+', '2+', '3+', '4+'] },
  { id: 'area', label: 'Area', options: ['Under 2,000 sqft', '2,000 – 5,000 sqft', '5,000 – 10,000 sqft', '10,000+ sqft'] },
  { id: 'propertyType', label: 'Property Type', options: ['Villa', 'Penthouse', 'Apartment', 'Farmhouse', 'Guest House', 'Commercial'] },
];

export function FilterToolbar({
  mapOpen,
  onToggleMap,
  filters,
  onFilterChange,
  onResetFilters,
  likedCount,
  recentCount,
}: FilterToolbarProps) {
  const [showMore, setShowMore] = useState(false);
  const hasActiveFilters = Object.values(filters).some((v, i) => v && Object.keys(filters)[i] !== 'dealType');
const [advancedOpen, setAdvancedOpen] = useState(false);
const [advanced, setAdvanced] = useState<AdvancedFilters>({
  amenities: [], developer: '', completion: '', facing: '',
});

const toggleAmenity = (a: string) =>
  setAdvanced((prev) => ({
    ...prev,
    amenities: prev.amenities.includes(a)
      ? prev.amenities.filter((x) => x !== a)
      : [...prev.amenities, a],
  }));
  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-[#D8D8D8]/60">
      <div className="container mx-auto px-4 md:px-12 py-3 md:py-4">
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto snap-x [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
          {FILTERS.map((f) => (
            <Select
              key={`${f.id}-${filters[f.id] || 'none'}`}
              value={filters[f.id] || undefined}
              onValueChange={(v) => onFilterChange(f.id, v)}
            >
              <SelectTrigger className="h-11 w-auto min-w-[120px] shrink-0 rounded-full border-[#D8D8D8] px-4 text-xs md:text-sm">
                <SelectValue placeholder={f.label} />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {f.options.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

         

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="shrink-0 h-11 flex items-center gap-2 rounded-full px-4 text-xs md:text-sm font-medium text-primary hover:underline"
            >
              Reset All
            </button>
          )}

          <div className="flex-1" />
          <button
  onClick={() => onFilterChange('view', filters.view === 'liked' ? 'all' : 'liked')}
  className={`shrink-0 h-11 flex items-center gap-1.5 rounded-full px-4 text-xs md:text-sm font-medium border transition-colors ${
    filters.view === 'liked' ? 'bg-primary text-white border-primary' : 'border-[#D8D8D8] text-[#1F1F1F] hover:border-primary'
  }`}
>
  Liked ({likedCount})
</button>
<button
  onClick={() => onFilterChange('view', filters.view === 'recent' ? 'all' : 'recent')}
  className={`shrink-0 h-11 flex items-center gap-1.5 rounded-full px-4 text-xs md:text-sm font-medium border transition-colors ${
    filters.view === 'recent' ? 'bg-primary text-white border-primary' : 'border-[#D8D8D8] text-[#1F1F1F] hover:border-primary'
  }`}
>
  Recently Viewed ({recentCount})
</button>

          <Button
            onClick={onToggleMap}
            variant={mapOpen ? 'default' : 'outline'}
            className={`shrink-0 h-11 rounded-full px-4 md:px-5 text-xs md:text-sm gap-2 ${
              mapOpen ? 'bg-primary text-white border-primary' : 'border-[#D8D8D8] text-[#1F1F1F]'
            }`}
          >
            <Map size={14} />
            Map
          </Button>
          {advancedOpen && (
  <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setAdvancedOpen(false)}>
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full md:max-w-lg bg-white rounded-t-[28px] md:rounded-[28px] p-6 md:p-8 max-h-[85vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-xl text-[#1F1F1F]">More Filters</h3>
        <button onClick={() => setAdvancedOpen(false)} aria-label="Close filters">
          <X size={20} />
        </button>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-[#1F1F1F] mb-3">Amenities</p>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((a) => (
            <button
              key={a}
              onClick={() => toggleAmenity(a)}
              className={`rounded-full px-4 py-2 text-xs font-medium border transition-colors ${
                advanced.amenities.includes(a)
                  ? 'bg-primary text-white border-primary'
                  : 'border-[#D8D8D8] text-[#1F1F1F] hover:border-primary'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-[#1F1F1F] mb-3">Developer</p>
        <div className="flex flex-wrap gap-2">
          {DEVELOPERS.map((d) => (
            <button
              key={d}
              onClick={() => setAdvanced((p) => ({ ...p, developer: p.developer === d ? '' : d }))}
              className={`rounded-full px-4 py-2 text-xs font-medium border transition-colors ${
                advanced.developer === d ? 'bg-primary text-white border-primary' : 'border-[#D8D8D8] text-[#1F1F1F] hover:border-primary'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-[#1F1F1F] mb-3">Completion Status</p>
        <div className="flex gap-2">
          {['Ready', 'Off Plan'].map((c) => (
            <button
              key={c}
              onClick={() => setAdvanced((p) => ({ ...p, completion: p.completion === c ? '' : c }))}
              className={`rounded-full px-4 py-2 text-xs font-medium border transition-colors ${
                advanced.completion === c ? 'bg-primary text-white border-primary' : 'border-[#D8D8D8] text-[#1F1F1F] hover:border-primary'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold text-[#1F1F1F] mb-3">Property Facing</p>
        <div className="flex flex-wrap gap-2">
          {FACINGS.map((f) => (
            <button
              key={f}
              onClick={() => setAdvanced((p) => ({ ...p, facing: p.facing === f ? '' : f }))}
              className={`rounded-full px-4 py-2 text-xs font-medium border transition-colors ${
                advanced.facing === f ? 'bg-primary text-white border-primary' : 'border-[#D8D8D8] text-[#1F1F1F] hover:border-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setAdvanced({ amenities: [], developer: '', completion: '', facing: '' })}
          className="flex-1 rounded-full border border-[#D8D8D8] py-3 text-sm font-semibold text-[#1F1F1F]"
        >
          Reset
        </button>
        <button
          onClick={() => setAdvancedOpen(false)}
          className="flex-1 rounded-full bg-primary text-white py-3 text-sm font-semibold"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}