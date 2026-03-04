"use client";

import MovieModal from "@/components/commons/Modal/MovieModal";
import CTASection from "@/components/pages/HomePage/CTASection";
import HeroSection from "@/components/pages/HomePage/HeroSection";
import InfoSection from "@/components/pages/HomePage/InfoSection";
import TopMoviesSection from "@/components/pages/HomePage/TopMoviesSection";

import { useModal } from "./ModalProvider";

export default function Home() {
  const { isModalOpen } = useModal();

  return (
    <main>
      <HeroSection />
      <InfoSection />
      <TopMoviesSection />
      <CTASection />
      {isModalOpen && <MovieModal />}
    </main>
  );
}
