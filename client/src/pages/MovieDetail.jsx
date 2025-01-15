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
      className="w-full bg-cover bg-center justify-center flex-wrap"
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
      <div className="flex w-full px-[40px] py-[30px] max-w-[1400px] mx-auto">
        <div className="flex items-center min-w-[300px] w-[300px] h-[450px]">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` : defaultMovieImage}
            className="w-full max-w-[400px] rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center pl-[40px]">
          <div className="w-full mb-[24px] flex flex-wrap box-border">
            <h2 className="w-full m-0 p-0 text-[36px] font-semibold leading-none">
              {movie.title}
              <span className="opacity-80 font-normal pl-[8px]">
                {`(${movie.release_date?.split('-')[0]})`}
              </span>
            </h2>
            <div>
              <span>
                {`${movie.release_date} (${movie.origin_country?.join(', ')})`}
              </span>
              <span className="separator mx-[8px]">•</span>
              <span>
                {movie.genres && movie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    <Link
                      to={`/genre/${genre.id}`}
                      className="text-black text-[16px] hover:text-opacity-60 no-underline"
                    >
                      {genre.name}
                    </Link>
                    {index < movie.genres.length - 1 && ", "}
                  </span>
                ))}
              </span>
              <span className="separator mx-[8px]">•</span>
              <span>
                {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div className="flex items-center justify-center">
                <div className="w-[60px] h-[60px]">
                  <CircularProgressBar percentage={movie.vote_average / 10} />
                </div>
                <div className="text font-bold ml-1">
                  User <br/> Score
                </div>

                <RatingButton movieId={movie?._id} 
                              handleOpen={handleOpen}
                              ratingNumber={movie?.rating}
                              quantityRating={movie?.ratingQuantity}/>
              </div>

            </div>
            <ul className="mb-[20px] w-full h-[68px] flex items-center justify-start list-none">
              <li className="py-[3px] mr-[20px]">
                <ListButton movieId={movie._id} handleDialogOpen={handleOpen}/>
              </li>
              <li className="py-[3px] mr-[20px]">
                <HeartButton handleOpen={handleOpen} movieId={movie._id}/>
              </li>
            </ul>
          </div>
          <div>
            <h3
              className="tagline text-[17.6px] font-normal italic opacity-70"
            >
              {movie.tagline}
            </h3>
            <h3
              className="text-[20.8px] mt-[10px] mb-[8px] font-semibold"
            >
              Overview
            </h3>
            <p className="leading-6">
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
                  <ArrowRightIcon width={40} height={40}/>
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap mt-1 gap-4 justify-center items-center">
        {topActorList?.map((cast) => (
          <div className="w-1/6 p-2" key={cast.id}>
            <Castcard cast={cast} />
          </div>
        ))}

        {
          !loading && topActorList?.length === 0 && 
          <Typography variant="h5" className="mt-2 px-4">No Actor found</Typography>
        }
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