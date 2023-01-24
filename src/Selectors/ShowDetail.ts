import { createSelector } from "reselect";
import { State } from "../store";

const showDetailStateSelector = (s: State) => s.ShowsDetail


export const showDetailSelector = createSelector(showDetailStateSelector, (showDetailState) => {
  return showDetailState.entities
})

export const showCastSelector = createSelector(showDetailStateSelector, (showDetailState)=> {
    const normalizedCast =  showDetailState.cast
    return Object.keys(normalizedCast).map(id => normalizedCast[+id])
})

export const showDetailLoadingSelector = createSelector(showDetailStateSelector, showDetailState => {
  return showDetailState.detailLoading
})

export const castLoadingSelector = createSelector(showDetailStateSelector, showDetailState => {
  return showDetailState.castLoading
})