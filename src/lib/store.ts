import { configureStore, isAnyOf } from "@reduxjs/toolkit";

import modalReducer from "../models/modal/modalSlice";
import movieReducer, { addMovie } from "../models/movies/moviesSlice";
import { saveMoviesToLocalStorage } from "../models/movies/utils";
import { listenerMiddleware, startAppListening } from "./listnerMiddleware";

startAppListening({
  matcher: isAnyOf(addMovie),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    saveMoviesToLocalStorage(state.movies.items);
  },
});

export const makeStore = () => {
  return configureStore({
    reducer: { movies: movieReducer, modal: modalReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
