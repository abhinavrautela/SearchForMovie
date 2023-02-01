import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Actor } from "../Models/Actor";
import { Show } from "../Models/Show";

type state = typeof initialState;

const showAdapter = createEntityAdapter<Show>();

const initialState = showAdapter.getInitialState({
  entities: {} as { [showId: number]: Show },
  query_shows: {} as { [showQuery: string]: number[] },
  showsLoading: false,
  query: "",
});

export const showSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    fetchShow,
    fetchedShows,
  },
});

function fetchShow(state: state, action: PayloadAction<string>) {
  state.query = action.payload;
  state.showsLoading = true;
}

function fetchedShows(
  state: state,
  action: PayloadAction<{ shows: Show; actors: Actor[] }[]>
) {
  const showsArray = action.payload;
  const normalizedShowsWithCast = showsArray.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.shows.id]: { ...curr.shows, cast: [...curr.actors] },
    }),
    {}
  );
  state.entities = { ...state.entities, ...normalizedShowsWithCast };
  state.showsLoading = false;
  state.query_shows[state.query] = showsArray.map((e) => e.shows.id);
}

const { actions, reducer: showsReducer } = showSlice;

export const { fetchShow: fetchShowsData, fetchedShows: fetchedShowsData } =
  actions;

export default showsReducer;
