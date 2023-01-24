import createSagaMiddleware from "@redux-saga/core";
import { call, put, takeLatest, debounce} from "redux-saga/effects"
import { Action } from "./Models/Action";

import { getShowCast, getShowDetail, getShows } from "./api";
import { fetchdShowCast, fetchedShowDetail, fetchShowCast, fetchShowDetail } from "./Slices/showDetail";
import { fetchedShowsData, fetchShowsData } from "./Slices/shows";


export const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
   yield debounce(350,fetchShowsData, fetchShowsSaga);
   yield takeLatest(fetchShowDetail, fetchShowDetailSaga)
   yield takeLatest(fetchShowCast, fetchShowCastSaga)
}

function* fetchShowsSaga(action: Action): Generator<any, any, any>{
  const query = action.payload
  const shows = yield call(getShows, query)
  yield put(fetchedShowsData(shows))
}

function* fetchShowDetailSaga(action: Action): Generator<any, any, any>{
  const showId = action.payload
  const shows = yield call(getShowDetail, showId)
  yield put(fetchedShowDetail(shows))
}

function* fetchShowCastSaga(action: Action): Generator<any, any, any>{
  const showId = action.payload
  const shows = yield call(getShowCast, showId)
  yield put(fetchdShowCast(shows))
}