import createSagaMiddleware from "@redux-saga/core";
import { call, put, takeLatest, debounce} from "redux-saga/effects"
import { Action } from "./Actions";
import { fetchdShowCast, fetchedShowDetail, fetchedShowsData, FETCH_CAST, FETCH_SHOWS_DATA, FETCH_SHOW_DETAIL } from "./Actions/Shows";
import { getShowCast, getShowDetail, getShows } from "./api";


export const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
   yield debounce(200,FETCH_SHOWS_DATA, fetchShowsSaga);
   yield takeLatest(FETCH_SHOW_DETAIL, fetchShowDetailSaga)
   yield takeLatest(FETCH_CAST, fetchShowCastSaga)
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