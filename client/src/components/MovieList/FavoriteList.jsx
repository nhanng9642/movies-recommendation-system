/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MovieList } from "./MovieList";
import { getFavoriteMovies } from "../../services/FavoriteMovieService";

export function FavoriteList() {
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
      <p className="text-2xl font-bold">Favorite Movies</p>
      <MovieList movies={movies} loading={loading}/>
    </div>
  );
}
