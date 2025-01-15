/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MovieList } from "./MovieList";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { getAllRatingMovie } from "../../services/RatingService";

export function RatingList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
      const fetchData = async() => {
        const {data} = await getAllRatingMovie();
        const moviesData = data.result.map((movie) => {
          return {
            ...movie.movieId,
            isFavorite: true,
          };
        });
        
        setMovies(moviesData)
        setLoading(false);
      }
      fetchData();
  }, []);

  return (
    <div className="mx-6 my-4">
      <div className="flex justify-between">
        <p className="text-2xl font-bold mr-4">My Ratings</p>
        <Link to="/profile/rating-movie">
          <button 
              className="flex items-center text-gray-600 hover:text-blue-600 font-medium"
              onClick={() => {}} 
          >
                  <ArrowRightIcon width={32} height={32}/>
          </button>
        </Link>
      </div>

      {movies?.length === 0 && !loading && <div className="mt-4">
        Your rating list is currently empty.
        <Link to="/" className="ml-2 hover:text-blue-600 hover:underline font-normal">
          Start rating movies!
        </Link>
      </div>}
      <MovieList movies={movies} loading={loading}/>
    </div>
  );
}
