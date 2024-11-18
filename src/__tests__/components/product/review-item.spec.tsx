import React from "react";
import { render, screen } from "@testing-library/react";
import moment from "moment";
import ReviewItem from "@/components/product/review-item";
import "@testing-library/jest-dom";

jest.mock("@/components/product/star-rating", () => {
  return ({ rating }: { rating: number }) => (
    <div data-testid="star-rating">{`Rating: ${rating}`}</div>
  );
});

describe("ReviewItem", () => {
  const mockReview = {
    rating: 4,
    reviewerName: "John Doe",
    comment: "This is a great product!",
    date: new Date().toISOString(),
    reviewerEmail: "",
    reviewViaWeb: true,
  };

  it("renders the review with correct details", () => {
    render(<ReviewItem {...mockReview} />);

    expect(screen.getByTestId("star-rating")).toHaveTextContent(
      `Rating: ${mockReview.rating}`
    );
    expect(
      screen.getByText(moment(mockReview.date).fromNow())
    ).toBeInTheDocument();
    expect(screen.getByText(mockReview.reviewerName)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });
});
