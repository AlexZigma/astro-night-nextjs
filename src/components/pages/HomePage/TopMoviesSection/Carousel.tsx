"use client";

import { useRef } from "react";

import ArrowButton from "@/components/commons/Button/ArrowButton";
import Card from "@/components/commons/Card";
import { Movie } from "@/models/movies/types";

import styles from "./topMovies.module.scss";

export default function Carousel({ movies }: { movies: Movie[] }) {
  const spinnerRef = useRef<HTMLUListElement>(null);

  const scrollCarousel = (direction: number) => {
    if (!spinnerRef.current) return;

    const firstItem = spinnerRef.current.children[0];
    if (!firstItem) return;

    const itemWidth = firstItem.clientWidth;

    spinnerRef.current.scrollBy({
      left: direction * itemWidth,
      behavior: "smooth",
    });
  };

  const handlePrevClick = () => {
    scrollCarousel(-1);
  };

  const handleNextClick = () => {
    scrollCarousel(1);
  };

  return (
    <div className={styles.carousel}>
      <ArrowButton onClick={handlePrevClick} variant="left" />
      <ul ref={spinnerRef} className={styles.carouselList}>
        {movies.map((item) => (
          <li className={styles.carouselItem} key={item.id} id={`#${item.id}`}>
            <Card {...item} variant="small" />
          </li>
        ))}
      </ul>
      <ArrowButton onClick={handleNextClick} variant="right" />
    </div>
  );
}
