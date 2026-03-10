import { configureStore, isAnyOf } from "@reduxjs/toolkit";

import modalReducer from "./features/modal/modalSlice";
import movieReducer, { addMovie } from "./features/movies/moviesSlice";
import { listenerMiddleware, startAppListening } from "./listnerMiddleware";
import { saveMoviesToLocalStorage } from "./utils";

startAppListening({
  matcher: isAnyOf(addMovie),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    saveMoviesToLocalStorage(state.movies.items);
    console.log("21321");
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
