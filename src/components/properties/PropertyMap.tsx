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

function priceIcon(price: string, active: boolean) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${active ? '#B27F3F' : '#fff'};
      color:${active ? '#fff' : '#1F1F1F'};
      padding:6px 12px;
      border-radius:9999px;
      font-size:12px;
      font-weight:700;
      white-space:nowrap;
      box-shadow:0 4px 14px rgba(0,0,0,.25);
      border:1px solid rgba(0,0,0,.06);
      transform:${active ? 'scale(1.14)' : 'scale(1)'};
      transition:transform .2s ease;
    ">${price.replace('AED ', '')}</div>`,
    iconAnchor: [40, 14],
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

  useEffect(() => {
    if (properties.length === 0) return;
    const bounds = L.latLngBounds(properties.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }, [properties, map]);

  useEffect(() => {
    if (activeId == null) return;
    const active = properties.find((p) => p.id === activeId);
    if (active) map.panTo([active.lat, active.lng], { animate: true });
  }, [activeId, properties, map]);

  const recomputeVisible = () => {
    const bounds = map.getBounds();
    const count = properties.filter((p) => bounds.contains([p.lat, p.lng])).length;
    onVisibleChange(count);
  };

  useMapEvents({
    moveend: recomputeVisible,
    zoomend: recomputeVisible,
  });

  useEffect(() => {
    recomputeVisible();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties]);

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
        <MapController properties={properties} activeId={activeId} onVisibleChange={setVisibleInView} />
        {properties.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={priceIcon(p.price, activeId === p.id)}
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