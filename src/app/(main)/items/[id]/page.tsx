"use client";

import { notFound } from "next/navigation";
import { use } from "react";

import SmallButton from "@/components/commons/Button/SmallButton";
import { CardPoster } from "@/components/commons/Card";
import { selectMovieById } from "@/lib/features/movies/selectors";
import { useAppSelector } from "@/lib/hooks";

import styles from "./page.module.scss";

export default function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const movie = useAppSelector(selectMovieById(id));

  if (!movie) {
    notFound();
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.section}>
        <div className={styles.sectionTop}>
          <p className={styles.sectionTitle}>
            <span className={styles.title}>{movie.title}</span>
            <span className={styles.year}>{movie.year}</span>
          </p>
          <button type="button" className={styles.edit}></button>
        </div>
        <div className={styles.sectionContent}>
          <CardPoster
            rating={movie.rating}
            image={movie.image}
            className={styles.poster}
          />
          <div className={styles.sectionInfo}>
            <div className={styles.sectionTags}>
              {movie.genres.map((genre) => (
                <SmallButton variant="active" key={genre}>
                  {genre}
                </SmallButton>
              ))}
            </div>
            <div className={styles.actors}>
              <span className={styles.actorsNames}>{movie.mainActor}</span>
            </div>
            <p className={styles.director}>{movie.director}</p>
            <p className={styles.description}>{movie.description} </p>
          </div>
        </div>
        <div className={styles.cta}>
          <p className={styles.ctaTitle}>Would you like to add something?</p>
          <SmallButton variant="active">.yes.</SmallButton>
        </div>
      </section>
    </main>
  );
}
