import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWatchingListDetail } from "../services/WatchListService";
import Loading from "../components/Loading";
import { MovieLanscapeCard } from "../components/MovieList/MovieLanscapeCard";


export function WatchListDetail() {
  const urlParams = useParams();
  const id = urlParams.id;

  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState({});

  useEffect(() => {
    const fetchWatchListDetail = async () => {
      setIsLoading(true);
      const { data } = await getWatchingListDetail(id);
      setWatchList(data);
      setMovies(data.movies);
      setIsLoading(false);
    };
    
    fetchWatchListDetail();
  }, [id]);

  if (isLoading) 
    return <Loading />;

  return (
    <div className="px-6 flex flex-col justify-between mt-4">
      <p className="text-2xl font-bold mr-4">{watchList.name} ({movies?.length > 1 ? `${movies?.length} movies` : `${movies?.length} movie`})
      </p>
      {watchList.description && <p className="text-gray-700">{watchList.description}</p>}

      <div className="grid grid-cols-1 gap-4 mt-6">
        {movies?.length === 0 && <p>Empty watch list</p>}
        {!isLoading &&
          movies?.map((movie) =>
            <Link to={`/movie/${movie._id}`} key={movie._id}>
              <MovieLanscapeCard movie={movie} key={movie._id} />
            </Link>
          )
        }
      </div>
    </div>

  );
}
