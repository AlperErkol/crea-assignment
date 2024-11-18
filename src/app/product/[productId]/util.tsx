import { ReactNode } from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { env } from "@/libs/env";
import { ReviewDto } from "@/types";

const calculateAverageRating = (
  rating: number,
  reviews: ReviewDto[]
): number => {
  const defaultReviewersCount = env.NEXT_PUBLIC_DEFAULT_RATE_COUNT;
  const reviewersTotalRating = reviews.reduce(
    (sum, review) => (review.reviewViaWeb ? sum + review.rating : sum),
    0
  );

  const webReviewersCount = reviews.filter(
    (review) => review.reviewViaWeb
  ).length;

  const totalRating = rating * defaultReviewersCount + reviewersTotalRating;
  const totalUsers = defaultReviewersCount + webReviewersCount;

  return totalRating / totalUsers;
};

const generateStarFromRating = (
  rating: number,
  iconSize: number = env.NEXT_PUBLIC_DEFAULT_ICON_SIZE
): ReactNode[] => {
  const stars: ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<IoStar size={iconSize} color="#FFC000" key={i} />);
    } else if (rating >= i - 0.5) {
      stars.push(<IoStarHalf size={iconSize} color="#FFC000" key={i} />);
    } else {
      stars.push(<IoStarOutline size={iconSize} color="#FFC000" key={i} />);
    }
  }
  return stars;
};

const formatRating = (rating: number): string => {
  return rating % 1 === 0 ? `${rating}` : rating.toFixed(2);
};

export { calculateAverageRating, generateStarFromRating, formatRating };
