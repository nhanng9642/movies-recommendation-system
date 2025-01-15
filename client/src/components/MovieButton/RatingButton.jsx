/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/16/solid";
import { getCurrentRatingMovie, postRatingMovie } from "../../services/RatingService";
import { useAuth } from "../../contexts/AuthContext";

export const RatingButton = ({ totalStars = 5, movieId, ratingNumber, quantityRating, handleOpen }) => {
  const { user } = useAuth();

  const [currentRating, setCurrentRating] = useState({ratingNumber, quantityRating});

  const [rating, setRating] = useState(0); 
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = async (newRating) => {
    if (!user) {
      handleOpen(true);
      return;
    }
    setRating(newRating);
    const { data } = await postRatingMovie(movieId, newRating);
    setCurrentRating({ratingNumber: parseFloat(data.rating.toFixed(1)) || 0, quantityRating: data.ratingQuantity});
  };

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const { data } = await getCurrentRatingMovie(movieId);
        setRating(data.rating);
      } catch (error) {
        setRating(0);
      }
      
    }
    if (user)
      fetchRating();
  }, [movieId, user]);

  return (
    <div className="flex flex-col ml-6">
      <p >
        <span className="font-bold ml-2 text-lg"> Rating </span>
        <span>({currentRating.ratingNumber}★ / {currentRating.quantityRating} {currentRating.quantityRating > 1 ? "votes" : "vote"})</span>
      </p>
      <div className="flex space-x-1">
        {[...Array(totalStars)].map((_, index) => {
          const starIndex = index + 1;
          return (
            <button
              key={index}
              onClick={() => handleRating(starIndex)}
              onMouseEnter={() => setHoverRating(starIndex)}
              onMouseLeave={() => setHoverRating(0)}
              className={`flex items-center justify-center px-1 rounded-full transition-colors ${
                starIndex <= (hoverRating || rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              aria-label={`Rate ${starIndex}`}
            >
              <StarIcon className="w-6 h-6" />
            </button>
          );
        })}
      </div>
    </div>
    
  );
};

