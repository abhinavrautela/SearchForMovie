import { FC } from "react";
import { Link } from "react-router-dom";
import { Actor } from "../Models/Actor";
import { Show } from "../Models/Show";
import AvatarCard from "./AvatarCard";

type ShowCardType = Partial<Show>

const ShowCard: FC<ShowCardType> = ({name, summary, image, id, cast}) =>  {
  return (
    <div className="max-w-xs rounded-md shadow-md p-2 m-1">
      <img
        src={image?.medium || "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"}
        alt=""
        className="object-cover  w-full rounded-t-md h-72"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{name}</h2>
          <p>
            {summary}
          </p>
        </div>
        {cast && <AvatarCard CastDetail={cast}/> }
        <Link
          to= {`/shows/${id}`}
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-gray-400"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ShowCard;
