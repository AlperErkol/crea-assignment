import React from "react";
import ProductReviewCard from "@/components/product/product-review-card";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ProductReviewCard", () => {
  const title = "Average Rating";
  const icon = <span data-testid="icon">*</span>;
  const children = "4.5";

  it("renders with title, icon, and children correctly", () => {
    render(
      <ProductReviewCard title={title} icon={icon}>
        {children}
      </ProductReviewCard>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it("renders without an icon", () => {
    render(<ProductReviewCard title={title}>{children}</ProductReviewCard>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
  });
});
