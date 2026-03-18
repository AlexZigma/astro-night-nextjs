import { useCallback } from "react";

import SmallButton from "@/components/commons/Button/SmallButton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleFilterGenre } from "@/models/movies/moviesSlice";
import { selectFilterGenres } from "@/models/movies/selectors";
import { GENRES } from "@/models/tags/constants";
import { Genre } from "@/models/tags/types";

import styles from "./filters.module.scss";

export default function Filters() {
  const dispatch = useAppDispatch();
  const filterGenres = useAppSelector(selectFilterGenres);

  const handleFilterChange = useCallback(
    (genre: Genre) => () => {
      dispatch(toggleFilterGenre(genre));
    },
    [dispatch],
  );

  const filtersTitle = `Filter ( ${filterGenres.length} )`;

  return (
    <section className={styles.filters}>
      <p className={styles.filtersTitle}>{filtersTitle}</p>
      <div className={styles.filtersList}>
        {GENRES.map((genre) => (
          <SmallButton
            key={genre}
            onClick={handleFilterChange(genre)}
            variant={filterGenres.includes(genre) ? "active" : undefined}
          >
            {genre}
          </SmallButton>
        ))}
      </div>
    </section>
  );
}
