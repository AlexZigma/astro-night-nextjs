import Link from "next/link";

import Card from "@/components/commons/Card";
import { useAppSelector } from "@/lib/hooks";
import { selectFirst8Movies } from "@/models/movies/selectors";

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
                rating={item.rating}
                title={item.title}
                year={item.year}
                image={item.image}
              />
            </li>
          ))}
        </ul>
        <Link href="/items" className={styles.heroButton}>
          See more
        </Link>
      </div>
    </section>
  );
}
