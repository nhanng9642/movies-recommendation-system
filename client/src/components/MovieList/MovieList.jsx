/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { CircularProgressBar } from "../CircleProgessBar";

const defaultMovieImage = import.meta.env.VITE_DEFAULT_IMAGE || "/movies-recommendation-system/movie.jpg";

export function MovieList({movies, loading}) {

  return (
    <div className="mx-4 my-2 flex justify-center">
        {loading && <Loading />}
        {!loading && <div className="grid grid-cols-2 h-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {movies?.map((movie, index) => (
                <div key={`${movie.id}${index}`} className="m-[6px] group">
                    <Link to={`/movie/${movie._id}`}>
                        <div className="relative rounded-lg border border-gray-300">
                            <div className="aspect-w-2 aspect-h-3">
                                <img
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultMovieImage}
                                    alt={movie.title}
                                    title={movie.title}
                                    className="group-hover:scale-105 transition-transform duration-300 rounded-lg object-cover h-full"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 text-white text-sm font-bold rounded-full p-1 m-1 flex items-center justify-center w-11 h-11">
                                <CircularProgressBar percentage={movie.vote_average / 10} />
                            </div>
                        </div>
                        <p className="mt-1 text-sm font-bold">{movie.title}</p>
                        <p className="text-sm text-gray-600">{new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                    </Link>
                </div>
            ))}
        </div>}
    </div>
);;
}
