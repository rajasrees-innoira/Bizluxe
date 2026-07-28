import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BedDouble, Bath, Maximize, MessageCircle, Phone, CalendarCheck } from 'lucide-react';
import type { Property } from '../../data/Propertydata';

interface QuickViewModalProps {
  property: Property | null;
  onClose: () => void;
}

export function QuickViewModal({ property, onClose }: QuickViewModalProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => { setIndex(0); }, [property?.id]);

  useEffect(() => {
    if (!property) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % property.images.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + property.images.length) % property.images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [property, onClose]);

  const handleDrag = (_: any, info: PanInfo) => {
    if (!property) return;
    if (info.offset.x < -60) setIndex((i) => (i + 1) % property.images.length);
    else if (info.offset.x > 60) setIndex((i) => (i - 1 + property.images.length) % property.images.length);
  };

  return (
    <AnimatePresence>
      {property && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#0C0C0C]/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded-[28px] md:rounded-[36px] shadow-2xl grid grid-cols-1 md:grid-cols-[1.3fr_1fr]"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-white shadow-md"
            >
              <X size={18} />
            </button>

            {/* Image slider */}
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-[#141211] overflow-hidden">
              <motion.img
                key={index}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDrag}
                src={property.images[index]}
                alt={property.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setIndex((i) => (i - 1 + property.images.length) % property.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setIndex((i) => (i + 1) % property.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                    {index + 1} / {property.images.length}
                  </span>
                </>
              )}
            </div>

            {/* Details */}
            <div className="p-6 md:p-8 flex flex-col">
              <p className="text-primary font-semibold tracking-[0.2em] uppercase text-xs mb-2">{property.status}</p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#1F1F1F] mb-1">{property.title}</h2>
              <p className="text-[#5F5F5F] mb-4">{property.location}</p>
              <p className="text-primary font-heading font-bold text-2xl mb-6">{property.price}</p>

              <div className="flex items-center gap-6 text-[#5F5F5F] text-sm border-y border-[#D8D8D8]/70 py-4 mb-6">
                <span className="flex items-center gap-2"><BedDouble size={16} className="text-primary" />{property.bedrooms} Beds</span>
                <span className="flex items-center gap-2"><Bath size={16} className="text-primary" />{property.bathrooms} Baths</span>
                <span className="flex items-center gap-2"><Maximize size={16} className="text-primary" />{property.area}</span>
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <button
                  onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-12 rounded-full bg-primary hover:bg-[#A87235] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <CalendarCheck size={16} /> Schedule Visit
                </button>
                <div className="grid grid-cols-2 gap-3">
                 <a 
                    href={`https://wa.me/97140000000?text=${encodeURIComponent(`I'm interested in ${property.title}`)}`}
                    target="_blank" rel="noreferrer"
                    className="h-12 rounded-full border border-[#D8D8D8] text-sm font-semibold flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors"
                >
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                  <a
                    href="tel:+97140000000"
                    className="h-12 rounded-full border border-[#D8D8D8] text-sm font-semibold flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors"
                  >
                    <Phone size={15} /> Call Agent
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}