import { useCallback, useMemo, useRef } from 'react';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Property } from '../../data/Propertydata';

interface PropertyMapProps {
  properties: Property[];
  activeId: number | null;
  onSelect: (id: number) => void;
}

const KEY = 'liked-properties';

function read(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'number') : [];
  } catch {
    return [];
  }
}

export function useLikedProperties() {
  const [liked, setLiked] = useState<number[]>(() => read());

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(liked));
    } catch {
      // ignore storage errors (e.g. private browsing / quota exceeded)
    }
  }, [liked]);

  const toggleLike = useCallback((id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const isLiked = useCallback((id: number) => liked.includes(id), [liked]);

  // Only create a new Set when the underlying array actually changes
  const likedSet = useMemo(() => new Set(liked), [liked]);

  return { liked: likedSet, toggleLike, isLiked };
}

function houseIcon(active: boolean) {
  const glyphSize = active ? 15 : 22;
  const badgeSize = glyphSize + 8;
  const bg = active ? '#1F1F1F' : '#c9a56ad5';
  const fg = active ? '#B27F3F' : '#1F1F1F';
  const border = active ? '#B27F3F' : 'rgba(0,0,0,.08)';

  return L.divIcon({
    className: '',
    html: `<div style="
      width:${badgeSize}px;
      height:${badgeSize}px;
      border-radius:9999px;
      background:${bg};
      border:1.5px solid ${border};
      box-shadow:0 2px 8px rgba(0,0,0,.3);
      display:flex;
      align-items:center;
      justify-content:center;
      transition:all .2s ease;
    ">
      <svg width="${glyphSize}" height="${glyphSize}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 11.5L12 4L20 11.5" stroke="${fg}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 10.5V19.5C6 19.7761 6.22386 20 6.5 20H9.5C9.77614 20 10 19.7761 10 19.5V15.5C10 15.2239 10.2239 15 10.5 15H13.5C13.7761 15 14 15.2239 14 15.5V19.5C14 19.7761 14.2239 20 14.5 20H17.5C17.7761 20 18 19.7761 18 19.5V10.5" stroke="${fg}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>`,
    iconAnchor: [badgeSize / 2, badgeSize / 2],
  });
}

function MapController({
  properties,
  activeId,
  onVisibleChange,
}: {
  properties: Property[];
  activeId: number | null;
  onVisibleChange: (count: number) => void;
}) {
  const map = useMap();
  const idsSignature = properties.map((p) => p.id).join(',');
  const prevSignatureRef = useRef<string | null>(null);

  const recomputeVisible = useCallback(() => {
    const bounds = map.getBounds();
    const count = properties.filter((p) => bounds.contains([p.lat, p.lng])).length;
    onVisibleChange(count);
  }, [map, properties, onVisibleChange]);

  useEffect(() => {
    if (properties.length === 0) {
      prevSignatureRef.current = idsSignature;
      onVisibleChange(0);
      return;
    }
    if (prevSignatureRef.current === idsSignature) return; // no real change, skip re-fit
    prevSignatureRef.current = idsSignature;

    const bounds = L.latLngBounds(properties.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    // Bounds may not update visible count synchronously with fitBounds animation end,
    // so recompute after the map settles.
    map.once('moveend', recomputeVisible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsSignature]);

  useEffect(() => {
    if (activeId == null) return;
    const active = properties.find((p) => p.id === activeId);
    if (active) map.panTo([active.lat, active.lng], { animate: true });
  }, [activeId, properties, map]);

  useMapEvents({
    moveend: recomputeVisible,
    zoomend: recomputeVisible,
  });

  useEffect(() => {
    recomputeVisible();
  }, [properties, recomputeVisible]);

  return null;
}

export function PropertyMap({ properties, activeId, onSelect }: PropertyMapProps) {
  const [visibleInView, setVisibleInView] = useState(properties.length);

  return (
    <div className="sticky top-[110px] h-[calc(100vh-140px)] max-h-full rounded-[28px] overflow-hidden border border-[#D8D8D8]">
      <MapContainer center={[25.15, 55.2]} zoom={11} scrollWheelZoom style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapController
          properties={properties}
          activeId={activeId}
          onVisibleChange={setVisibleInView}
        />
        {properties.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={houseIcon(activeId === p.id)}
            eventHandlers={{ click: () => onSelect(p.id) }}
          />
        ))}
      </MapContainer>

      {properties.length > 0 && visibleInView === 0 && (
        <div className="absolute inset-x-0 top-4 z-[500] flex justify-center pointer-events-none px-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg text-center max-w-xs">
            <p className="text-[#1F1F1F] font-semibold text-sm">No properties found</p>
            <p className="text-[#5F5F5F] text-xs mt-1">Move or zoom out to see more.</p>
          </div>
        </div>
      )}
    </div>
  );
}