import { MOVIES, MOVIES_STORAGE_KEY } from "@/models/movies/constants";
import { MovieType } from "@/models/movies/types";

export function loadMoviesFromLocalStorage(): MovieType[] {
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

export function saveMoviesToLocalStorage(state: MovieType[]) {
  localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(state));
}
