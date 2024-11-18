import { render, screen, fireEvent } from "@testing-library/react";
import AuthHeader from "@/components/auth-header";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AuthHeader", () => {
  it("renders the buttons correctly", () => {
    const mockRouter = {
      back: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<AuthHeader />);

    expect(screen.getByText("Back")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls back when Back button is clicked", () => {
    const mockRouter = {
      back: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<AuthHeader />);

    fireEvent.click(screen.getByText("Back"));

    expect(mockRouter.back).toHaveBeenCalled();
  });

  it("calls signOut when Logout button is clicked", () => {
    render(<AuthHeader />);

    fireEvent.click(screen.getByText("Logout"));

    expect(signOut).toHaveBeenCalled();
  });
});
