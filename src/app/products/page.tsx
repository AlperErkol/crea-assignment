"use client";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../server/actions/products.actions";
import DataTable from "./data-table";
import { columns } from "./columns";
import Loading from "../components/loading";

const page = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["getProducts"],
    queryFn: async () => await getProducts(),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>{data && <DataTable columns={columns} data={data.products} />}</div>
  );
};

export default page;
