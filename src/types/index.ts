export type ReviewDto = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
  reviewViaWeb: boolean;
};

type MetaDto = {
  createdAt: string;
};

export type ProductDetailDto = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviews: ReviewDto[];
  meta: MetaDto;
  images: string[];
};
