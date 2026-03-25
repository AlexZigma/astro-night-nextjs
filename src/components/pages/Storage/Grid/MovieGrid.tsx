"use client";

import { useCallback, useMemo, useState } from "react";

import Card from "@/components/commons/Card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSortField } from "@/models/movies/moviesSlice";
import {
  selectFilteredSortedMovies,
  selectFilterSearch,
  selectIsFilterUsed,
  selectSortField,
} from "@/models/movies/selectors";

import SortSelect from "../../../commons/Select";
import styles from "./grid.module.scss";
import PageMarker from "./PageMarker";
import SortToggle from "./SortToggle";

const perPage = 8;

export default function MovieGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useAppDispatch();

  const movies = useAppSelector(selectFilteredSortedMovies);
  const isFilterUsed = useAppSelector(selectIsFilterUsed);
  const selectedSort = useAppSelector(selectSortField);
  const searchQuery = useAppSelector(selectFilterSearch);

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

  const searchTitle = searchQuery ? `for “${searchQuery}”` : "";

  const storageTitle =
    movies.length === 0 && isFilterUsed
      ? "No objects match those filters."
      : `${movies.length} objects found ${searchTitle}`;

  return (
    <section className={styles.storage}>
      <div className={styles.storageTop}>
        <p className={styles.storageTitle}>{storageTitle}</p>
        <div className={styles.storageSorting}>
          <SortToggle />
          <SortSelect
            selectedSort={selectedSort}
            onChange={(field) => dispatch(setSortField(field))}
          />
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
