/* eslint-disable react/prop-types */
import { useState } from "react";
import { StarIcon } from "@heroicons/react/16/solid";
import { postRatingMovie } from "../../services/RatingService";

export const RatingButton = ({ totalStars = 5, movieId, ratingNumber, quantityRating }) => {

  const [currentRating, setCurrentRating] = useState({ratingNumber, quantityRating});

  const [rating, setRating] = useState(0); 
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = async (newRating) => {
    setRating(newRating);
    const { data } = await postRatingMovie(movieId, newRating);
    setCurrentRating({ratingNumber: data.rating, quantityRating: data.ratingQuantity});
  };

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

