import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

import { Movie, MoviePayload } from "@/models/movies/types";

import { initialState } from "./consts";

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
      state.status = "succeeded";
    },
  },
});

export const { addMovie, initializeMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
