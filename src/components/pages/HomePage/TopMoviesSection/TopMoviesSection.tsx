import { movies } from "@/models/movies/consts";

import Carousel from "./Carousel";
import styles from "./topMovies.module.scss";

export default function TopMoviesSection() {
  return (
    <section className={styles.topMovies}>
      <div className={styles.topMoviesContent}>
        <p className={styles.topMoviesTitle}>Top ten movies</p>
        <Carousel movies={movies} />
      </div>
    </section>
  );
}
