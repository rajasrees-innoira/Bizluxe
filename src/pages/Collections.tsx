import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CollectionsHero } from '@/components/collections/CollectionsHero';
import { FarmhousesSection } from '@/components/collections/FarmhousesSection';
import { ApartmentsSection } from '@/components/collections/ApartmentsSection';
import { GuestHousesSection } from '@/components/collections/GuestHousesSection';
import { ScrollTrigger } from '@/hooks/useGsap';

export default function Collections() {
  useEffect(() => {
    // Images loading after ScrollTrigger's first measurement pass can
    // change the page's total height, which shifts every pin's start/end
    // scroll position out from under it. Refreshing once everything has
    // settled keeps all pins lined up with the actual scroll position.
    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener('load', refresh);
    const settleTimer = setTimeout(refresh, 600);

    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(settleTimer);
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-[#F7F5F2]">
      <Navbar />
      <CollectionsHero />
      <FarmhousesSection />
      <ApartmentsSection />
      <GuestHousesSection />
      <Footer />
    </div>
  );
}