import Link from "next/link";
import { useEffect } from "react";

import Card from "@/components/commons/Card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchInitialMoviesRequest } from "@/models/movies/moviesSlice";
import { selectRecentMovies } from "@/models/movies/selectors";

import styles from "./Hero.module.scss";

export default function HeroSection() {
  const movies = useAppSelector(selectRecentMovies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInitialMoviesRequest());
  }, [dispatch]);

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
