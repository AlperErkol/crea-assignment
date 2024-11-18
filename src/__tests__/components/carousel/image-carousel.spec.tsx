import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageCarousel from "@/components/carousel/image-carousel";
import "@testing-library/jest-dom";

describe("ImageCarousel", () => {
  const imageSources = [
    "https://placehold.co/600x400.png",
    "https://placehold.co/600x400.png",
    "https://placehold.co/600x400.png",
  ];
  const width = 500;
  const height = 450;

  it("renders images correctly", () => {
    render(
      <ImageCarousel
        imageSources={imageSources}
        width={width}
        height={height}
      />
    );

    expect(screen.getByTestId("image-carousel")).toBeInTheDocument();
  });

  it("shows the first image initially", () => {
    render(
      <ImageCarousel
        imageSources={imageSources}
        width={width}
        height={height}
      />
    );

    const firstImage = screen.getAllByTestId("image-carousel-data")[0];
    expect(firstImage).toHaveClass("active");
  });

  it("changes to the next image when 'next' button is clicked", () => {
    render(
      <ImageCarousel
        imageSources={imageSources}
        width={width}
        height={height}
      />
    );

    const nextButton = screen.getByTestId("image-carousel-right");
    fireEvent.click(nextButton);

    const images = screen.getAllByTestId("image-carousel-data");
    expect(images[1]).toHaveClass("active");
  });

  it("changes to the previous image when 'previous' button is clicked", () => {
    render(
      <ImageCarousel
        imageSources={imageSources}
        width={width}
        height={height}
      />
    );

    const nextButton = screen.getByTestId("image-carousel-right");
    fireEvent.click(nextButton);

    const prevButton = screen.getByTestId("image-carousel-left");
    fireEvent.click(prevButton);

    const images = screen.getAllByTestId("image-carousel-data");
    expect(images[0]).toHaveClass("active");
  });

  it("loops to the first image after the last one", () => {
    render(
      <ImageCarousel
        imageSources={imageSources}
        width={width}
        height={height}
      />
    );

    const nextButton = screen.getByTestId("image-carousel-right");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    fireEvent.click(nextButton);

    const images = screen.getAllByTestId("image-carousel-data");
    expect(images[0]).toHaveClass("active");
  });

  it("disables buttons when there is only one image", () => {
    render(
      <ImageCarousel
        imageSources={["https://placehold.co/600x400.png"]}
        width={width}
        height={height}
      />
    );

    const prevButton = screen.getByTestId("image-carousel-left");
    const nextButton = screen.getByTestId("image-carousel-right");
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
