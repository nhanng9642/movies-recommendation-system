/* eslint-disable react/prop-types */
import { HeartIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { changeFavoriteStatus, getStatusFavorite } from "../../services/FavoriteMovieService";

export function HeartButton( {movieId, handleOpen} ) {

  const [isLove, setIsLove] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchAllFavoriteMovies = async () => {
      const { data } = await getStatusFavorite(movieId);
      setIsLove(data);
    }
    if (user)
      fetchAllFavoriteMovies();
  }, [movieId, user])

  const handleClick = async () => {
    if (!user){
      handleOpen(true);
      return;
    }
    setIsLove(!isLove);
    await changeFavoriteStatus(movieId);
  }

  return (
    <button onClick={handleClick}
          className="flex items-center justify-center bg-[#1E2A47] rounded-full w-[48px] h-[48px] hover:bg-[#253d60] transition-all duration-300">
      <HeartIcon className={`h-[24px] w-[24px] ${isLove ? "text-red-600" : "text-white"}`} />
    </button>
  );
}