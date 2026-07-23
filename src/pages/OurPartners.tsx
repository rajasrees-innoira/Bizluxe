import { Navbar } from '@/components/Navbar';
import { PartnersHero } from '@/components/PartnersHero';
import { PartnersStats } from '@/components/PartnersStats';
import { PartnersGrid } from '@/components/PartnersGrid';
import { PartnersCTA } from '@/components/PartnersCTA';
import { CTABanner } from '@/components/CTABanner';
import { Footer } from '@/components/Footer';

export default function OurPartners() {
  return (
    <main className="min-h-screen bg-[#F7F5F2]">
      <Navbar />
      <PartnersHero />
      <PartnersStats />
      <PartnersGrid />
      <PartnersCTA />
      {/* <CTABanner /> */}
      <Footer />
    </main>
  );
}