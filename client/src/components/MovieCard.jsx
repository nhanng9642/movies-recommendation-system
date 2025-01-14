/* eslint-disable react/prop-types */

const defaultMovieImage = import.meta.env.VITE_DEFAULT_IMAGE || "/movies-recommendation-system/movie.jpg";

const MovieCard = ({ movie }) => {
  const { title, poster_path, release_date, overview } = movie;
  const poster = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultMovieImage;
  console.log(poster);
  
  return (
    <div className="max-w-sm h-full rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full " src={poster} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-500 text-sm">{release_date}</p>
        <p className="text-gray-700 text-base mt-2">
          {overview?.slice(0, 50) + "..."}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
