/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MovieList } from "./MovieList";
import { ToggleButton } from "../ToggleButton";
import { getTrendingMovies } from "../../services/MovieServices";
const tabs = [{name: 'Today', value: 'day'}, {name: 'This Week', value: 'week'}];

export function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
      const movies = getTrendingMovies(activeTab.value);
      movies.then((data) => {
          setMovies(data.results.slice(0, 14));
          setLoading(false);
      });
  }, [activeTab]);

  return (
    <div className="mx-4 my-4">
      <ToggleButton activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <MovieList movies={movies} loading={loading}/>
    </div>
  );
}
