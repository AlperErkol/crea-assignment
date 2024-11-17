"use server";
import axios from "axios";

const getProducts = async () => {
  const response = await axios.get(
    "https://dummyjson.com/products?limit=10&select=title,price,rating,thumbnail"
  );
  return response.data;
};

const getProductById = async (productId: string) => {
  const response = await axios.get(
    `https://dummyjson.com/product/${productId}`
  );
  return response.data;
};

export { getProducts, getProductById };
