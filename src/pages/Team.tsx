import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TeamHero } from '@/components/team/TeamHero';
import { TeamSection } from '@/components/team/TeamSection';

export default function Team() {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#F7F5F2]">
      <Navbar />
      <TeamHero />
      <TeamSection />
      <Footer />
    </div>
  );
}