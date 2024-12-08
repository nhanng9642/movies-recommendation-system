import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import * as MovieServices from "../services/MovieServices";
function SearchResult() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([1, 2, 3, 4, 5, 6]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("query") || null;
    const page = searchParams.get("page") || 1;
    async function fetchMovies() {
      setIsLoading(true);
      const response = await MovieServices.searchMovies(
        new URLSearchParams({ query: search, page })
      );
      setIsLoading(false);
      setTotalPages(response.total_pages);
      setMovies(response.results);
    }

    if (search) {
      fetchMovies();
    }
  }, [searchParams]);

  return (
    <div className="container p-5 mx-auto h-screen flex gap-3">
      <div className="text-white w-2/6 border max-h-[300px] rounded-md p-4">
        <h3 className="bg-blue-400 font-bold text-xl mb-1 rounded-md p-3">
          Search Results
        </h3>
        <div>
          <div className="flex justify-between text-black items-center p-2 bg-gray-200 rounded-md mb-2">
            <span className="font-medium">Movies</span>
            <span className="text-sm">1,103</span>
          </div>
          <div className="flex justify-between text-black items-center p-2 rounded-md mb-2">
            <span className="font-medium">TV</span>
            <span className="text-sm">10,000</span>
          </div>
          <div className="flex justify-between text-black items-center p-2 rounded-md mb-2">
            <span className="font-medium">People</span>
            <span className="text-sm">1,487</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading && <p>Loading...</p>}
          {movies.length === 0 && <p>No movies found</p>}
          {!isLoading &&
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
        <div className="mb-5">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
