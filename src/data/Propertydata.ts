import mansionExterior from '@/assets/mansion-exterior.jpg';
import beachVilla from '@/assets/beach-villa.jpg';
import penthouseInterior from '@/assets/penthouse-interior.jpg';
import marinaNight from '@/assets/marina-night.jpg';
import resortVilla from '@/assets/resort-villa.jpg';
import minimalistInterior from '@/assets/minimalist-interior.jpg';
import emiratesHills from '@/assets/emirates-hills.jpg';
import palmJumeirah from '@/assets/palm-jumeirah.jpg';

// New real listing photography
import popular1 from '@/assets/imgi_4_popular-1-2.jpg';
import popular2 from '@/assets/imgi_10_popular-1-3.jpg';
import popular3 from '@/assets/imgi_11_popular-1-4.jpg';
import popular4 from '@/assets/imgi_13_popular-1-6.jpg';
import popular5 from '@/assets/imgi_12_popular-1-5.jpg';
import popular6 from '@/assets/imgi_14_popular-1-7.jpg';
import popular7 from '@/assets/imgi_15_popular-1-8.jpg';

import pv1 from '@/assets/imgi_27_property-values-1-1.jpg';
import pv2 from '@/assets/imgi_50_property-values-2-1.jpg';
import pv3 from '@/assets/imgi_51_property-values-2-2.jpg';
import pv4 from '@/assets/imgi_52_property-values-2-3.jpg';
import pv5 from '@/assets/imgi_53_property-values-2-4.jpg';

import gal1 from '@/assets/imgi_20_gallery-1-1.jpg';
import gal2 from '@/assets/imgi_21_gallery-1-2.jpg';
import gal3 from '@/assets/imgi_22_gallery-1-3.jpg';
import gal4 from '@/assets/imgi_23_gallery-1-4.jpg';
import gal5 from '@/assets/imgi_24_gallery-1-5.jpg';

export type DealType = 'buy' | 'rent' | 'commercial';
export type PropertyStatus = 'Available' | 'Under Offer' | 'Sold' | 'New Launch';

export interface Property {
  id: number;
  title: string;
  location: string;
  priceValue: number;
  price: string;
  dealType: DealType;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  images: string[];
  badge?: string;
  status: PropertyStatus;
  featured: boolean;
  lat: number;
  lng: number;
}

// ---------------------------------------------------------------------------
// Real photography pool. Mixed in with the older stock set as filler so we
// never run out - but real photos are weighted first.
// ---------------------------------------------------------------------------
const REAL_POOL = [
  popular1, popular2, popular3, popular4, popular5, popular6, popular7,
  pv1, pv2, pv3, pv4, pv5,
  gal1, gal2, gal3, gal4, gal5,
];

const STOCK_POOL = [
  mansionExterior, beachVilla, penthouseInterior, marinaNight,
  resortVilla, minimalistInterior, emiratesHills, palmJumeirah,
];

/** Deterministic "random" shuffle seeded by property id - looks random,
 *  but stays stable across re-renders/filter changes instead of reshuffling
 *  every time the component re-mounts. */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Builds a 3–4 image gallery for a given property id, drawing mostly from
 *  the real photo pool and topping up with stock if needed. */
function buildGallery(id: number, count: 3 | 4 = 4): string[] {
  const shuffledReal = seededShuffle(REAL_POOL, id * 31 + 7);
  const shuffledStock = seededShuffle(STOCK_POOL, id * 17 + 3);
  const combined = [...shuffledReal, ...shuffledStock];
  return combined.slice(0, count);
}

