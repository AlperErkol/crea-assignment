import { ReviewDto } from "@/app/product/[productId]/page";
import React from "react";
import StarRating from "./star-rating";
import moment from "moment";

const ReviewItem = (review: ReviewDto) => {
  const { rating, reviewerName, comment, date } = review;

  return (
    <div className="border p-3 rounded-md">
      <div className="flex items-center justify-between">
        <StarRating rating={rating} />
        <p>{moment(date).fromNow()}</p>
      </div>
      <div>{reviewerName}</div>
      <div>{comment}</div>
    </div>
  );
};

export default ReviewItem;
