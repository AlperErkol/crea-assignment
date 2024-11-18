import AddReview from "@/components/product/add-review";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("@/components/review-star-rating", () => ({
  __esModule: true,
  default: ({ field }: any) => <div data-testid="star-rating" {...field} />,
}));

jest.mock("@/components/loader-button", () => ({
  LoaderButton: ({
    isLoading,
    children,
  }: {
    isLoading: boolean;
    children: React.ReactNode;
  }) => <button>{isLoading ? "Loading..." : children}</button>,
}));

describe("AddReview", () => {
  const mockSetIsAddingReview = jest.fn();
  const mockSetReviews = jest.fn();

  beforeEach(() => {
    render(
      <AddReview
        setIsAddingReview={mockSetIsAddingReview}
        setReviews={mockSetReviews}
      />
    );
  });

  it("renders form elements", () => {
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("can submit the form", async () => {
    const reviewerMail = screen.getByLabelText(/E-Mail/i) as HTMLInputElement;
    const reviewerName = screen.getByLabelText(/Name/i) as HTMLInputElement;
    const comment = screen.getByLabelText(/Comment/i) as HTMLTextAreaElement;

    fireEvent.change(reviewerMail, { target: { value: "test@mail.com" } });
    fireEvent.change(reviewerName, { target: { value: "John Doe" } });
    fireEvent.change(comment, {
      target: { value: "This is a great product!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => expect(mockSetReviews).toHaveBeenCalled());

    expect(mockSetReviews).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetIsAddingReview).toHaveBeenCalledWith(false);
  });

  it("calls setIsAddingReview when cancel is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockSetIsAddingReview).toHaveBeenCalledWith(false);
  });
});
