/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export function RecommendationMovieList() {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const message = messages.find((message) => message.id === id);
    setMovies(message?.data || []);
    setText(message?.text);
    setLoading(false);
  }, [id]);

  return (
    <div className="mx-4 my-4">
        {loading && <Loading />}
        <h3 className="text-xl font-bold">{text}</h3>
        {!loading && <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6 mt-4">
          {movies?.length === 0 && <p>No movies found</p>}
          {
            movies?.map((movie) =>
              <Link to={`/movie/${movie._id}`} key={movie._id}>
                <MovieCard movie={movie} key={movie._id} />
              </Link>
            )
          }
        </div>}
    </div>
);;
}
