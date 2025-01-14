import {Link, useSearchParams} from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { CircularPagination } from "../components/CircularPagination";

import * as MovieServices from "../services/MovieServices";
import { Filter } from "../components/filter/Filter";

function SearchResult() {
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

  useEffect(() => {
    const queryParams = Object.fromEntries(params.entries());
    const page = +params.get("page") || 1;
    setCurrentPage(page);
    
    async function fetchMovies() {
      setIsLoading(true);
      const { data } = await MovieServices.searchMovies(queryParams);
      setIsLoading(false);
      setTotalPages(data.totalPages);
      setMovies(data.data);
    }

    fetchMovies();
  }, [params]);

  return (
    <div className="container p-5 mx-auto mb-2 flex gap-3">
      <Filter />
      
      <div className="flex flex-col w-100">
        <h3 className="font-bold text-xl mb-3 w-100">
                Search results for &quot;{params.get("q")}&quot;
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading && <Loading />}
          {movies?.length === 0 && <p>No movies found</p>}
          {!isLoading &&
            movies?.map((movie) =>
              <Link to={`/movie/${movie._id}`} key={movie._id}>
                <MovieCard movie={movie} key={movie._id} />
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
    </div>
  );
}

export default SearchResult;
