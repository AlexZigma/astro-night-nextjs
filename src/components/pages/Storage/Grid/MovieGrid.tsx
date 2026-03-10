"use client";

import { useCallback, useMemo, useState } from "react";

import SmallButton from "@/components/commons/Button/SmallButton";
import Card from "@/components/commons/Card";
import { useAppSelector } from "@/lib/hooks";
import { selectMovies } from "@/models/movies/selectors";

import styles from "./grid.module.scss";
import PageMarker from "./PageMarker";
import SortToggle from "./SortToggle";

const perPage = 8;

export default function MovieGrid() {
  const movies = useAppSelector(selectMovies);

  const pagesCount = useMemo(
    () => Math.ceil(movies.length / perPage),
    [movies],
  );
  const [currentPage, setCurrentPage] = useState(0);
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

  return (
    <section className={styles.storage}>
      <div className={styles.storageTop}>
        <p className={styles.storageTitle}>
          {`${movies.length} objects found`}
        </p>
        <div className={styles.storageSorting}>
          <SortToggle />
          <SmallButton>sort by</SmallButton>
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
