import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Page from "@/app/product/[productId]/page";
import { getProductById } from "@/actions/products.actions";
import "@testing-library/jest-dom";

jest.mock("@/actions/products.actions", () => ({
  getProductById: jest.fn(),
}));

jest.mock("@/libs/env", () => ({
  env: {},
}));

const renderWithQueryClient = (ui: JSX.Element) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Product Detail Page", () => {
  it("renders loading state initially", () => {
    (getProductById as jest.Mock).mockResolvedValueOnce(undefined);

    renderWithQueryClient(<Page params={{ productId: "123" }} />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders product detail and reviews tab when data is loaded", async () => {
    const mockData = getMockData();
    (getProductById as jest.Mock).mockResolvedValueOnce(mockData);

    renderWithQueryClient(<Page params={{ productId: "123" }} />);

    await waitFor(() =>
      expect(screen.getByText("Product Detail")).toBeInTheDocument()
    );
    expect(screen.getByTestId("tab-product-detail")).toBeInTheDocument();
    expect(screen.getByTestId("tab-product-review")).toBeInTheDocument();
  });

  it("changes tabs when clicked", async () => {
    const mockData = getMockData();
    (getProductById as jest.Mock).mockResolvedValueOnce(mockData);

    renderWithQueryClient(<Page params={{ productId: "123" }} />);

    await waitFor(() => {
      expect(screen.getByTestId("tab-product-detail")).toBeInTheDocument();
      expect(screen.getByTestId("tab-product-review")).toBeInTheDocument();
    });
  });
});

const getMockData = () => {
  return {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description:
      "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    category: "beauty",
    price: 9.99,
    rating: 4.94,
    reviews: [
      {
        rating: 2,
        comment: "Very unhappy with my purchase!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "John Doe",
        reviewerEmail: "john.doe@x.dummyjson.com",
      },
      {
        rating: 2,
        comment: "Not as described!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Nolan Gonzalez",
        reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Very satisfied!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Scarlett Wright",
        reviewerEmail: "scarlett.wright@x.dummyjson.com",
      },
    ],

    meta: {
      createdAt: "2024-05-23T08:56:21.618Z",
    },
    images: [
      "https://placehold.co/400",
      "https://placehold.co/400",
      "https://placehold.co/400",
    ],
  };
};
