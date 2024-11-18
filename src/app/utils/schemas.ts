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

const ReviewSchema = z.object({
  reviewerName: z.string().min(2).max(50),
  reviewerMail: z.string().email().min(5),
  comment: z.string(),
  rating: z.string(),
  date: z.string(),
});
export { LoginSchema, ReviewSchema };
