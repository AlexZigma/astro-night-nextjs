import { Tag } from "../tags/types";

export type Movie = {
  id: string;
  title: string;
  year: string;
  rating: string;
  genres: Tag[];
  director?: string;
  mainActors?: string;
  description?: string;
  image?: string;
};

export type MoviePayload = Omit<Movie, "id">;

export type MovieState = {
  items: Movie[];
  status: "loading" | "idle" | "succeeded" | "failed";
};

export type MovieCard = Pick<
  Movie,
  "id" | "image" | "title" | "year" | "rating"
> & { isSmall?: boolean };
