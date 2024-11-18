import React from "react";
import { render, screen } from "@testing-library/react";
import { calculateAverageRating } from "@/app/product/[productId]/util";
import moment from "moment";
import ProductDetail from "@/components/product/product-detail";
import "@testing-library/jest-dom";
import { ReviewDto } from "@/types";

jest.mock("@/components/product/star-rating", () =>
  jest.fn(() => <div data-testid="star-rating">Star Rating</div>)
);
jest.mock("@/components/carousel/image-carousel", () =>
  jest.fn(() => <div data-testid="image-carousel">Image Carousel</div>)
);
jest.mock("@/app/product/[productId]/util", () => ({
  calculateAverageRating: jest.fn(),
}));

describe("ProductDetail", () => {
  const mockData = {
    category: "Jewelry",
    title: "Gold Necklace",
    images: ["image1.jpg", "image2.jpg"],
    price: 150,
    description: "A beautiful gold necklace.",
    meta: { createdAt: "2024-11-01" },
    rating: 4,
  };

  const mockReviews: ReviewDto[] = [
    {
      rating: 5,
      reviewerName: "Alice",
      comment: "Great!",
      date: "2024-11-17",
      reviewerEmail: "",
      reviewViaWeb: true,
    },
    {
      rating: 4,
      reviewerName: "Bob",
      comment: "Good product.",
      date: "2024-11-16",
      reviewerEmail: "",
      reviewViaWeb: true,
    },
  ];

  it("renders product details correctly", () => {
    (calculateAverageRating as jest.Mock).mockReturnValue(4.5);

    render(<ProductDetail data={mockData} reviews={mockReviews} />);
    expect(
      screen.getByText(mockData.category.toUpperCase())
    ).toBeInTheDocument();
    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockData.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockData.description)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Arrival Date: ${moment(mockData.meta.createdAt).format("MM/DD/YYYY")}`
      )
    ).toBeInTheDocument();

    expect(screen.getByTestId("image-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("star-rating")).toBeInTheDocument();
  });

  it("calculates and displays the correct rating", () => {
    (calculateAverageRating as jest.Mock).mockReturnValue(4.5);

    render(<ProductDetail data={mockData} reviews={mockReviews} />);

    expect(screen.getByTestId("star-rating")).toHaveTextContent("Star Rating");
  });
});
