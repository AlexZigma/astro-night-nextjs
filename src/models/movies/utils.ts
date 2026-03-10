import { MOVIES, MOVIES_STORAGE_KEY } from "@/models/movies/consts";
import { Movie } from "@/models/movies/types";

export function loadMoviesFromLocalStorage(): Movie[] {
  const raw = localStorage.getItem(MOVIES_STORAGE_KEY);
  if (!raw) return MOVIES;

  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    console.error("error while parse localStorage");
    return [];
  }
}

export function saveMoviesToLocalStorage(state: Movie[]) {
  localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(state));
}
