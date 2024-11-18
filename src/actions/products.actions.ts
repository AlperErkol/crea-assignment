"use server";
import axiosInstance from "@/libs/axiosInstance";

const getProducts = async () => {
  const response = await axiosInstance.get(
    "/products?limit=10&select=title,price,rating,thumbnail"
  );
  return response.data;
};

const getProductById = async (productId: string) => {
  const response = await axiosInstance.get(`/product/${productId}`);
  return response.data;
};

export { getProducts, getProductById };
