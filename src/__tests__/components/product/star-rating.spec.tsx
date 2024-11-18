import React from "react";
import { render, screen } from "@testing-library/react";
import StarRating from "@/components/product/star-rating";
import "@testing-library/jest-dom";

jest.mock("@/app/product/[productId]/util", () => ({
  formatRating: (rating: number) => rating.toFixed(1),
  generateStarFromRating: (rating: number, iconSize: number) =>
    Array.from({ length: Math.round(rating) }, (_, index) => (
      <div key={index} data-testid="star-icon">{`Star ${index + 1}`}</div>
    )),
}));

jest.mock("@/libs/env", () => ({
  env: {
    NEXT_PUBLIC_RATE_MAX_VALUE: 5,
  },
}));

describe("StarRating", () => {
  const mockRating = 4.3;
  it("renders stars based on the rating", () => {
    render(<StarRating rating={mockRating} />);
    expect(screen.getAllByTestId("star-icon")).toHaveLength(
      Math.round(mockRating)
    );
  });

  it("renders the digit if showDigit is true", () => {
    render(<StarRating rating={mockRating} showDigit />);
    expect(screen.getByText(mockRating.toFixed(1))).toBeInTheDocument();
  });

  it("applies correct class when iconSize is large", () => {
    const { container } = render(
      <StarRating rating={mockRating} showDigit iconSize={20} />
    );
    const digitElement = container.querySelector("span.ml-2");
    expect(digitElement).toHaveClass("font-bold text-xl");
  });
});
