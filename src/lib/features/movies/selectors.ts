import { RootState } from "@/lib/store";

export const selectMovies = (state: RootState) => state.movies.items;

export const selectStatus = (state: RootState) => state.movies.status;

export const selectMovieById = (id: string) => (state: RootState) =>
  state.movies.items.find((movie) => movie.id === id);
