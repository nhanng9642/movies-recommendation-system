/* eslint-disable react/prop-types */
const defaultMovieImage = import.meta.env.VITE_DEFAULT_IMAGE || "/movies-recommendation-system/movie.jpg";

const dateFormat = (d) => {
  const date = new Date(d);
  return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
}

export const MovieLanscapeCard = ( {movie}) => {
  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-[180px] rounded overflow-hidden border-t border-l"
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}` : defaultMovieImage}
            alt={movie.title}
          />
        </div>

        <div className="p-4 text-base">
          <div className="flex">
            <p className="text-base text-indigo-500 font-semibold">
              {movie.title}
            </p>
            {movie.title != movie.original_title &&
              <p className="ml-2 text-gray-600">
              ({movie.original_title})
            </p>
            }
          </div>
          <p className="text-gray-500">
            {dateFormat(movie.release_date)}
          </p>
          <p className="mt-2">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

