import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FormControl, FormItem, FormLabel } from "./ui/form";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { ControllerRenderProps } from "react-hook-form";

interface ReviewStarRatingProps {
  field: ControllerRenderProps<
    {
      rating: string;
      reviewerName: string;
      comment: string;
      date: Date;
      reviewerMail: string;
    },
    "rating"
  >;
}

const ReviewStarRating: React.FC<ReviewStarRatingProps> = ({ field }) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  return (
    <RadioGroup onValueChange={field.onChange} className="flex space-y-1">
      {Array.from({ length: 5 }, (_, index) => (
        <FormItem key={index} className="flex items-center space-x-3 space-y-0">
          <FormControl>
            <RadioGroupItem className="hidden" value={(index + 1).toString()} />
          </FormControl>
          <FormLabel
            onMouseEnter={() => setHoveredStar(index)}
            onMouseLeave={() => setHoveredStar(null)}
            onClick={() => setSelectedRating(index)}
            className="font-normal cursor-pointer"
          >
            {hoveredStar !== null && hoveredStar >= index ? (
              <IoStar color="FFC000" size={26} />
            ) : selectedRating !== null && selectedRating >= index ? (
              <IoStar color="FFC000" size={26} />
            ) : (
              <IoStarOutline color="FFC000" size={26} />
            )}
          </FormLabel>
        </FormItem>
      ))}
    </RadioGroup>
  );
};

export default ReviewStarRating;
