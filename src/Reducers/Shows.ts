import produce from "immer"
import { normalize, schema } from "normalizr"
import { Action } from "../Actions"
import { FETCH_SHOWS_DATA, SHOWS_DATA_FETCHED } from "../Actions/Shows"
import { Actor } from "../Models/Actor"
import { Show } from "../Models/Show"


type state = {
 shows: {[showId: number]: Show};
 query_shows: {[showQuery: string]: number[]};
 showsLoading: boolean;
 query: string;
}


const initialState: state = {
    shows: {},
    query_shows: {},
    showsLoading: false,
    query: ""
}

const showsReducer = (state = initialState, action: Action) => {
 switch(action.type){
  case FETCH_SHOWS_DATA : {
    return produce(state , (draft) => {
    draft.query = action.payload;
    draft.showsLoading = true
    })
  }
  case SHOWS_DATA_FETCHED : {
    const showsArray = action.payload as {shows: Show, actors:  Actor[]}[]
    const normalizedShowsWithCast = showsArray.reduce((acc, curr) => (
     {...acc, [curr.shows.id]: {...curr.shows, cast: [...curr.actors]}}
    ), {})
    const normalizeShowId = showsArray.map(e => e.shows.id)
    return produce(state, draft => {
        draft.shows = {...draft.shows, ...normalizedShowsWithCast};
        draft.showsLoading = false;
        draft.query_shows[draft.query] = normalizeShowId
    })
  }

  default: return state
 }
}

export default showsReducer;