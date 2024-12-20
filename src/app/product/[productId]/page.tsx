"use client";

import { getProductById } from "@/actions/products.actions";
import Loading from "@/components/loading";
import ProductDetail from "@/components/product/product-detail";
import ProductReviews from "@/components/product/product-reviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ReviewDto } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const page = ({ params }: any) => {
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const productId = params.productId;

  const { isLoading, data } = useQuery({
    queryKey: [productId, "getProductById"],
    queryFn: async () => await getProductById(productId),
    enabled: !!productId,
  });

  useEffect(() => {
    if (data) {
      setReviews(data.reviews);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  const { rating } = data;

  return (
    <Tabs defaultValue="product-detail">
      <TabsList className="w-full">
        <TabsTrigger
          data-testid="tab-product-detail"
          className="flex-1"
          value="product-detail"
        >
          Product Detail
        </TabsTrigger>
        <TabsTrigger
          data-testid="tab-product-review"
          className="flex-1"
          value="product-comments-reviews"
        >
          Comments & Reviews ({reviews.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="product-detail">
        <ProductDetail data={data} reviews={reviews} />
      </TabsContent>
      <TabsContent value="product-comments-reviews">
        <ProductReviews
          setReviews={setReviews}
          reviews={reviews}
          rating={rating}
        />
      </TabsContent>
    </Tabs>
  );
};

export default page;
