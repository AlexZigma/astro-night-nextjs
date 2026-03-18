import { Genre } from "../tags/types";

export type SortField = "title" | "year" | "rating" | null;
export type SortOrder = "asc" | "desc" | null;

export type MoviesSort = {
  field: SortField;
  order: SortOrder;
};

export type MovieFilters = {
  genres: Genre[];
};

export type Movie = {
  id: string;
  title: string;
  year: string;
  rating: number;
  genres: Genre[];
  director?: string;
  mainActors?: string;
  description?: string;
  image?: string;
};

export type MoviePayload = Omit<Movie, "id">;

export enum LoadingStatus {
  Loading = "loading",
  Idle = "idle",
  Succeeded = "succeeded",
  Failed = "failed",
}

export type MovieState = {
  items: Movie[];
  status: LoadingStatus;

  filters: MovieFilters;
  sort: MoviesSort;
};
