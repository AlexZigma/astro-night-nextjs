import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import modalReducer from "../models/modal/modalSlice";
import movieReducer from "../models/movies/moviesSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const makeStore = () => {
  const store = configureStore({
    reducer: { movies: movieReducer, modal: modalReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend([sagaMiddleware]),
  });
  sagaMiddleware.run(rootSaga);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
