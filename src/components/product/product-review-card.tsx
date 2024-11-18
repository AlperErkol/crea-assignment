import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ProductReviewCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode | string | number;
}

const ProductReviewCard: React.FC<ProductReviewCardProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          {icon}
          <p>{title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ProductReviewCard;
