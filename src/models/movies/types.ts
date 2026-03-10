import { Genre } from "../tags/types";

export type Movie = {
  id: string;
  title: string;
  year: string;
  rating: string;
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
};
