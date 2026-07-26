import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/lib/store";

export const selectRecentMovies = (state: RootState) =>
  state.movies.recentMovies;

export const selectTop10Movies = (state: RootState) => state.movies.top10Movies;

export const selectFilteredMovies = (state: RootState) =>
  state.movies.filteredMovies;

export const selectCurrentMovie = (state: RootState) =>
  state.movies.currentMovie;

export const selectSearchedMovies = (state: RootState) =>
  state.movies.searchedMovies;

export const selectStatus = (state: RootState) => state.movies.status;

export const selectSortField = (state: RootState) => state.movies.sort.field;

export const selectSortOrder = (state: RootState) => state.movies.sort.order;

export const selectFilterGenres = (state: RootState) =>
  state.movies.filters.genres;

export const selectFilterSearch = (state: RootState) =>
  state.movies.filters.searchTitle;

export const selectIsFilterUsed = createSelector(
  [selectFilterGenres],
  (genres) => genres.length > 0,
);
