"use client";

import CTASection from "@/components/pages/HomePage/CTASection";
import HeroSection from "@/components/pages/HomePage/HeroSection";
import InfoSection from "@/components/pages/HomePage/InfoSection";
import TopMoviesSection from "@/components/pages/HomePage/TopMoviesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <InfoSection />
      <TopMoviesSection />
      <CTASection />
    </main>
  );
}
