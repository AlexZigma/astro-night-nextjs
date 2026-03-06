import { Tag } from "../tags/types";

export type Movie = {
  id: string;
  title: string;
  year: string;
  rating: string;
  director?: string;
  mainActor?: string;
  description?: string;
  image?: string;
  genres?: Tag[];
};

export type MoviePayload = Omit<Movie, "id">;
