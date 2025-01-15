import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Link, useSearchParams } from "react-router-dom";
import { MovieLanscapeCard } from "../components/MovieList/MovieLanscapeCard";
import { CircularPagination } from "../components/CircularPagination";
import { getFavoriteMovies } from "../services/FavoriteMovieService";


export function FavoritePagnation() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useSearchParams();

  const updatePage = (page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
    setParams(prevParams => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("page", page);
        return newParams;
    });
  }

  console.log(movies);
  const page = +params.get("page") || 1;
  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      const { data } = await getFavoriteMovies(page);
      const movies = data.movies.map((movie) => {
        return {
          ...movie.movieId
        };
      });
      
      setIsLoading(false);
      setTotalPages(data.totalPages);
      setMovies(movies);
    }

    fetchMovies();
  }, [page]);

  return (
    <div className="px-6 flex flex-col justify-between mt-4">
      <p className="text-2xl font-bold mr-4">My Favorites</p>
      <div className="grid grid-cols-1 gap-4 mt-2">
        {isLoading && <Loading />}
        {movies?.length === 0 && <p>No movies found</p>}
        {!isLoading &&
          movies?.map((movie) =>
            <Link to={`/movie/${movie._id}`} key={movie._id}>
              <MovieLanscapeCard movie={movie} key={movie._id} />
            </Link>
          )
        }
      </div>

      <CircularPagination
            totalPage={totalPages}
            currentPage={currentPage}
            setCurrentPage={updatePage}
        />
    </div>
  )
};
