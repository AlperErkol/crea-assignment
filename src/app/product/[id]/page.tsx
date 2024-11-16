import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import React from "react";

const page = () => {
  return (
    <Tabs defaultValue="product-detail">
      <TabsList className="w-full">
        <TabsTrigger value="product-detail">Product Detail</TabsTrigger>
        <TabsTrigger value="product-comments-reviews">
          Comments & Reviews (6)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="product-detail">Product Detail</TabsContent>
      <TabsContent value="product-comments-reviews">
        Comments & Reviews
      </TabsContent>
    </Tabs>
  );
};

export default page;
