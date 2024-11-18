import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryClientProvider } from "@/components/query-client";
import "@testing-library/jest-dom";

describe("ReactQueryClientProvider", () => {
  it("renders children correctly", () => {
    render(
      <ReactQueryClientProvider>
        <div>Test Child Component</div>
      </ReactQueryClientProvider>
    );

    expect(screen.getByText("Test Child Component")).toBeInTheDocument();
  });

  it("provides a QueryClient with the expected configuration", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <div>Test</div>
      </QueryClientProvider>
    );

    expect(queryClient.getDefaultOptions().queries?.refetchOnWindowFocus).toBe(
      false
    );
  });
});
