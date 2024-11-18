"use server";
import axiosInstance from "@/libs/axiosInstance";
import { env } from "@/libs/env";

const getProducts = async () => {
  const response = await axiosInstance.get(
    `/products?limit=${env.NEXT_PUBLIC_PRODUCT_LIMIT}&select=${env.NEXT_PUBLIC_PRODUCT_DISPLAY_FIELDS}`
  );
  return response.data;
};

const getProductById = async (productId: string) => {
  const response = await axiosInstance.get(`/product/${productId}`);
  return response.data;
};

export { getProducts, getProductById };
