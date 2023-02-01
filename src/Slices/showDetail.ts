import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import { Actor } from "../Models/Actor";
import { Show } from "../Models/Show";
import { fetchedShowsData } from "./shows";

type state = typeof initialState;

const showDetailAdapter = createEntityAdapter<Show>();

const initialState = showDetailAdapter.getInitialState({
  detailLoading: {} as { [showId: number]: boolean },
  cast: {} as { [showId: number]: Actor },
  castLoading: false,
});

const showDetailSlice = createSlice({
  name: "showDetail",
  initialState,
  reducers: {
    fetchShow,
    showFetched,
    fetchCast,
    castFetched,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchedShowsData, (state, action) => {
      const showsArray = action.payload.map((e) => e.shows);
      showDetailAdapter.addMany(state, showsArray);
    });
  },
});

function fetchShow(state: state, action: PayloadAction<number>) {
  const showId = action.payload;
  state.detailLoading[showId] = true;
}

function showFetched(state: state, action: PayloadAction<Show>) {
  const showDetail = action.payload;
  state.detailLoading[showDetail.id] = false;
  showDetailAdapter.addMany(state, [showDetail]);
}

function fetchCast(state: state, action: PayloadAction<number>) {
  state.castLoading = true;
}

function castFetched(state: state, action: PayloadAction<Actor[]>) {
  const cast = action.payload;
  const castEntity = new schema.Entity("cast");
  const normalized = normalize(cast, [castEntity]);
  const normalizedCast = normalized.entities.cast;
  state.castLoading = false;
  state.cast = { ...normalizedCast };
}

const { actions, reducer: showDetailReducer } = showDetailSlice;

export const {
  fetchShow: fetchShowDetail,
  showFetched: fetchedShowDetail,
  fetchCast: fetchShowCast,
  castFetched: fetchdShowCast,
} = actions;

export default showDetailReducer;
