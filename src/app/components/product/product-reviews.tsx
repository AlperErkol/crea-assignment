import React, { useState } from "react";
import { ReviewDto } from "../../product/[productId]/page";
import ReviewItem from "./review-item";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import AddReview from "./add-review";
import { calculateAverageRating } from "@/app/product/[productId]/util";
import StarRating from "./star-rating";

interface ProductReviewsProps {
  reviews: ReviewDto[];
  setReviews: any;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  setReviews,
}) => {
  const [isAddingReview, setIsAddingReview] = useState<boolean>(false);
  const averageRating = calculateAverageRating(reviews);
  return (
    <div>
      <div className="p-3 border mb-2">
        <span className="font-semibold">Average Rating</span>
        <StarRating rating={averageRating} />
      </div>
      <div className="flex flex-col gap-2">
        {reviews.map((review: ReviewDto) => (
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