// ---------------------------------------------------------------------------
// Properties - image/images now generated per-property instead of shared
// ---------------------------------------------------------------------------
const RAW_PROPERTIES: Omit<Property, 'image' | 'images'>[] = [
  { id: 1, title: 'The Waterway Mansion', location: 'Palm Jumeirah', priceValue: 165_000_000, price: 'AED 165,000,000', dealType: 'buy', propertyType: 'Villa', bedrooms: 6, bathrooms: 8, area: '14,500 sqft', badge: 'Exclusive', status: 'Available', featured: true, lat: 25.112, lng: 55.138 },
  { id: 2, title: 'Sky Residence 88', location: 'Downtown Dubai', priceValue: 12_500_000, price: 'AED 12,500,000', dealType: 'buy', propertyType: 'Penthouse', bedrooms: 3, bathrooms: 4, area: '3,200 sqft', status: 'Available', featured: false, lat: 25.197, lng: 55.274 },
  { id: 3, title: 'Marina Horizon', location: 'Dubai Marina', priceValue: 7_900_000, price: 'AED 7,900,000', dealType: 'buy', propertyType: 'Apartment', bedrooms: 2, bathrooms: 3, area: '2,100 sqft', status: 'Available', featured: false, lat: 25.079, lng: 55.140 },
  { id: 4, title: 'Golf Course Villa', location: 'Emirates Hills', priceValue: 38_000_000, price: 'AED 38,000,000', dealType: 'buy', propertyType: 'Villa', bedrooms: 7, bathrooms: 9, area: '22,000 sqft', badge: 'New', status: 'New Launch', featured: true, lat: 25.088, lng: 55.166 },
  { id: 5, title: 'Beachfront Reserve', location: 'Jumeirah Bay', priceValue: 55_000_000, price: 'AED 55,000,000', dealType: 'buy', propertyType: 'Villa', bedrooms: 5, bathrooms: 6, area: '9,800 sqft', status: 'Available', featured: false, lat: 25.228, lng: 55.144 },
  { id: 6, title: 'The Minimalist Loft', location: 'City Walk', priceValue: 5_400_000, price: 'AED 5,400,000', dealType: 'rent', propertyType: 'Apartment', bedrooms: 2, bathrooms: 2, area: '1,650 sqft', status: 'Available', featured: false, lat: 25.203, lng: 55.253 },
  { id: 7, title: 'Bvlgari Resort Villa', location: 'Jumeirah Bay', priceValue: 85_000_000, price: 'AED 85,000,000', dealType: 'buy', propertyType: 'Villa', bedrooms: 6, bathrooms: 7, area: '13,000 sqft', badge: 'Exclusive', status: 'Under Offer', featured: true, lat: 25.226, lng: 55.146 },
  { id: 8, title: 'Palm Frond Estate', location: 'Palm Jumeirah', priceValue: 45_000_000, price: 'AED 45,000,000', dealType: 'buy', propertyType: 'Villa', bedrooms: 5, bathrooms: 6, area: '8,900 sqft', status: 'Available', featured: false, lat: 25.111, lng: 55.139 },
  { id: 9, title: 'Marina Rental Suite', location: 'Dubai Marina', priceValue: 320_000, price: 'AED 320,000 / yr', dealType: 'rent', propertyType: 'Apartment', bedrooms: 1, bathrooms: 2, area: '1,050 sqft', status: 'Available', featured: false, lat: 25.076, lng: 55.132 },
  { id: 10, title: 'Downtown Office Suite', location: 'Business Bay', priceValue: 4_200_000, price: 'AED 4,200,000', dealType: 'commercial', propertyType: 'Commercial', bedrooms: 0, bathrooms: 2, area: '2,800 sqft', status: 'Available', featured: false, lat: 25.186, lng: 55.263 },
  { id: 11, title: 'Emirates Hills Guest Villa', location: 'Emirates Hills', priceValue: 6_400_000, price: 'AED 6,400,000', dealType: 'buy', propertyType: 'Guest House', bedrooms: 3, bathrooms: 3, area: '3,600 sqft', status: 'Available', featured: false, lat: 25.091, lng: 55.163 },
  { id: 12, title: 'Vineyard Retreat Farmhouse', location: 'Al Barari', priceValue: 48_000_000, price: 'AED 48,000,000', dealType: 'buy', propertyType: 'Farmhouse', bedrooms: 6, bathrooms: 7, area: '18,000 sqft', status: 'Available', featured: false, lat: 25.107, lng: 55.303 },
  { id: 13, title: 'Business Bay Retail Unit', location: 'Business Bay', priceValue: 180_000, price: 'AED 180,000 / yr', dealType: 'rent', propertyType: 'Commercial', bedrooms: 0, bathrooms: 1, area: '950 sqft', status: 'Available', featured: false, lat: 25.183, lng: 55.266 },
  { id: 14, title: 'Palm Signature Penthouse', location: 'Palm Jumeirah', priceValue: 29_000_000, price: 'AED 29,000,000', dealType: 'buy', propertyType: 'Penthouse', bedrooms: 4, bathrooms: 5, area: '6,200 sqft', badge: 'New', status: 'New Launch', featured: true, lat: 25.115, lng: 55.141 },
];
const PROPERTY_COVER_IMAGES: Record<number, string> = {
  1: palmJumeirah,
  2: marinaNight,
  3: popular3,
  4: emiratesHills,
  5: resortVilla,
  6: minimalistInterior,
  7: beachVilla,
  8: popular5,
  9: popular6,
  10: pv1,
  11: popular2,
  12: popular4,
  13: pv4,
  14: penthouseInterior,
};
export const PROPERTIES: Property[] = RAW_PROPERTIES.map((p) => {
  const gallery = buildGallery(p.id, 4);

  return {
    ...p,
    image: PROPERTY_COVER_IMAGES[p.id],
    images: gallery,
  };
});

