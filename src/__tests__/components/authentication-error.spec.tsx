import React from "react";
import { render, screen } from "@testing-library/react";
import AuthenticationError from "@/components/authentication-error";
import "@testing-library/jest-dom";

describe("AuthenticationError Component", () => {
  it("renders the error message and alert icon", () => {
    const errorMessage = "Authentication failed. Please try again.";
    render(<AuthenticationError message={errorMessage} />);
    const messageElement = screen.getByText(errorMessage);
    expect(messageElement).toBeInTheDocument();
  });
});
