import { FC, memo, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import LoadingSpinner from "../Components/LoadingSpinner";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import {
  castLoadingSelector,
  showCastSelector,
  showDetailLoadingSelector,
  showDetailSelector,
} from "../Selectors/ShowDetail";
import { fetchShowCast, fetchShowDetail } from "../Slices/showDetail";
import { State } from "../store";

type ShowDetailPageProps = WithRouterProps & ReduxProp;

const ShowDetailPage: FC<ShowDetailPageProps> = ({
  params,
  getShowDetails,
  showDetail,
  getShowCast,
  showCast,
  castLoading,
  showDetailLoading,
}) => {
  useEffect(() => {
    const showId = +params.show_id;
    getShowDetails(showId);
    getShowCast(showId);
  }, []);

  if (!showDetail) {
    return (
      <div className="font-bold text-7xl flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mt-2">
      <h2 className="text-4xl font-semibold tracking-wide"></h2>
      <div className="flex my-2 bg-gray-300 p-2 rounded-sm justify-between">
        <div className="flex space-x-2">
          {showDetail.genres.length
            ? showDetail.genres.map((g) => <GenrePill name={g} />)
            : "Genres Not Avilable"}
        </div>
        {showDetailLoading && (
          <div className="flex items-center font-thin text-purple-900">
            {" "}
            Loading
            <LoadingSpinner />{" "}
          </div>
        )}
      </div>
      <div className="mt-2 flex">
        <img
          src={
            showDetail.image?.original ||
            "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
          }
          alt=""
          className="object-cover rounded-t-md h-72"
        />
        <div className="ml-2">
          <h1 className="text-4xl font-thin tracking-tighter underline text-stone-800">
            #{showDetail.name}
          </h1>
          <h3 className="font-extrabold text-xl text-purple-800 mt-3">
            Discription:{" "}
          </h3>
          <p
            dangerouslySetInnerHTML={{
              __html: showDetail.summary || "Not Avilable",
            }}
          />
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating:{" "}
            <span className="text-gray-700">
              {showDetail.rating?.average || 5} / 10
            </span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap">
          {castLoading ? (
            <span className="text-2xl mt-3 font-mono flex items-center">
              Loading
              <LoadingSpinner />{" "}
            </span>
          ) : (
            <>
              {showCast.length != 0 ? (
                showCast.map((sc) => (
                  <CastCard
                    key={sc.id}
                    avatarLink={
                      sc.image?.medium ||
                      "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
                    }
                    name={sc.name}
                  />
                ))
              ) : (
                <h1>Cast is Not Avilable</h1>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (s: State, { params }: WithRouterProps) => {
  const showId = +params.show_id;
  return {
    showDetail: showDetailSelector(s)[showId],
    showCast: showCastSelector(s),
    showDetailLoading: showDetailLoadingSelector(s)[showId],
    castLoading: castLoadingSelector(s),
  };
};
const mapDispatchToProps = {
  getShowDetails: fetchShowDetail,
  getShowCast: fetchShowCast,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProp = ConnectedProps<typeof connector>;

export default withRouter(connector(memo(ShowDetailPage)));
