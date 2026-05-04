import {
  Movie,
  MoviePayload,
  SortField,
  SortOrder,
} from "@/models/movies/types";
import { Genre } from "@/models/tags/types";

const baseUrl = process.env.NEXT_PUBLIC_DB_URL;

const request = async <T>(
  path: string,
  params?: URLSearchParams,
  options?: RequestInit,
): Promise<T> => {
  const url = new URL(path, baseUrl);
  if (params) url.search = params.toString();

  let res;

  try {
    res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  } catch {
    throw new Error("Network Error");
  }

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data");
  }

  return res.json();
};

export const fetchRecentMovies = async () => {
  const params = new URLSearchParams({ _limit: "8" });
  return request<Movie[]>("/items", params);
};

export const fetchTop10Movies = async () => {
  const params = new URLSearchParams({
    _limit: "10",
    _sort: "rating",
    _order: "desc",
  });
  return request<Movie[]>("/items", params);
};

export const fetchAllMoviesApi = async () => {
  return request<Movie[]>("/items");
};

export const fetchMovieByIdApi = async (id: string) => {
  return request<Movie>(`/items/${id}`);
};

export const fetchMoviesByTitleApi = async (searchTitle: string) => {
  const params = new URLSearchParams({ title_like: searchTitle, _limit: "5" });
  return request<Movie[]>("/items", params);
};

export const fetchMoviesByFiltersApi = async (
  searchTitle: string,
  filters: Genre[],
  sortField: SortField,
  sortOrder: SortOrder,
) => {
  const params = new URLSearchParams();

  if (searchTitle) params.append("title_like", searchTitle);
  if (filters.length > 0) {
    const genresQuery = `^${filters.map((filter) => `(?=.*\\b${filter}\\b)`).join("")}.*$`;
    params.append("genres_like", genresQuery);
  }
  if (sortField) params.append("_sort", sortField);
  if (sortOrder) params.append("_order", sortOrder);

  return request<Movie[]>("/items", params);
};

export const postAddMovieApi = async (payload: MoviePayload) => {
  const payloadJSON = JSON.stringify(payload);
  return request<Movie>("/items", undefined, {
    method: "POST",
    body: payloadJSON,
  });
};

export const postEditMovieApi = async (movie: Movie) => {
  const movieJSON = JSON.stringify(movie);
  return request<Movie>(`/items/${movie.id}`, undefined, {
    method: "PUT",
    body: movieJSON,
  });
};

export const deleteMovieApi = async (movieId: string) => {
  return request<Movie>(`/items/${movieId}`, undefined, {
    method: "DELETE",
  });
};
