"use client";

import { useCallback, useMemo, useState } from "react";

import Card from "@/components/commons/Card";
import { useAppSelector } from "@/lib/hooks";
import {
  selectFilteredSortedMovies,
  selectIsFilterUsed,
} from "@/models/movies/selectors";

import styles from "./grid.module.scss";
import PageMarker from "./PageMarker";
import SortSelect from "./SortSelect";
import SortToggle from "./SortToggle";

const perPage = 8;

export default function MovieGrid() {
  const movies = useAppSelector(selectFilteredSortedMovies);
  const isFilterUsed = useAppSelector(selectIsFilterUsed);

  const [currentPage, setCurrentPage] = useState(0);

  const pagesCount = useMemo(
    () => Math.ceil(movies.length / perPage),
    [movies],
  );
  const pages = useMemo(
    () => Array.from({ length: pagesCount }, (_, i) => i),
    [pagesCount],
  );

  const pageMovies = movies.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage,
  );

  const handlePageChange = useCallback(
    (i: number) => () => setCurrentPage(i),
    [],
  );

  const storageTitle =
    movies.length === 0 && isFilterUsed
      ? "No objects match those filters."
      : `${movies.length} objects found`;

  return (
    <section className={styles.storage}>
      <div className={styles.storageTop}>
        <p className={styles.storageTitle}>{storageTitle}</p>
        <div className={styles.storageSorting}>
          <SortToggle />
          <SortSelect />
        </div>
      </div>
      <div className={styles.content}>
        {pageMovies.map((movie) => (
          <Card
            id={movie.id}
            rating={movie.rating}
            title={movie.title}
            year={movie.year}
            image={movie.image}
            key={movie.id}
          />
        ))}
      </div>
      <div className={styles.storageBottom}>
        {pages.map((i) => (
          <PageMarker
            isActive={i === currentPage}
            onClick={handlePageChange(i)}
            key={i}
          />
        ))}
      </div>
    </section>
  );
}
