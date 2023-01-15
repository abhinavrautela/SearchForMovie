import { createSelector } from "reselect";
import { State } from "../store";

const showStateSelector = (s: State) => s.Shows


const normalizedShowSelector = createSelector(showStateSelector, (showsState) => {
return showsState.shows  
})

export const showloadingSelector = createSelector(showStateSelector, showState => {
  return showState.showsLoading
})

export const showQuerySelector = createSelector(showStateSelector, (showsState) => {
    return showsState.query
})

const showAgainstQuerySelector = createSelector(showStateSelector, showState => {
  return showState.query_shows
})

export const showMapSelector = createSelector(normalizedShowSelector, showQuerySelector, showAgainstQuerySelector, (normlizedShow, query, showAgaintQuery) => {
  return showAgaintQuery[query]?.map(showId => normlizedShow[showId])
})

