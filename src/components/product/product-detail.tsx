import moment from "moment";
import React from "react";
import StarRating from "./star-rating";
import ImageCarousel from "../carousel/image-carousel";
import { calculateAverageRating } from "@/app/product/[productId]/util";
import { ProductDetailDto, ReviewDto } from "@/types";

interface ProductDetailProps {
  data: ProductDetailDto;
  reviews: ReviewDto[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ data, reviews }) => {
  const { category, title, images, price, description, meta, rating } = data;
  const arrivalDate = meta.createdAt;
  const calculatedRate = calculateAverageRating(rating, reviews);

  return (
    <div className="product-detail">
      <div className="product-detail-header w-full flex gap-2">
        <ImageCarousel imageSources={images} width={500} height={450} />
        <div className="product-detail-header-meta flex-1 h-[450px]">
          <span className="text-sm font-semibold">
            {category.toUpperCase()}
          </span>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <div className="text-2xl font-bold mb-2">${price}</div>
          <p className="mb-2">{description}</p>
          <StarRating rating={calculatedRate} iconSize={24} showDigit />
          <p className="text-sm font-semibold mt-2">
            Arrival Date: {moment(arrivalDate).format("MM/DD/YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
