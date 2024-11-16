"use server";
import axios from "axios";

const getProducts = async () => {
  const response = await axios.get(
    "https://dummyjson.com/products?limit=10&select=title,price,rating,thumbnail"
  );
  return response.data;
};

export { getProducts };
