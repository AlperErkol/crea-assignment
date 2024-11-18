import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import DataTable from "@/app/products/data-table";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("DataTable", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
  ];

  const data = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ];

  it("renders the table with data", () => {
    render(<DataTable columns={columns} data={data} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("navigates to the correct product page when a row is clicked", () => {
    render(<DataTable columns={columns} data={data} />);

    const row = screen.getAllByRole("row")[1];
    fireEvent.click(row);

    expect(mockRouter.push).toHaveBeenCalledWith("/product/1");
  });

  it("disables the previous button on the first page", () => {
    render(<DataTable columns={columns} data={data} />);

    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    render(<DataTable columns={columns} data={data} />);

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("shows 'No results' when there is no data", () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText("No results.")).toBeInTheDocument();
  });
});
