import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/lib/store";

export const selectMovies = (state: RootState) => {
  return state.movies.items;
};

export const selectFirst8Movies = createSelector([selectMovies], (movies) =>
  movies.slice(0, 8),
);

export const selectTop10Movies = createSelector([selectMovies], (movies) =>
  [...movies].sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, 10),
);

export const selectStatus = (state: RootState) => state.movies.status;

export const selectMovieById = (id: string) => (state: RootState) =>
  state.movies.items.find((movie) => movie.id === id);
