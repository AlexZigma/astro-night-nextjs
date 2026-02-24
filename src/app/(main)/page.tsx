import CTASection from "@/components/pages/HomePage/CTASection/CTASection";
import HeroSection from "@/components/pages/HomePage/HeroSection/HeroSection";
import InfoSection from "@/components/pages/HomePage/InfoSection/InfoSection";
import TopMoviesSection from "@/components/pages/HomePage/TopMoviesSection/TopMoviesSection";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <InfoSection />
      <TopMoviesSection />
      <CTASection />
    </main>
  );
}
