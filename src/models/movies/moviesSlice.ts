import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

import { MoviePayload, MovieType } from "@/models/movies/types";

import { initialState } from "./constants";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    addMovie: {
      reducer(state, action: PayloadAction<MovieType>) {
        state.items.push(action.payload);
      },
      prepare(movie: MoviePayload) {
        return {
          payload: { ...movie, id: nanoid() },
        };
      },
    },
    initializeMovies: (state, action: PayloadAction<MovieType[]>) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
  },
});

export const { addMovie, initializeMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
