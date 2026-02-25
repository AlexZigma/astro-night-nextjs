import Card from "@/components/commons/Card";
import { movies } from "@/models/movies/consts";

import styles from "./Hero.module.scss";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <p className={styles.heroTitle}>Trending Now</p>
        <ul className={styles.heroList}>
          {movies.map((item) => (
            <li key={item.id} className={styles.heroListItem}>
              <Card {...item} />
            </li>
          ))}
        </ul>
        <button className={styles.heroButton}>See more</button>
      </div>
    </section>
  );
}
