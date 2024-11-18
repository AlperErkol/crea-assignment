import React, { useState } from "react";
import ReviewItem from "./review-item";
import { Button } from "../ui/button";
import { MessageSquare, Plus, Star } from "lucide-react";
import AddReview from "./add-review";
import ProductReviewCard from "./product-review-card";
import StarRating from "./star-rating";
import _ from "lodash";
import { calculateAverageRating } from "@/app/product/[productId]/util";
import { ReviewDto } from "@/app/product/[productId]/page";

interface ProductReviewsProps {
  rating: number;
  reviews: ReviewDto[];
  setReviews: any;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  rating,
  reviews,
  setReviews,
}) => {
  const [isAddingReview, setIsAddingReview] = useState<boolean>(false);
  const sortedReviews = _.orderBy(reviews, ["date"], ["desc"]);
  const calculatedRating = calculateAverageRating(rating, reviews);

  return (
    <div data-testid="product-reviews">
      <div className="flex mb-2 gap-2">
        <ProductReviewCard title="Average Rating" icon={<Star />}>
          <StarRating rating={calculatedRating} iconSize={24} showDigit />
        </ProductReviewCard>
        <ProductReviewCard title="Total Comments" icon={<MessageSquare />}>
          <span className="font-bold text-xl">{reviews.length}</span>
        </ProductReviewCard>
      </div>
      <div className="flex flex-col gap-2">
        {sortedReviews.map((review: ReviewDto) => (
          <ReviewItem {...review} />
        ))}
        {isAddingReview && (
          <AddReview
            setReviews={setReviews}
            setIsAddingReview={setIsAddingReview}
          />
        )}
        <div className="flex justify-end">
          {!isAddingReview && (
            <Button onClick={() => setIsAddingReview(true)}>
              <Plus /> Add Review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
