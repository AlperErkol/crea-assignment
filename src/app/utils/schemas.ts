import { z } from "zod";

const LoginSchema = z.object({
  username: z
    .string({
      message: "Username is required.",
    })
    .min(2)
    .max(50),
  password: z.string().min(6).max(50),
});

export { LoginSchema };
