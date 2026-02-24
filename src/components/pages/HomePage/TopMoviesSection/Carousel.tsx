"use client";

import { useRef } from "react";

import ArrowButton from "@/components/commons/Button/ArrowButton";
import Card from "@/components/commons/Card/Card";
import { Movie } from "@/models/movies/types";

import styles from "./topMovies.module.scss";

export default function Carousel({ movies }: { movies: Movie[] }) {
  const buttonPrev = useRef<HTMLLIElement>(null);
  const spinnerRef = useRef<HTMLUListElement>(null);

  const handlePrevClick = () => {
    if (spinnerRef.current) {
      const itemWidth = spinnerRef.current?.scrollWidth / 7;
      spinnerRef.current.scrollLeft -= itemWidth;
    }
  };

  const handleNextClick = () => {
    if (spinnerRef.current) {
      const itemWidth = spinnerRef.current?.children[0].clientWidth;
      spinnerRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.carousel}>
      <ArrowButton onClick={handlePrevClick} variant="left" />
      <ul ref={spinnerRef} className={styles.carouselList}>
        {movies.map((item) => (
          <li
            className={styles.carouselItem}
            key={item.id}
            ref={buttonPrev}
            id={`#${item.id}`}
          >
            <Card {...item} small />
          </li>
        ))}
      </ul>
      <ArrowButton onClick={handleNextClick} variant="right" />
    </div>
  );
}
