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
  items: [],
  currentMovie: null,
  status: LoadingStatus.Idle,
  filters: { genres: [], searchTitle: "" },
  sort: { field: null, order: null },
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    initializeMoviesRequest: (state) => {
      state.status = LoadingStatus.Loading;
    },
    initializeMovies: (state, action: PayloadAction<Movie[]>) => {
      state.items = action.payload;
      state.status = LoadingStatus.Succeeded;
    },
    addMovieRequest: (state, action: PayloadAction<MoviePayload>) => {
      state.status = LoadingStatus.Loading;
    },
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.items.push(action.payload);
      state.status = LoadingStatus.Succeeded;
    },
    deleteMovieRequest: (state, action: PayloadAction<string>) => {},
    deleteMovie: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editMovieRequest: (state, action: PayloadAction<Movie>) => {},
    editMovie: (state, action: PayloadAction<Movie>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );

      state.currentMovie = action.payload;
    },
    fetchMovieRequest: (state, action: PayloadAction<string>) => {
      state.status = LoadingStatus.Loading;
    },
    fetchMovieSuccess: (state, action: PayloadAction<Movie>) => {
      state.currentMovie = action.payload;
      state.status = LoadingStatus.Succeeded;
    },
    fetchMovieError: (state) => {
      state.status = LoadingStatus.Failed;
    },
    resetCurrentMovie: (state) => {
      state.currentMovie = null;
    },
    resetStatus: (state) => {
      state.status = LoadingStatus.Idle;
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
  initializeMoviesRequest,
  initializeMovies,
  addMovieRequest,
  addMovie,
  deleteMovieRequest,
  deleteMovie,
  editMovieRequest,
  editMovie,
  fetchMovieRequest,
  fetchMovieSuccess,
  fetchMovieError,
  resetCurrentMovie,
  resetStatus,
  toggleFilterGenre,
  setSortField,
  setSortOrder,
  setSearchTitle,
} = moviesSlice.actions;
export default moviesSlice.reducer;
