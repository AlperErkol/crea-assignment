import {
  formatRating,
  generateStarFromRating,
} from "@/app/product/[productId]/util";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import classNames from "classnames";
import { env } from "@/libs/env";

interface StarRatingProps {
  rating: number;
  showDigit?: boolean;
  iconSize?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  iconSize,
  showDigit,
}) => {
  const stars = generateStarFromRating(rating, iconSize);

  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex">{stars.map((star) => star)}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {formatRating(rating)} / ${env.NEXT_PUBLIC_RATE_MAX_VALUE}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {showDigit && (
        <span
          className={classNames("ml-2 font-semibold", {
            "font-bold text-xl": iconSize && iconSize >= 20,
          })}
        >
          {formatRating(rating)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
