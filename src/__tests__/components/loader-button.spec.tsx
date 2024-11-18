import React from "react";
import { render, screen } from "@testing-library/react";
import { LoaderButton } from "@/components/loader-button";
import "@testing-library/jest-dom";

describe("LoaderButton Component", () => {
  it("renders the button with children", () => {
    render(<LoaderButton isLoading={false}>Submit</LoaderButton>);
    const buttonElement = screen.getByTestId("loader-button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("disables the button and shows the loader when isLoading is true", () => {
    render(<LoaderButton isLoading={true}>Submit</LoaderButton>);

    const buttonElement = screen.getByTestId("loader-button");
    expect(buttonElement).toBeDisabled();

    const loaderIcon = buttonElement.querySelector("svg");
    expect(loaderIcon).toBeInTheDocument();
    expect(loaderIcon).toHaveClass("animate-spin");
  });

  it("does not render the loader icon when isLoading is false", () => {
    render(<LoaderButton isLoading={false}>Submit</LoaderButton>);

    const buttonElement = screen.getByTestId("loader-button");
    const loaderIcon = buttonElement.querySelector("svg");
    expect(loaderIcon).not.toBeInTheDocument();
  });
});
