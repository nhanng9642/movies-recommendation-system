import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { TrendingMovies } from "../components/MovieList/TrendingMovies";
import { Banner } from "../components/Banner";
import { PopularMovies } from "../components/MovieList/PopularMovies";
import { LastestTrailers } from "../components/MovieList/LastestTrailers";

export default function Home() {
  const [params, setParams]= useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setParams({});
    }
  }, [navigate, setParams, token]);

  return (
    <div>
      <Banner />
      <TrendingMovies  />
      <LastestTrailers />
      <PopularMovies />
    </div>
  );
}
