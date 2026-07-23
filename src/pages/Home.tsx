// import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { Communities } from '@/components/Communities';
import { Categories } from '@/components/Categories';
import { WhyBizluxe } from '@/components/WhyBizluxe';
import { ExclusiveCollection } from '@/components/ExclusiveCollection';
import { PropertyCarousel } from '@/components/PropertyCarousel';
import { Services } from '@/components/Services';
import { DeveloperPartners } from '@/components/DeveloperPartners';
import { Testimonials } from '@/components/Testimonials';
import { PublishProperty } from '@/components/PublishProperty';
import { CTABanner } from '@/components/CTABanner';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F5F2]">
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <Communities />
      <Categories />
      <WhyBizluxe />
      <ExclusiveCollection />
      <PropertyCarousel />
      {/* <Services /> */}
      <DeveloperPartners />
      <Testimonials />
      <PublishProperty />
      <CTABanner />
      <Footer />
    </main>
  );
}
