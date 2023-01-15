import axios from "axios"
import { Actor } from "./Models/Actor"
import { Show } from "./Models/Show"

const BASE_URL = "https://api.tvmaze.com/"

export const getShowDetail = async (showId: number) => {
   const response = await axios.get<Show>(BASE_URL + "shows/"+ showId)
   return response.data
}

export const getShowCast = async (showId: number) => {
   const response = await axios.get<{person: Actor}[]>(BASE_URL + `shows/${showId}/cast`)
   return response.data.map(e => e.person)
}


export const getShows = async (query: string) => {
    const response = await axios.get<{show: Show}[]>(BASE_URL + "search/shows?q=" + query)
    const shows = response.data.map(sl => sl.show)
    let castPromises = [];
    for(let i=0; i<shows.length; i++){
      castPromises.push(getCast(shows[i]))
    }
  return Promise.all(castPromises)
}

const getCast = async (shows: Show) => {
const castResponse = await axios.get<{person: Actor}[]>(BASE_URL + `shows/${shows.id}/cast`)
 const actors = castResponse.data.map(e => e.person)
 return {shows, actors}
}