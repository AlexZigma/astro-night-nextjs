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

export type Status = {
  loadingStatus: LoadingStatus;
  errorMessage: string;
};

export type MovieState = {
  recentMovies: Movie[];
  top10Movies: Movie[];
  filteredMovies: Movie[];
  searchedMovies: Movie[];
  currentMovie: Movie | null;
  status: Status;

  filters: MovieFilters;
  sort: MoviesSort;
};
