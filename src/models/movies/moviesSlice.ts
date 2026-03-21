import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

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
  status: LoadingStatus.Loading,
  filters: { genres: [], searchTitle: "" },
  sort: { field: null, order: null },
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    addMovie: {
      reducer(state, action: PayloadAction<Movie>) {
        state.items.push(action.payload);
      },
      prepare(movie: MoviePayload) {
        return {
          payload: { ...movie, id: nanoid() },
        };
      },
    },
    deleteMovie: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editMovie: (state, action: PayloadAction<Movie>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    initializeMovies: (state, action: PayloadAction<Movie[]>) => {
      state.items = action.payload;
      state.status = LoadingStatus.Succeeded;
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
  addMovie,
  deleteMovie,
  editMovie,
  initializeMovies,
  toggleFilterGenre,
  setSortField,
  setSortOrder,
  setSearchTitle,
} = moviesSlice.actions;
export default moviesSlice.reducer;
