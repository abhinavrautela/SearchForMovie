import { Actor } from "./Actor";

export interface Show {
    id:             number;
    url:            string;
    name:           string;
    type:           string;
    language:       string;
    genres:         string[];
    rating:         Rating;
    image:         {
    medium:         string;
    original:       string;
    }
    summary:       string;
    cast:          Actor[]
}
 interface Rating {
    average: null;
}
