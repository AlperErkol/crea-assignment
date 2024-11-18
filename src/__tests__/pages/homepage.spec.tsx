import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";

jest.mock("@/components/authentication-form", () => () => (
  <div data-testid="authentication-form">Authentication Form</div>
));

describe("Home", () => {
  it("renders the AuthenticationForm component", () => {
    render(<Home />);

    expect(screen.getByTestId("authentication-form")).toBeInTheDocument();
  });
});
