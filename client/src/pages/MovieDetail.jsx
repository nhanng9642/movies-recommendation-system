import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { getMovieDetail} from "../services/MovieServices.js";
import {CircularProgressBar} from "../components/CircleProgessBar.jsx";
import {ListButton, HeartButton} from "../components/MovieButton"
import Loading from "../components/Loading.jsx";
import { Castcard } from "../components/CastCard.jsx";
import { Typography } from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { MovieList } from "../components/MovieList/MovieList.jsx";
import { getSimilarMovies } from "../services/RecommendationService.js";
import { Comment } from "../components/Comment.jsx";
import { NotificationRequestLogin } from "../components/NotificationRequestLogin.jsx";
import { RatingButton } from "../components/MovieButton/RatingButton.jsx";

const defaultMovieImage = import.meta.env.VITE_DEFAULT_IMAGE || "/movies-recommendation-system/movie.jpg";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const [errorSimilar, setErrorSimilar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);

  const handleOpen = () => {
    setOpen(old => !old);
  }

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await getMovieDetail(id);
        setMovie(data);
      } catch (error) {
        console.error(error.message);
        setError(error);
      }
    }

    const fetchSimilarMovies = async () => {
      try {
        setLoading(true);
        const data = await getSimilarMovies(id);
        setSimilarMovies(data.slice(0, 7));
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setErrorSimilar(error);
      }
    }

    window.scrollTo(0, 0);
    fetchMovie();
    fetchSimilarMovies();
  }, [id]);

  if (!movie && !error) return <Loading />;

  const topActorList = movie?.credits?.cast.length > 5 ? movie?.credits?.cast.slice(0, 5) : movie?.credits?.cast;
  return (
    error ? <Typography variant="h4" className="mt-2 px-4">Movie Not found</Typography> :
    <>
    <div
      className="w-full bg-cover bg-center flex justify-center flex-wrap"
      style={{
        backgroundImage: `
          linear-gradient(
            to right, 
            rgba(199.5, 220.5, 220.5, 1) calc((50vw - 170px) - 340px), 
            rgba(199.5, 220.5, 220.5, 0.84) 50%, 
            rgba(199.5, 220.5, 220.5, 0.84) 100%
          ), 
          url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})
        `,
      }}
    >
      <div className="flex flex-col md:flex-row w-full px-4 md:px-10 py-6 md:py-10 max-w-[1400px] mx-auto">
        {/* Poster Section */}
        <div className="flex items-center justify-center mb-6 md:mb-0 min-w-[300px] md:w-[300px] h-auto">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` : defaultMovieImage}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center pl-0 md:pl-10">
          {/* Title and Metadata */}
          <div className="w-full mb-6 flex flex-wrap box-border">
            <h2 className="w-full text-xl md:text-2xl lg:text-3xl font-semibold leading-none">
              {movie.title}
              <span className="opacity-80 font-normal pl-2 text-lg">
                {`(${movie.release_date?.split('-')[0]})`}
              </span>
            </h2>
            <div className="text-sm md:text-base">
              <span>
                {`${movie.release_date} (${movie.origin_country?.join(', ')})`}
              </span>
              <span className="separator mx-2">•</span>
              <span>
                {movie.genres && movie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    <Link
                      to={`/genre/${genre.id}`}
                      className="text-black text-[14px] md:text-[16px] hover:text-opacity-60 no-underline"
                    >
                      {genre.name}
                    </Link>
                    {index < movie.genres.length - 1 && ", "}
                  </span>
                ))}
              </span>
              <span className="separator mx-2">•</span>
              <span>
                {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
              </span>
            </div>
          </div>

          {/* User Score and Buttons */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center mr-4">
                <div className="w-[50px] h-[50px]">
                  <CircularProgressBar percentage={movie.vote_average / 10} />
                </div>
                <div className="text font-bold ml-2">
                  User <br /> Score
                </div>
              </div>

              <RatingButton
                movieId={movie?._id}
                handleOpen={handleOpen}
                ratingNumber={movie?.rating}
                quantityRating={movie?.ratingQuantity}
              />
            </div>

            <ul className="mt-4 flex items-center space-x-4">
              <li>
                <ListButton movieId={movie._id} handleDialogOpen={handleOpen} />
              </li>
              <li>
                <HeartButton handleOpen={handleOpen} movieId={movie._id} />
              </li>
            </ul>
          </div>

          {/* Overview */}
          <div>
            <h3 className="tagline text-sm md:text-base font-normal italic opacity-70">
              {movie.tagline}
            </h3>
            <h3 className="text-base md:text-lg mt-2 mb-2 font-semibold">
              Overview
            </h3>
            <p className="text-sm md:text-base leading-6">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-2 mx-4">
      <div className="flex justify-between items-center">
        <Typography variant="h4" className="text-gray-800 font-bold">
          Top Actor
        </Typography>

        <Link to="cast">
          <button
            className="text-gray-600 hover:text-blue-600 font-medium"
            onClick={() => {}}
          >
            <ArrowRightIcon width={40} height={40} />
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap mt-4 gap-4 justify-center md:justify-start">
        {topActorList?.map((cast) => (
          <div 
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-2" 
            key={cast.id}
          >
            <Castcard cast={cast} />
          </div>
        ))}

        {!loading && topActorList?.length === 0 && (
          <Typography variant="h5" className="mt-2 px-4 text-center">
            No Actor Found
          </Typography>
        )}
      </div>
    </div>


    <div className="mt-2 ml-4">
      <Typography variant="h4" className="text-gray-800 font-bold">
        Similar Movies
      </Typography>
      
      {errorSimilar && <Typography variant="h5" className="mt-2 px-4">Error: {errorSimilar.message}</Typography>}
      {!errorSimilar && <MovieList movies={similarMovies} loading={loading} />}

    </div>

    <Comment moviedId={movie._id} handleOpen={handleOpen}/>

    <NotificationRequestLogin open={open} handleOpen={handleOpen} 
      redirect={`movie/${movie?._id}`} />
    </>
  );
}
