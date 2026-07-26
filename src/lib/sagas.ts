import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, takeLatest } from "redux-saga/effects";

import {
  deleteMovieApi,
  fetchMovieByIdApi,
  fetchMoviesByFiltersApi,
  fetchMoviesByTitleApi,
  fetchRecentMovies,
  fetchTop10Movies,
  postAddMovieApi,
  postEditMovieApi,
} from "@/app/api/utils";
import { closeModal } from "@/models/modal/modalSlice";
import {
  selectFilterGenres,
  selectFilterSearch,
  selectSortField,
  selectSortOrder,
} from "@/models/movies/selectors";
import { Movie, MoviePayload } from "@/models/movies/types";

import {
  addMovieRequest,
  addMovieSuccess,
  deleteMovieRequest,
  deleteMovieSuccess,
  editMovieRequest,
  editMovieSuccess,
  fetchFilteredMoviesRequest,
  fetchFilteredMoviesSuccess,
  fetchInitialMoviesRequest,
  fetchInitialMoviesSuccess,
  fetchMovieRequest,
  fetchMovieSuccess,
  findMoviesByTitleRequest,
  findMoviesByTitleSuccess,
  setError,
} from "../models/movies/moviesSlice";
import { getErrorMessage } from "./utils";

function* fetchInitialMoviesSaga(): SagaIterator {
  try {
    const recentMovies = yield call(fetchRecentMovies);
    const top10Movies = yield call(fetchTop10Movies);
    yield put(fetchInitialMoviesSuccess({ recentMovies, top10Movies }));
  } catch (error) {
    yield put(setError(getErrorMessage(error)));
  }
}

function* fetchFilteredMoviesSaga(): SagaIterator {
  const filters = yield select(selectFilterGenres);
  const searchTitle = yield select(selectFilterSearch);
  const sortField = yield select(selectSortField);
  const sortOrder = yield select(selectSortOrder);

  try {
    const movies = yield call(
      fetchMoviesByFiltersApi,
      searchTitle,
      filters,
      sortField,
      sortOrder,
    );
    yield put(fetchFilteredMoviesSuccess(movies));
  } catch (error) {
    yield put(setError(getErrorMessage(error)));
  }
}

function* fetchMoviesByTitleSaga(action: PayloadAction<string>): SagaIterator {
  try {
    const movie = yield call(fetchMoviesByTitleApi, action.payload);
    yield put(findMoviesByTitleSuccess(movie));
  } catch (error) {
    yield put(setError(getErrorMessage(error)));
  }
}

function* fetchMovieByIdSaga(action: PayloadAction<string>): SagaIterator {
  try {
    const movie = yield call(fetchMovieByIdApi, action.payload);
    yield put(fetchMovieSuccess(movie));
  } catch {
    yield put(setError(""));
  }
}

function* addMovieSaga(action: PayloadAction<MoviePayload>): SagaIterator {
  try {
    const movie = yield call(postAddMovieApi, action.payload);
    yield put(addMovieSuccess(movie));
    yield put(closeModal());
    yield put(fetchFilteredMoviesRequest());
  } catch (error) {
    yield put(setError(getErrorMessage(error)));
  }
}

function* editMovieSaga(action: PayloadAction<Movie>): SagaIterator {
  try {
    yield call(postEditMovieApi, action.payload);
    yield put(editMovieSuccess(action.payload));
    yield put(closeModal());
  } catch (error) {
    yield put(setError(getErrorMessage(error)));
  }
}

function* deleteMovieSaga(action: PayloadAction<string>): SagaIterator {
  try {
    yield call(deleteMovieApi, action.payload);
    yield put(deleteMovieSuccess(action.payload));
    yield put(closeModal());
  } catch (error) {
    yield put(setError(getErrorMessage(error)));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(fetchInitialMoviesRequest.type, fetchInitialMoviesSaga),
    takeLatest(fetchFilteredMoviesRequest.type, fetchFilteredMoviesSaga),
    takeLatest(findMoviesByTitleRequest.type, fetchMoviesByTitleSaga),
    takeLatest(fetchMovieRequest.type, fetchMovieByIdSaga),
    takeLatest(addMovieRequest.type, addMovieSaga),
    takeLatest(editMovieRequest.type, editMovieSaga),
    takeLatest(deleteMovieRequest.type, deleteMovieSaga),
  ]);
}
