import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./features/modal/modalSlice";
import movieReducer from "./features/movies/moviesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { movies: movieReducer, modal: modalReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
