import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

type ProductTableDto = {
  thumbnail: string;
  title: string;
  price: number;
  rating: string;
};

export const columns: ColumnDef<ProductTableDto>[] = [
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: ({ row }: any) => {
      const imageSource = row.getValue("thumbnail");
      const productName = row.getValue("title");
      return (
        <Image
          src={imageSource}
          className="w-[60px] h-[60px]"
          width={60}
          height={60}
          alt={
            productName + "is displayed in crea assignment product list page."
          }
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }: any) => {
      return <>${row.getValue("price")}</>;
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
];
