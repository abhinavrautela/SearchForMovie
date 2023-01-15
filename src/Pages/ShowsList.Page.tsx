import { FC, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchShowsData } from "../Actions/Shows";
import LoadingSpinner from "../Components/LoadingSpinner";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { showloadingSelector, showMapSelector, showQuerySelector } from "../Selectors/Show";
import { showCastSelector } from "../Selectors/ShowDetail";
import { State } from "../store";

type ShowListPageProps = ReduxProp 

const ShowListPage: FC<ShowListPageProps> = ({fetchShows, query, shows, loading}) => {
  return (
    <div className="mt-2">
     {
      <div className="flex items-center space-x-2">
      {loading ? <LoadingSpinner /> : <div className="w-4"></div>}
      <SearchBar value={query} onChange={(e) => {
        fetchShows(e.target.value)
      }}/>
      </div>
      }
     {shows &&
      <div className="flex flex-wrap justify-center">
       {shows.map(sl => <ShowCard key={sl.id} {...sl}/>)}
      </div> 
      }
      {
      shows && shows.length === 0 && query && <div className="flex justify-center mt-80 text-2xl font-bold">Not Found</div>
      }
      {
       !query && <div className="flex justify-center mt-80 text-2xl font-bold">Search for your favourite movie/series</div>
      }
    </div>
  );
}

const mapStateToProps = (s: State) => ({
  query: showQuerySelector(s),
  shows: showMapSelector(s),
  loading: showloadingSelector(s),
})

const mapDispatchToProps = {
  fetchShows: fetchShowsData
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type ReduxProp = ConnectedProps<typeof connector>

export default connector(memo(ShowListPage));
