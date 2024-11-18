import { login } from "@/actions/user.actions";
import { signIn } from "@/auth";
import { LoginSchema } from "@/utils/schemas";
import "@testing-library/jest-dom";

jest.mock("@/auth", () => ({
  signIn: jest.fn(),
}));

jest.mock("next-auth");

jest.mock("@/utils/schemas", () => ({
  LoginSchema: {
    safeParse: jest.fn(),
  },
}));

describe("login function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns error for invalid credentials", async () => {
    (LoginSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: true,
      data: { username: "user", password: "wrongpassword" },
    });

    (signIn as jest.Mock).mockRejectedValueOnce({
      type: "CredentialsSignin",
    });

    const result = await login({ username: "user", password: "wrongpassword" });
    expect(result).toEqual({ error: "Invalid credentails!" });
  });

  it("calls signIn with correct parameters and no errors", async () => {
    (LoginSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: true,
      data: { username: "user", password: "user123" },
    });

    (signIn as jest.Mock).mockResolvedValueOnce({});

    const result = await login({
      username: "user",
      password: "user123",
    });

    expect(result).toBeUndefined();
    expect(signIn).toHaveBeenCalledWith("credentials", {
      username: "user",
      password: "user123",
      redirectTo: "/products",
    });
  });
});
