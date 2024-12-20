"use server";

import type { z } from "zod";
import { signIn } from "@/auth";
import { LOGIN_REDIRECT } from "@/utils/routes";
import { LoginSchema } from "@/utils/schemas";

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
    if (error?.type) {
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
