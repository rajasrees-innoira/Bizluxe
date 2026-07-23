import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactFormSection } from '@/components/contact/ContactFormSection';
import { OfficeLocationsSection } from '@/components/contact/OfficeLocationsSection';
import { FaqSection } from '@/components/contact/FaqSection';

export default function ContactUs() {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#F7F5F2]">
      <Navbar />
      <ContactHero />
      <ContactFormSection />
      <OfficeLocationsSection />
      <FaqSection />
      <Footer />
    </div>
  );
}