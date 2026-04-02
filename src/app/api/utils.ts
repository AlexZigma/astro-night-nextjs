import { Movie, MoviePayload } from "@/models/movies/types";

const baseUrl = "http://localhost:4000";

export const fetchMoviesApi = async () => {
  const res = await fetch(`${baseUrl}/items`);
  return res.json();
};

export const fetchMovieByIdApi = async (id: string) => {
  const res = await fetch(`${baseUrl}/items/${id}`);
  if (!res.ok) throw new Error("movie not found");
  return res.json();
};

export const postAddMovieApi = async (payload: MoviePayload) => {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const postEditMovieApi = async (movie: Movie) => {
  await fetch(`${baseUrl}/items/${movie.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
};

export const deleteMovieApi = async (movieId: string) => {
  await fetch(`${baseUrl}/items/${movieId}`, { method: "DELETE" });
};
