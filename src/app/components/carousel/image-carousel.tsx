import React, { useState } from "react";
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
  let maxImageCount = 5;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goNextImage = () => {
    if (currentIndex === maxImageCount - 1) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const goPrevImage = () => {
    if (currentIndex === 0) {
      setCurrentIndex(maxImageCount - 1);
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="carousel relative flex-1 h-[450px]">
      {imageSources.map((imageSource, index: number) => (
        <Image
          width={width}
          height={height}
          src={imageSource}
          alt=""
          className={classnames("carousel-image", {
            active: currentIndex === index,
          })}
        />
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={goPrevImage}
        className="carousel-btn left-4"
        disabled={imageSources.length === 1}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="carousel-btn right-4"
        onClick={goNextImage}
        disabled={imageSources.length === 1}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default ImageCarousel;
