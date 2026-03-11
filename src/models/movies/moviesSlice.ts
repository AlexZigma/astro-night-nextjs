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
    initializeMovies: (state, action: PayloadAction<Movie[]>) => {
      state.items = action.payload;
      state.status = LoadingStatus.Succeeded;
    },
  },
});

export const { addMovie, initializeMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
