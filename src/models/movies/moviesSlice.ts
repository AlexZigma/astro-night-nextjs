import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

import {
  LoadingStatus,
  Movie,
  MoviePayload,
  MovieState,
} from "@/models/movies/types";

export const initialState: MovieState = {
  items: [],
  status: LoadingStatus.Loading,
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
  },
});

export const { addMovie, deleteMovie, editMovie, initializeMovies } =
  moviesSlice.actions;
export default moviesSlice.reducer;
