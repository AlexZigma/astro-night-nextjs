/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  LoadingStatus,
  Movie,
  MoviePayload,
  MovieState,
  SortField,
} from "@/models/movies/types";

import { Genre } from "../tags/types";

export const initialState: MovieState = {
  recentMovies: [],
  top10Movies: [],
  filteredMovies: [],
  searchedMovies: [],
  currentMovie: null,
  status: {
    loadingStatus: LoadingStatus.Idle,
    errorMessage: "",
  },
  filters: { genres: [], searchTitle: "" },
  sort: { field: null, order: null },
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    // load initial movies
    fetchInitialMoviesRequest: (state) => {
      state.status.loadingStatus = LoadingStatus.Loading;
    },
    fetchInitialMoviesSuccess: (
      state,
      action: PayloadAction<{ recentMovies: Movie[]; top10Movies: Movie[] }>,
    ) => {
      state.recentMovies = action.payload.recentMovies;
      state.top10Movies = action.payload.top10Movies;
      state.status.loadingStatus = LoadingStatus.Succeeded;
    },

    // find movies by title
    findMoviesByTitleRequest: (state, action: PayloadAction<string>) => {
      state.status.loadingStatus = LoadingStatus.Loading;
    },
    findMoviesByTitleSuccess: (state, action: PayloadAction<Movie[]>) => {
      state.searchedMovies = action.payload;
      state.status.loadingStatus = LoadingStatus.Succeeded;
    },

    // fetch filtered movies
    fetchFilteredMoviesRequest: (state) => {
      state.status.loadingStatus = LoadingStatus.Loading;
    },
    fetchFilteredMoviesSuccess: (state, action: PayloadAction<Movie[]>) => {
      state.filteredMovies = action.payload;
      state.status.loadingStatus = LoadingStatus.Succeeded;
    },

    // fetch movie by id
    fetchMovieRequest: (state, action: PayloadAction<string>) => {
      state.status.loadingStatus = LoadingStatus.Loading;
    },
    fetchMovieSuccess: (state, action: PayloadAction<Movie>) => {
      state.currentMovie = action.payload;
      state.status.loadingStatus = LoadingStatus.Succeeded;
    },

    // add movie
    addMovieRequest: (state, action: PayloadAction<MoviePayload>) => {
      state.status.loadingStatus = LoadingStatus.Loading;
    },
    addMovieSuccess: (state, action: PayloadAction<Movie>) => {
      state.status.loadingStatus = LoadingStatus.Succeeded;
    },

    // delete movie
    deleteMovieRequest: (state, action: PayloadAction<string>) => {
      state.status.loadingStatus = LoadingStatus.Loading;
    },
    deleteMovieSuccess: (state, action: PayloadAction<string>) => {
      state.status.loadingStatus = LoadingStatus.Succeeded;
    },

    // edit movie
    editMovieRequest: (state, action: PayloadAction<Movie>) => {
      state.status.loadingStatus = LoadingStatus.Loading;
    },
    editMovieSuccess: (state, action: PayloadAction<Movie>) => {
      state.status.loadingStatus = LoadingStatus.Succeeded;
      state.currentMovie = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.status.loadingStatus = LoadingStatus.Failed;
      state.status.errorMessage = action.payload;
    },
    resetStatus: (state) => {
      state.status.loadingStatus = LoadingStatus.Idle;
      state.status.errorMessage = "";
    },
    resetCurrentMovie: (state) => {
      state.currentMovie = null;
    },

    toggleFilterGenre: (state, action: PayloadAction<Genre>) => {
      const genre = action.payload;
      if (state.filters.genres.includes(genre)) {
        state.filters.genres = state.filters.genres.filter(
          (item) => item !== genre,
        );
      } else {
        state.filters.genres = [...state.filters.genres, genre];
      }
    },
    setSortField: (state, action: PayloadAction<SortField>) => {
      const field = action.payload;
      if (state.sort.field === field) {
        state.sort.field = null;
        state.sort.order = null;
      } else if (state.sort.field) {
        state.sort.field = action.payload;
      } else {
        state.sort.field = action.payload;
        state.sort.order = "desc";
      }
    },
    setSortOrder: (state) => {
      if (!state.sort.field) {
        state.sort.order = null;
      } else {
        state.sort.order = state.sort.order === "asc" ? "desc" : "asc";
      }
    },
    setSearchTitle: (state, action: PayloadAction<string>) => {
      state.filters.searchTitle = action.payload;
    },
  },
});

export const {
  fetchInitialMoviesRequest,
  fetchInitialMoviesSuccess,
  fetchFilteredMoviesRequest,
  fetchFilteredMoviesSuccess,
  findMoviesByTitleRequest,
  findMoviesByTitleSuccess,
  addMovieRequest,
  addMovieSuccess,
  deleteMovieRequest,
  deleteMovieSuccess,
  editMovieRequest,
  editMovieSuccess,
  fetchMovieRequest,
  fetchMovieSuccess,
  resetCurrentMovie,
  setError,
  resetStatus,
  toggleFilterGenre,
  setSortField,
  setSortOrder,
  setSearchTitle,
} = moviesSlice.actions;
export default moviesSlice.reducer;
