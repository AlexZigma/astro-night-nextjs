"use client";

import { useState } from "react";

import SmallButton from "@/components/commons/Button/SmallButton";
import Card from "@/components/commons/Card";
import { selectMovies } from "@/lib/features/movies/selectors";
import { useAppSelector } from "@/lib/hooks";
import { TAGS } from "@/models/tags/consts";

import styles from "./page.module.scss";

type Sort = "none" | "asc" | "desc";

function SortToggle() {
  const [sort, setSort] = useState<Sort>("none");

  return (
    <button
      className={styles.toggle}
      onClick={() =>
        setSort((prev) =>
          prev === "none" ? "asc" : prev === "asc" ? "desc" : "none",
        )
      }
    >
      <svg
        className={styles.toggleSvg}
        // width="50"
        // height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity={sort === "asc" ? "1" : "0.3"}
          d="M8.24393 15.778L16.122 7.99981L24 15.778M16.3465 10L16.3465 30"
          stroke="#F12660"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity={sort === "desc" ? "1" : "0.3"}
          d="M41.7561 34.222L33.878 42.0002L26 34.222M33.6535 40L33.6535 20"
          stroke="#F12660"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function PageMarker({
  onClick,
  isActive = false,
}: {
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <button type="button" onClick={onClick} className={styles.marker}>
      <svg
        className={styles.markerSvg}
        viewBox="0 0 20 20"
        fill={isActive ? "#F12660" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="8" stroke="#F12660" strokeWidth="2" />
      </svg>
    </button>
  );
}

export default function StoragePage() {
  const movies = useAppSelector(selectMovies);

  const perPage = 8;
  const pagesCount = Math.ceil(movies.length / perPage);
  const [page, setPage] = useState(0);
  const pages = Array.from({ length: pagesCount }, (_, i) => i);

  const pageMovies = movies.slice(page * perPage, (page + 1) * perPage);

  return (
    <main>
      <section className={styles.filters}>
        <p className={styles.filtersTitle}>Filter ( 0 )</p>
        <div className={styles.filtersList}>
          {TAGS.map((tag) => (
            <SmallButton key={tag}>{tag}</SmallButton>
          ))}
        </div>
      </section>
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
          {pages.map((pageNum) => (
            <PageMarker
              isActive={pageNum === page}
              onClick={() => setPage(pageNum)}
              key={pageNum}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
