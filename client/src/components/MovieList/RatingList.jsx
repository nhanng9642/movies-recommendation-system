/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MovieList } from "./MovieList";
import { getFavoriteMovies } from "../../services/FavoriteMovieService";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

export function RatingList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
      const fetchData = async() => {
        const {data} = await getFavoriteMovies();
        const moviesData = data.movies.map((movie) => {
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
    <div className="mx-4 my-4">
      <div className="flex">
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
      
      <MovieList movies={movies} loading={loading}/>
    </div>
  );
}
