import { Genre } from "../tags/types";

export type SortField = keyof Pick<Movie, "title" | "year" | "rating"> | null;
export type SortOrder = "asc" | "desc" | null;

export type MoviesSort = {
  field: SortField;
  order: SortOrder;
};

export type MovieFilters = {
  genres: Genre[];
  searchTitle: string;
};

export type Movie = {
  id: string;
  title: string;
  year: number;
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
  currentMovie: Movie | null;
  status: LoadingStatus;

  filters: MovieFilters;
  sort: MoviesSort;
};
