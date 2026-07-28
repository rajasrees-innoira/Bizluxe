import React, { useState } from 'react';
import { Heart, BedDouble, Bath, Maximize, Phone, MessageCircle, Camera, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Property } from '../../data/Propertydata';

interface PropertyCardProps {
  property: Property;
  active: boolean;
  isLiked: boolean;
  onToggleLike: (id: number) => void;
  onHover: (id: number | null) => void;
  onQuickView: (property: Property) => void;
  onOpenGallery: (property: Property) => void;
}

export const PropertyCard = React.memo(function PropertyCard({
  property,
  active,
  isLiked,
  onToggleLike,
  onHover,
  onQuickView,
  onOpenGallery,
}: PropertyCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      id={`property-${property.id}`}
      onMouseEnter={() => onHover(property.id)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group flex flex-col rounded-[24px] overflow-hidden bg-white shadow-[0_12px_32px_-18px_rgba(31,31,31,0.25)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-20px_rgba(31,31,31,0.35)] ${
        active ? 'ring-2 ring-primary' : ''
      }`}
    >
      {/* Image - 4:3, rounded top only, skeleton while loading */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-[24px] bg-[#EDEAE3]">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-[#E4E0D8]" />}
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {property.badge && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
            {property.badge}
          </span>
        )}
        <span className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/85 backdrop-blur-sm text-[#1F1F1F] text-[10px] font-semibold px-2.5 py-1 rounded-full">
          {property.status}
        </span>

        <div className="absolute top-3 right-3 flex gap-2">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={(e) => { e.stopPropagation(); onToggleLike(property.id); }}
            aria-label="Save property"
            aria-pressed={isLiked}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform"
          >
            <motion.span animate={isLiked ? { scale: [1, 1.35, 1] } : {}} transition={{ duration: 0.35 }}>
              <Heart size={16} className={isLiked ? 'fill-primary text-primary' : 'text-[#1F1F1F]'} />
            </motion.span>
          </motion.button>
          <button
            onClick={(e) => { e.stopPropagation(); onOpenGallery(property); }}
            aria-label="View gallery"
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Camera size={15} className="text-[#1F1F1F]" />
          </button>
        </div>

        {/* Quick View - fades in on hover */}
        <button
          onClick={(e) => { e.stopPropagation(); onQuickView(property); }}
          className="absolute bottom-3 left-3 right-3 h-10 rounded-full bg-white/95 text-[#1F1F1F] text-xs font-semibold flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          <Eye size={14} /> Quick View
        </button>
      </div>

      {/* Content - flex column, no forced stretch, no dead space */}
      <div className="flex flex-col p-4 md:p-5 gap-2">
        <div>
          <h3 className="text-base font-heading font-bold text-[#1F1F1F] truncate">{property.title}</h3>
          <p className="text-[#5F5F5F] text-sm">{property.location}</p>
        </div>

        <div className="h-px bg-[#D8D8D8]/70" />

        <div className="flex items-center gap-4 text-[#5F5F5F] text-xs">
          <span className="flex items-center gap-1.5"><BedDouble size={14} className="text-primary" />{property.bedrooms}</span>
          <span className="flex items-center gap-1.5"><Bath size={14} className="text-primary" />{property.bathrooms}</span>
          <span className="flex items-center gap-1.5"><Maximize size={14} className="text-primary" />{property.area}</span>
        </div>

        <div className="h-px bg-[#D8D8D8]/70" />

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <p className="text-primary font-bold text-base font-heading truncate">{property.price}</p>
          <div className="flex gap-2 shrink-0">
            <a
              href="tel:+97140000000"
              onClick={(e) => e.stopPropagation()}
              aria-label="Call"
              className="w-9 h-9 rounded-full bg-[#F7F5F2] flex items-center justify-center hover:bg-[#1F1F1F] hover:text-white transition-colors"
            >
              <Phone size={14} />
            </a>
            <a
              href={`https://wa.me/97140000000?text=${encodeURIComponent(`I'm interested in ${property.title}`)}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full bg-[#F7F5F2] flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});