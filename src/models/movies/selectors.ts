import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/lib/store";

export const selectMovies = (state: RootState) => state.movies.items;

export const selectCurrentMovie = (state: RootState) =>
  state.movies.currentMovie;

export const selectStatus = (state: RootState) => state.movies.status;

export const selectSortField = (state: RootState) => state.movies.sort.field;
export const selectSortOrder = (state: RootState) => state.movies.sort.order;
export const selectFilterGenres = (state: RootState) =>
  state.movies.filters.genres;

export const selectFilterSearch = (state: RootState) =>
  state.movies.filters.searchTitle;

export const selectFirst8Movies = createSelector([selectMovies], (movies) =>
  movies.slice(0, 8),
);

export const selectTop10Movies = createSelector([selectMovies], (movies) =>
  [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10),
);

export const selectFilteredMovies = createSelector(
  [selectMovies, selectFilterGenres, selectFilterSearch],
  (movies, filterGenres, searchTitle) =>
    movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        filterGenres.every((genre) => movie.genres.includes(genre)),
    ),
);

export const selectFilteredSortedMovies = createSelector(
  [selectFilteredMovies, selectSortOrder, selectSortField],
  (movies, sortOrder, sortField) => {
    if (!sortField || !sortOrder) return movies;

    const sortSign = sortOrder === "asc" ? 1 : -1;

    return movies.toSorted((a, b) => {
      switch (sortField) {
        case "rating":
          return (a.rating - b.rating) * sortSign;
        case "title":
          return a.title.localeCompare(b.title) * sortSign;
        case "year":
          return (a.year - b.year) * sortSign;
        default:
          return 0;
      }
    });
  },
);

export const selectIsFilterUsed = createSelector(
  [selectFilterGenres],
  (genres) => genres.length > 0,
);

export const selectMovieById = (id: string) => (state: RootState) =>
  state.movies.items.find((movie) => movie.id === id);

export const select5MoviesByTitle = createSelector(
  [selectMovies, (_, query) => query],
  (movies, query) => {
    const cleanQuery = query.toLowerCase();

    return movies
      .filter((movie) => movie.title.toLowerCase().includes(cleanQuery))
      .slice(0, 5);
  },
);
