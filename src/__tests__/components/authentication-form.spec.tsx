import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { login } from "@/actions/user.actions";
import AuthenticationForm from "@/components/authentication-form";
import "@testing-library/jest-dom";

jest.mock("@/actions/user.actions", () => ({
  login: jest.fn(),
}));

describe("AuthenticationForm", () => {
  it("renders form correctly", () => {
    render(<AuthenticationForm />);

    expect(screen.getByPlaceholderText("user")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*******")).toBeInTheDocument();
    expect(
      screen.getByTestId("authentication-form-submit-button")
    ).toBeInTheDocument();
  });

  it("calls login function on submit with correct credentials", async () => {
    (login as jest.Mock).mockResolvedValueOnce({});

    render(<AuthenticationForm />);

    fireEvent.change(screen.getByPlaceholderText("user"), {
      target: { value: "user123" },
    });
    fireEvent.change(screen.getByPlaceholderText("*******"), {
      target: { value: "user123" },
    });

    fireEvent.click(screen.getByTestId("authentication-form-submit-button"));

    await waitFor(() =>
      expect(login).toHaveBeenCalledWith({
        username: "user123",
        password: "user123",
      })
    );
  });

  it("displays an error message when login fails", async () => {
    (login as jest.Mock).mockResolvedValueOnce({
      error: "Invalid credentials",
    });

    render(<AuthenticationForm />);

    fireEvent.change(screen.getByPlaceholderText("user"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("*******"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("authentication-form-submit-button"));

    await waitFor(() =>
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
    );
  });

  it("calls login function on submit", async () => {
    (login as jest.Mock).mockResolvedValueOnce({});

    render(<AuthenticationForm />);

    fireEvent.change(screen.getByPlaceholderText("user"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("*******"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("authentication-form-submit-button"));

    await waitFor(() =>
      expect(login).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
      })
    );
  });
});
