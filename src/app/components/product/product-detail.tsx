import moment from "moment";
import Image from "next/image";
import React from "react";
import StarRating from "./star-rating";

interface ProductDetailProps {
  data: any;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ data }) => {
  const { category, title, images, price, description, meta, rating } = data;
  const arrivalDate = meta.createdAt;

  return (
    <div className="product-detail">
      <div className="product-detail-header w-full flex gap-2">
        <Image
          src={images[0]}
          alt="alt text"
          width={300}
          height={300}
          className="product-detail-header-image flex-1 h-[450px]"
        />
        <div className="product-detail-header-meta flex-1 h-[450px]">
          <span className="text-sm font-semibold">
            {category.toUpperCase()}
          </span>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <div className="text-2xl font-bold mb-2">${price}</div>
          <p className="mb-2">{description}</p>
          <StarRating rating={rating} iconSize={24} />
          <p className="text-sm font-semibold mt-2">
            Arrival Date: {moment(arrivalDate).format("MM/DD/YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
