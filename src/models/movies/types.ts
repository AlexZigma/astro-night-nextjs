import { Tag } from "../tags/types";

export type Movie = {
  id: string;
  title: string;
  year: string;
  rating: string;
  genres: Tag[];
  director?: string;
  mainActor?: string;
  description?: string;
  image?: string;
};

export type MoviePayload = Omit<Movie, "id">;
