import {
  formatRating,
  generateStarFromRating,
} from "@/app/product/[productId]/util";
import React from "react";

interface StarRatingProps {
  iconSize?: number;
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, iconSize }) => {
  const stars = generateStarFromRating(rating, iconSize);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars.map((star) => star)}</div>
      <span className="font-semibold">{formatRating(rating)}</span>
    </div>
  );
};

export default StarRating;
