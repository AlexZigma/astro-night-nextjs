import Link from "next/link";

import Card from "@/components/commons/Card";
import { selectFirst8Movies } from "@/lib/features/movies/selectors";
import { useAppSelector } from "@/lib/hooks";

import styles from "./Hero.module.scss";

export default function HeroSection() {
  const movies = useAppSelector(selectFirst8Movies);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <p className={styles.heroTitle}>Trending Now</p>
        <ul className={styles.heroList}>
          {movies.map((item) => (
            <li key={item.id} className={styles.heroListItem}>
              <Card
                id={item.id}
                // image={""}
                rating={item.rating}
                title={item.title}
                year={item.year}
              />
            </li>
          ))}
        </ul>
        <Link href="/storage" className={styles.heroButton}>
          See more
        </Link>
      </div>
    </section>
  );
}
