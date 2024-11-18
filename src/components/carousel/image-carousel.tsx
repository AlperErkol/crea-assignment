import type React from "react";
import { useState } from "react";
import classnames from "classnames";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./style.scss";
import { Button } from "../ui/button";

interface ImageCarouselProps {
  imageSources: string[];
  width: number;
  height: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  imageSources,
  width,
  height,
}) => {
  const imageCount = imageSources.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goNextImage = () => {
    if (currentIndex === imageCount - 1) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const goPrevImage = () => {
    if (currentIndex === 0) {
      setCurrentIndex(imageCount - 1);
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div
      data-testid="image-carousel"
      className={`carousel relative w-[${width}px] h-[${height}px]`}
    >
      {imageSources.map((imageSource, index: number) => (
        <Image
          key={`image-carousel-${index}`}
          data-testid={`image-carousel-data`}
          width={width}
          height={height}
          src={imageSource}
          alt=""
          className={classnames("carousel-image object-contain", {
            active: currentIndex === index,
          })}
        />
      ))}
      <Button
        data-testid="image-carousel-left"
        variant="outline"
        size="icon"
        onClick={goPrevImage}
        className="carousel-btn left-4"
        disabled={imageCount === 1}
      >
        <ChevronLeft />
      </Button>
      <Button
        data-testid="image-carousel-right"
        variant="outline"
        size="icon"
        className="carousel-btn right-4"
        onClick={goNextImage}
        disabled={imageCount === 1}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default ImageCarousel;
