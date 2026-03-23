import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEventHandler, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSearchTitle } from "@/models/movies/moviesSlice";
import { selectSearchMovies } from "@/models/movies/selectors";

import Card from "../Card";
import styles from "./Header.module.scss";

interface HeaderSearchProps {
  onClose: () => void;
}

export default function HeaderSearch({ onClose }: HeaderSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchUrl = "/items";

  const movies = useAppSelector(selectSearchMovies);
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    dispatch(setSearchTitle(searchQuery.trim()));
  }, [dispatch, searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    router.push(searchUrl);
    onClose();
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchTop}>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.searchInput}
            placeholder="SEARCH"
            ref={inputRef}
            autoFocus
            value={searchQuery}
            type="search"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </form>
        <button className={styles.searchClose} onClick={handleClearSearch} />
      </div>

      {movies.length === 0 ? (
        <p className={styles.searchNoResults}>
          No results could be found. Please try again with a different query.
        </p>
      ) : (
        searchQuery.trim() && (
          <>
            <div className={styles.searchSuggestions}>
              <div className={styles.results}>
                <span className={styles.resultsTitle}>Suggestions</span>
                {movies.map((movie) => (
                  <Link
                    className={styles.resultsText}
                    key={movie.id}
                    href={`/items/${movie.id}`}
                    onClick={onClose}
                  >
                    {movie.title}
                  </Link>
                ))}
              </div>
              <div className={styles.searchCards}>
                {movies.map((movie) => (
                  <div key={movie.id} onClick={onClose}>
                    <Card
                      id={movie.id}
                      title={movie.title}
                      rating={movie.rating}
                      year={movie.year}
                      variant="xsmall"
                    />
                  </div>
                ))}
              </div>
            </div>
            <Link
              href={searchUrl}
              className={styles.searchAction}
              onClick={onClose}
            >
              View all results
            </Link>
          </>
        )
      )}
    </div>
  );
}
