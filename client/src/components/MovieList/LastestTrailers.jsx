/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getLastestMovies } from "../../services/MovieServices";
import { TrailerList } from "./TrailerList";

export function LastestTrailers() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
      const fetchData = async() => {
        const {data} = await getLastestMovies(6);
        setMovies(data.data)
        setLoading(false);
      }
      fetchData();
      
  }, []);

  const trailers = movies?.map((movie) => 
    ({ trailer: movie.trailers?.[0], title: movie.title }))
    .filter(({ trailer }) => trailer)
    .slice(0, 4)
    .map(({ trailer, title }) => ({ ...trailer, title }));
    
  return (
    <div className="mx-4 my-4">
      <p className="text-2xl font-bold">Lastest Trailer</p>
      <TrailerList trailers={trailers} loading={loading}/>
    </div>
  );
}
