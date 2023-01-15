import produce from "immer"
import { normalize, schema } from "normalizr"
import { Action } from "../Actions"
import { CAST_FETCHED, FETCHED_SHOW_DETAIL, FETCH_CAST, FETCH_SHOW_DETAIL, SHOWS_DATA_FETCHED } from "../Actions/Shows"
import { Actor } from "../Models/Actor"
import { Show } from "../Models/Show"


type state = {
 detail: {[showId: number]: Show}
 detailLoading: {[showId: number]: boolean};
 cast: {[showId: number]: Actor}
 castLoading: boolean
}


const initialState: state = {
    detail: {},
    detailLoading: {},
    cast: {},
    castLoading: false
}

const showDetailReducer = (state = initialState, action: Action) => {
 switch(action.type){
    case SHOWS_DATA_FETCHED : {
    const showsObj = action.payload as {shows: Show}[]
     const normalizedShows = showsObj.reduce((acc, curr) =>({...acc, [curr.shows.id]: {...curr.shows}}), {})
    return produce(state, draft => {
        draft.detail = {...draft.detail, ...normalizedShows}
    })
  }
  case FETCH_SHOW_DETAIL : {
    const showId = action.payload as number
    return produce(state,  draft => { draft.detailLoading[showId] = true })
  }
  case FETCHED_SHOW_DETAIL : {
    const showDetail = action.payload as Show
    const normalizedShowDetail = {[showDetail.id]: showDetail}
    return produce(state, draft => {
        draft.detail = {...draft.detail, ...normalizedShowDetail}
        draft.detailLoading[showDetail.id] = false
    })
  }
  case FETCH_CAST: {
     return produce(state,  draft => { draft.castLoading = true })
  }
  case CAST_FETCHED: {
    const cast = action.payload as  Actor[]
    const castEntity = new schema.Entity("cast")
    const normalized = normalize(cast, [castEntity])
    const normalizedCast = normalized.entities.cast
    return produce(state, draft => {
        draft.cast = {...normalizedCast};
        draft.castLoading = false
    })
  }
  default: return state
 }

}

export default showDetailReducer;