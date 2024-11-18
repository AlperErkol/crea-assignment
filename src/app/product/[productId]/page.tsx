"use client";

import Loading from "@/app/components/loading";
import ProductDetail from "@/app/components/product/product-detail";
import ProductReviews from "@/app/components/product/product-reviews";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import { getProductById } from "@/app/server/actions/products.actions";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export type ReviewDto = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
  reviewViaWeb: boolean;
};

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
        <TabsTrigger className="flex-1" value="product-detail">
          Product Detail
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="product-comments-reviews">
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
