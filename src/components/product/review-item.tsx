import React from "react";
import StarRating from "./star-rating";
import moment from "moment";
import type { ReviewDto } from "@/types";

const ReviewItem = (review: ReviewDto) => {
  const { rating, reviewerName, comment, date } = review;

  return (
    <div className="border p-3 rounded-md">
      <div className="flex items-center justify-between">
        <StarRating rating={rating} showDigit />
        <p className="text-sm text-muted-foreground">
          {moment(date).fromNow()}
        </p>
      </div>
      <div className="text-muted-foreground text-sm mb-3">{reviewerName}</div>
      <div>{comment}</div>
    </div>
  );
};

export default ReviewItem;
