/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MovieList } from "./MovieList";
import { getPopularMovies } from "../../services/MovieServices";

export function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
      const fetchData = async() => {
        const {data} = await getPopularMovies();
        setMovies(data.data)
        setLoading(false);
      }
      fetchData();
      
  }, []);

  return (
    <div className="mx-4 my-4">
      <p className="text-2xl font-bold">Popular Movies</p>
      <MovieList movies={movies} loading={loading}/>
    </div>
  );
}
