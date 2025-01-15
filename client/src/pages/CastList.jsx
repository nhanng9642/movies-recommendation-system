import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { getMovieDetail} from "../services/MovieServices.js";
import Loading from "../components/Loading.jsx";
import { Typography } from "@material-tailwind/react";
import { CastCardLanscape } from "../components/CastCardLanscape.jsx";

export default function CastList() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await getMovieDetail(id);
        setMovie(data);
      } catch (error) {
        console.err(error.message);
        setError(error);
      }
    }
    fetchMovie();
  }, [id]);

  if (!movie && !error) return <Loading />;

  const castList = movie?.credits;
  return (
    error ? <Typography variant="h4" className="mt-2 px-4">Movie Not found</Typography> :
    <>
    <div className="mt-2 ml-4">
      <Typography variant="h4" className="text-gray-800 font-bold">
        Actor List of 
        <Link to={`/movie/${movie._id}`} className="ml-2">
          Movie {movie.title}
        </Link>
      </Typography>

      <div className="flex flex-row flex-wrap gap-x-4 justify-around">
        <div className="flex flex-col flex-wrap gap-4 w-1/3 mt-2">
          <Typography variant="h6" className="text-gray-800 font-bold">
            {castList?.cast.length} Cast
          </Typography>
          {castList?.cast.map((cast) => (
            <div className="p-2" key={cast.id}>
              <CastCardLanscape cast={cast} flexCol />
            </div>
          ))}
        </div>

        <div className="flex flex-col flex-wrap gap-4 w-1/3 mt-2">
          <Typography variant="h6" className="text-gray-800 font-bold">
            {castList?.crew?.length} Crew
          </Typography>
          {castList?.crew?.map((crew) => (
            <div className="p-2" key={crew.id}>
              <CastCardLanscape cast={crew} flexCol />
            </div>
          ))}
        </div>
      </div>

    </div>
      
    </>
  );
}
