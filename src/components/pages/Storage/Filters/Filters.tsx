import clsx from "clsx";
import { useCallback, useState } from "react";

import SmallButton from "@/components/commons/Button/SmallButton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleFilterGenre } from "@/models/movies/moviesSlice";
import { selectFilterGenres } from "@/models/movies/selectors";
import { GENRES } from "@/models/tags/constants";
import { Genre } from "@/models/tags/types";

import styles from "./filters.module.scss";

export default function Filters() {
  const [isFiltersShown, setIsFiltersShown] = useState(false);

  const dispatch = useAppDispatch();
  const filterGenres = useAppSelector(selectFilterGenres);

  const handleFilterChange = useCallback(
    (genre: Genre) => () => {
      dispatch(toggleFilterGenre(genre));
    },
    [dispatch],
  );

  const toggleIsFiltersShown = () => {
    setIsFiltersShown((prev) => !prev);
  };

  const filtersTitle = `Filter ( ${filterGenres.length} )`;

  return (
    <section className={styles.filters}>
      <button className={styles.filtersTitle} onClick={toggleIsFiltersShown}>
        {filtersTitle}
      </button>
      <div
        className={clsx(
          styles.filtersList,
          isFiltersShown && styles.filtersListShown,
        )}
      >
        {GENRES.map((genre) => (
          <SmallButton
            key={genre}
            onClick={handleFilterChange(genre)}
            variant={filterGenres.includes(genre) ? "active" : null}
          >
            {genre}
          </SmallButton>
        ))}
      </div>
    </section>
  );
}
