import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Property } from '../../data/Propertydata';

interface FullscreenGalleryProps {
  property: Property | null;
  onClose: () => void;
}

export function FullscreenGallery({ property, onClose }: FullscreenGalleryProps) {
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
          className="fixed inset-0 z-[300] bg-black flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between px-4 md:px-8 py-4 text-white shrink-0">
            <span className="text-sm text-white/70">
              {index + 1} / {property.images.length}
            </span>
            <button onClick={onClose} aria-label="Close gallery" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
              <X size={18} />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center overflow-hidden px-4">
            <motion.img
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDrag}
              src={property.images[index]}
              alt={property.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="max-h-full max-w-full object-contain cursor-grab active:cursor-grabbing select-none"
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setIndex((i) => (i - 1 + property.images.length) % property.images.length)}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 items-center justify-center hover:bg-white/20 text-white"
                  aria-label="Previous"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={() => setIndex((i) => (i + 1) % property.images.length)}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 items-center justify-center hover:bg-white/20 text-white"
                  aria-label="Next"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {property.images.length > 1 && (
            <div className="shrink-0 flex gap-2 overflow-x-auto px-4 md:px-8 py-4 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === index ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}