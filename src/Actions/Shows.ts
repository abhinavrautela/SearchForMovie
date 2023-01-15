import { ActionCreator } from "."
import { Actor } from "../Models/Actor"
import { Show } from "../Models/Show"
export const FETCH_SHOWS_DATA = "FETCH_SHOWS_DATA"
export const SHOWS_DATA_FETCHED = "SHOWS_DATA_FETCHED"
export const FETCH_SHOW_DETAIL = "FETCH_SHOW_DETAIL"
export const FETCHED_SHOW_DETAIL = "FETCHED_SHOW_DETAIL"
export const FETCH_CAST = "FETCH_CAST"
export const CAST_FETCHED = "CAST_FETCHED"


export const fetchShowsData: ActionCreator<string> = (query: string) => ({type : FETCH_SHOWS_DATA, payload: query})
export const fetchedShowsData: ActionCreator = (showsDetail) => ({type : SHOWS_DATA_FETCHED, payload: showsDetail})
export const fetchShowDetail: ActionCreator<number> = (id: number) => ({type: FETCH_SHOW_DETAIL, payload: id})
export const fetchedShowDetail: ActionCreator<Show> = ( showDetail: Show) => ({type: FETCHED_SHOW_DETAIL, payload: showDetail})
export const fetchShowCast: ActionCreator<number> = (showId: number) => ({type: FETCH_CAST, payload: showId})
export const fetchdShowCast: ActionCreator<Actor[]> = (cast: Actor[]) => ({type: CAST_FETCHED, payload: cast})
