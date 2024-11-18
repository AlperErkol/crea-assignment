import { getProductById, getProducts } from "@/actions/products.actions";
import axiosInstance from "@/libs/axiosInstance";

jest.mock("@/libs/axiosInstance");
jest.mock("@/libs/env", () => ({
  env: {
    NEXT_PUBLIC_PRODUCT_LIMIT: 10,
    NEXT_PUBLIC_PRODUCT_DISPLAY_FIELDS: "id,name,price",
  },
}));

describe("productApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch products successfully", async () => {
    const mockData = { products: [{ id: 1, name: "Product 1" }] };
    const mockResponse = { data: mockData };

    (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

    const products = await getProducts();

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/products?limit=10&select=id,name,price"
    );
    expect(products).toEqual(mockData);
  });

  it("should fetch a product by id successfully", async () => {
    const mockProduct = { id: 1, name: "Product 1" };
    const mockResponse = { data: mockProduct };
    const productId = "1";

    (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

    const product = await getProductById(productId);

    expect(axiosInstance.get).toHaveBeenCalledWith(`/product/${productId}`);
    expect(product).toEqual(mockProduct);
  });

  it("should handle errors in getProducts", async () => {
    const mockError = new Error("Network Error");
    (axiosInstance.get as jest.Mock).mockRejectedValue(mockError);
    await expect(getProducts()).rejects.toThrow("Network Error");
  });

  it("should handle errors in getProductById", async () => {
    const mockError = new Error("Product not found");
    (axiosInstance.get as jest.Mock).mockRejectedValue(mockError);
    await expect(getProductById("1")).rejects.toThrow("Product not found");
  });
});
