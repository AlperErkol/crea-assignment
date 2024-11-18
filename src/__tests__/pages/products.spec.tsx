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
