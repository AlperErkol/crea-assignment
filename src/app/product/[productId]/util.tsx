import { ReactNode } from "react";
import { ReviewDto } from "./page";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const calculateAverageRating = (reviews: ReviewDto[]): number => {
  if (reviews.length === 0) {
    return 0;
  }
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

const generateStarFromRating = (
  rating: number,
  iconSize?: number
): ReactNode[] => {
  const stars: ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<IoStar size={iconSize ?? 18} color="#FFC000" key={i} />);
    } else if (rating >= i - 0.5) {
      stars.push(<IoStarHalf size={iconSize ?? 18} color="#FFC000" key={i} />);
    } else {
      stars.push(
        <IoStarOutline size={iconSize ?? 18} color="#FFC000" key={i} />
      );
    }
  }
  return stars;
};

const formatRating = (rating: number): string => {
  return rating % 1 === 0 ? `${rating}` : rating.toFixed(2);
};

export { calculateAverageRating, generateStarFromRating, formatRating };
