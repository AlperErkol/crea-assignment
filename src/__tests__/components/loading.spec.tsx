import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loading from "@/components/loading";

describe("Loading Component", () => {
  it("renders the loading spinner", () => {
    render(<Loading />);

    const loadingDiv = screen.getByTestId("loading");
    const loaderIcon = loadingDiv.querySelector("svg");

    expect(loadingDiv).toBeInTheDocument();
    expect(loaderIcon).toBeInTheDocument();
    expect(loaderIcon).toHaveClass("animate-spin");
  });
});
