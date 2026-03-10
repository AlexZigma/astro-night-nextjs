import { GenreType } from "../tags/types";

export type MovieType = {
  id: string;
  title: string;
  year: string;
  rating: string;
  genres: GenreType[];
  director?: string;
  mainActors?: string;
  description?: string;
  image?: string;
};

export type MoviePayload = Omit<MovieType, "id">;

export type MovieState = {
  items: MovieType[];
  status: "loading" | "idle" | "succeeded" | "failed";
};

export type MovieCard = Pick<
  MovieType,
  "id" | "image" | "title" | "year" | "rating"
> & { isSmall?: boolean };
