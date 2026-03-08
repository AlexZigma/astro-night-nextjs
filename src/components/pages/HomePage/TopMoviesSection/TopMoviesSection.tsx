import { selectTop10Movies } from "@/lib/features/movies/selectors";
import { useAppSelector } from "@/lib/hooks";

import Carousel from "./Carousel";
import styles from "./topMovies.module.scss";

export default function TopMoviesSection() {
  const movies = useAppSelector(selectTop10Movies);
  return (
    <section className={styles.topMovies}>
      <div className={styles.topMoviesContent}>
        <p className={styles.topMoviesTitle}>Top ten movies</p>
        <Carousel movies={movies} />
      </div>
    </section>
  );
}