export interface Filters {
  dealType: DealType;
  location: string;
  propertyType: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  view: 'all' | 'liked' | 'recent';
}

export const DEFAULT_FILTERS: Filters = {
  dealType: 'buy',
  location: '',
  propertyType: '',
  price: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  view: 'all',
};

const bedroomMin = (option: string): number => (option === 'Studio' ? 0 : parseInt(option, 10) || 0);

const priceRange = (option: string): [number, number] => {
  switch (option) {
    case 'Under 5M': return [0, 5_000_000];
    case '5M - 15M': return [5_000_000, 15_000_000];
    case '15M - 40M': return [15_000_000, 40_000_000];
    case '40M+': return [40_000_000, Infinity];
    default: return [0, Infinity];
  }
};

const areaMin = (option: string): { min: number; max: number } => {
  switch (option) {
    case 'Under 2,000 sqft': return { min: 0, max: 2000 };
    case '2,000 – 5,000 sqft': return { min: 2000, max: 5000 };
    case '5,000 – 10,000 sqft': return { min: 5000, max: 10000 };
    case '10,000+ sqft': return { min: 10000, max: Infinity };
    default: return { min: 0, max: Infinity };
  }
};

export function filterProperties(
  list: Property[],
  filters: Filters,
  likedIds: Set<number> = new Set(),
  recentIds: number[] = [],
): Property[] {
  if (filters.view === 'liked') {
    return list.filter((p) => likedIds.has(p.id));
  }
  if (filters.view === 'recent') {
    return recentIds
      .map((id) => list.find((p) => p.id === id))
      .filter((p): p is Property => !!p);
  }

  const [min, max] = filters.price ? priceRange(filters.price) : [0, Infinity];
  const minBeds = filters.bedrooms ? bedroomMin(filters.bedrooms) : 0;
  const { min: areaLo, max: areaHi } = filters.area ? areaMin(filters.area) : { min: 0, max: Infinity };

  return list.filter((p) => {
    if (p.dealType !== filters.dealType) return false;
    if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.propertyType && p.propertyType !== filters.propertyType) return false;
    if (p.priceValue < min || p.priceValue > max) return false;
    if (p.bedrooms < minBeds) return false;
    if (filters.bathrooms) {
      const minBaths = parseInt(filters.bathrooms, 10) || 0;
      if (p.bathrooms < minBaths) return false;
    }
    if (filters.area) {
      const areaNum = parseInt(p.area.replace(/[^0-9]/g, ''), 10) || 0;
      if (areaNum < areaLo || areaNum >= areaHi) return false;
    }
    return true;
  });
}