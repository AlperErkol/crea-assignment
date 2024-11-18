import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { calculateAverageRating } from "@/app/product/[productId]/util";
import ProductReviews from "@/components/product/product-reviews";
import "@testing-library/jest-dom";
import type { ReviewDto } from "@/types";

jest.mock("@/components/product/review-item", () =>
  jest.fn(() => <div data-testid="review-item">Review Item</div>)
);
jest.mock("@/components/product/add-review", () =>
  jest.fn(({ setIsAddingReview }) => (
    <div data-testid="add-review">
      Add Review
      <button onClick={() => setIsAddingReview(false)}>Cancel</button>
    </div>
  ))
);
jest.mock("@/components/product/product-review-card", () =>
  jest.fn(({ title, children }) => (
    <div data-testid="product-review-card">
      {title} {children}
    </div>
  ))
);
jest.mock("@/components/product/star-rating", () =>
  jest.fn(({ rating }) => <div data-testid="star-rating">Rating: {rating}</div>)
);
jest.mock("@/app/product/[productId]/util", () => ({
  calculateAverageRating: jest.fn(),
}));

describe("ProductReviews", () => {
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
  const mockSetReviews = jest.fn();

  it("renders average rating and total comments", () => {
    (calculateAverageRating as jest.Mock).mockReturnValue(4.5);

    render(
      <ProductReviews
        rating={4.5}
        reviews={mockReviews}
        setReviews={mockSetReviews}
      />
    );

    expect(screen.getByText("Average Rating")).toBeInTheDocument();
    expect(screen.getByTestId("star-rating")).toHaveTextContent("Rating: 4.5");
    expect(screen.getByText("Total Comments")).toBeInTheDocument();
    expect(screen.getByText(mockReviews.length.toString())).toBeInTheDocument();
  });

  it("renders review items", () => {
    render(
      <ProductReviews
        rating={4.5}
        reviews={mockReviews}
        setReviews={mockSetReviews}
      />
    );

    expect(screen.getAllByTestId("review-item")).toHaveLength(
      mockReviews.length
    );
  });

  it("shows AddReview component when Add Review button is clicked", () => {
    render(
      <ProductReviews
        rating={4.5}
        reviews={mockReviews}
        setReviews={mockSetReviews}
      />
    );

    const addButton = screen.getByText("Add Review");
    fireEvent.click(addButton);

    expect(screen.getByTestId("add-review")).toBeInTheDocument();
  });

  it("hides AddReview component when Cancel button is clicked", () => {
    render(
      <ProductReviews
        rating={4.5}
        reviews={mockReviews}
        setReviews={mockSetReviews}
      />
    );

    fireEvent.click(screen.getByText("Add Review"));
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.queryByTestId("add-review")).not.toBeInTheDocument();
  });
});
