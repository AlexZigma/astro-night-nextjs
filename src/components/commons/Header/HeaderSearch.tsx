import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEventHandler, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

import { useAppSelector } from "@/lib/hooks";
import { select5MoviesByTitle } from "@/models/movies/selectors";

import Card from "../Card";
import styles from "./Header.module.scss";

interface HeaderSearchProps {
  onClose: () => void;
}

export default function HeaderSearch({ onClose }: HeaderSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryTrimed = searchQuery.trim();
  const [searchQueryDebounced] = useDebounce(searchQueryTrimed, 500);
  const searchUrl = searchQueryTrimed
    ? `/items?search=${searchQueryTrimed}`
    : "/items";

  const movies = useAppSelector((state) =>
    select5MoviesByTitle(state, searchQueryDebounced),
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  const isEmptyResults = movies.length === 0;

  const renderedMovieTitles = (
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
  );

  const renderedMovies = (
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
  );

  const renderedSuggestions = searchQueryDebounced && (
    <>
      <div className={styles.searchSuggestions}>
        {renderedMovieTitles}
        {renderedMovies}
      </div>
      <Link href={searchUrl} className={styles.searchAction} onClick={onClose}>
        View all results
      </Link>
    </>
  );

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

      {isEmptyResults ? (
        <p className={styles.searchNoResults}>
          No results could be found. Please try again with a different query.
        </p>
      ) : (
        renderedSuggestions
      )}
    </div>
  );
}
