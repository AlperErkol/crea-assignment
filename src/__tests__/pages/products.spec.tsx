import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getProducts } from "@/actions/products.actions";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import Page from "@/app/products/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/libs/env", () => ({
  env: {},
}));

jest.mock("@/actions/products.actions", () => ({
  getProducts: jest.fn(),
}));

const queryClient = new QueryClient();

describe("Page Component", () => {
  it("displays Loading component while fetching data", () => {
    (getProducts as jest.Mock).mockResolvedValueOnce({ products: [] });
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  //   it("displays data when the query is successful", async () => {
  //     const mockProducts = {
  //       products: [
  //         {
  //           title: "Product 1",
  //           rating: 4.54,
  //           price: 9.99,
  //           thumbnail: "https://placehold.co/100x100/png",
  //         },
  //         {
  //           title: "Product 2",
  //           rating: 1.75,
  //           price: 5.5,
  //           thumbnail: "https://placehold.co/100x100/png",
  //         },
  //       ],
  //     };

  //     (getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

  //     (useRouter as jest.Mock).mockReturnValue({
  //       push: jest.fn(),
  //     });

  //     render(
  //       <QueryClientProvider client={queryClient}>
  //         <Page />
  //       </QueryClientProvider>
  //     );

  //     await waitFor(() => screen.getByTestId("product-list"));
  //     expect(screen.getByText("Product 1")).toBeInTheDocument();
  //     expect(screen.getByText("Product 2")).toBeInTheDocument();
  //   });

  it("handles error state if the query fails", async () => {
    (getProducts as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId("product-list")).toBeInTheDocument()
    );
  });
});
