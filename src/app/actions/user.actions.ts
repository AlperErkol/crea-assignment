"use server";

import { z } from "zod";
import { LoginSchema } from "../utils/schemas";
import { AuthError } from "next-auth";
import { LOGIN_REDIRECT } from "../utils/routes";
import { signIn } from "@/auth";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { username, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: LOGIN_REDIRECT,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentails!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}
