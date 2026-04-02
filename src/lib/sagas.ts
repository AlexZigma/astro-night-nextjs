import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  deleteMovieApi,
  fetchMovieByIdApi,
  fetchMoviesApi,
  postAddMovieApi,
  postEditMovieApi,
} from "@/app/api/utils";
import { Movie, MoviePayload } from "@/models/movies/types";

import {
  addMovie,
  addMovieRequest,
  deleteMovie,
  deleteMovieRequest,
  editMovie,
  editMovieRequest,
  fetchMovieError,
  fetchMovieRequest,
  fetchMovieSuccess,
  initializeMovies,
  initializeMoviesRequest,
} from "../models/movies/moviesSlice";

function* fetchMoviesSaga(): SagaIterator {
  try {
    const movies = yield call(fetchMoviesApi);
    yield put(initializeMovies(movies));
  } catch (error) {
    console.error(error);
  }
}

function* fetchMovieByIdSaga(action: PayloadAction<string>): SagaIterator {
  try {
    const movie = yield call(fetchMovieByIdApi, action.payload);
    yield put(fetchMovieSuccess(movie));
  } catch (error) {
    console.error(error);
    yield put(fetchMovieError());
  }
}

function* addMovieSaga(action: PayloadAction<MoviePayload>): SagaIterator {
  try {
    const movie = yield call(postAddMovieApi, action.payload);
    yield put(addMovie(movie));
  } catch (error) {
    console.error(error);
  }
}

function* editMovieSaga(action: PayloadAction<Movie>): SagaIterator {
  try {
    yield call(postEditMovieApi, action.payload);
    yield put(editMovie(action.payload));
  } catch (error) {
    console.error(error);
  }
}

function* deleteMovieSaga(action: PayloadAction<string>): SagaIterator {
  try {
    yield call(deleteMovieApi, action.payload);
    yield put(deleteMovie(action.payload));
  } catch (error) {
    console.error(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(initializeMoviesRequest.type, fetchMoviesSaga),
    takeLatest(fetchMovieRequest.type, fetchMovieByIdSaga),
    takeLatest(addMovieRequest.type, addMovieSaga),
    takeLatest(editMovieRequest.type, editMovieSaga),
    takeLatest(deleteMovieRequest.type, deleteMovieSaga),
  ]);
}
