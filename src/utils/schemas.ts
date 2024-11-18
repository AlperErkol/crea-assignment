import { z } from "zod";

const LoginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must contain at least 2 character(s)" })
    .max(50),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s) " })
    .max(50),
});

const ReviewSchema = z.object({
  reviewerName: z
    .string()
    .min(2, { message: "Reviewer name must contain at least 2 character(s)" })
    .max(50, { message: "Reviewer name must contain at most 50 character(s)" }),
  reviewerMail: z
    .string()
    .email({ message: "Reviewer mail must be a valid email address" })
    .min(5, { message: "Reviewer mail must contain at least 5 character(s)" }),
  comment: z
    .string()
    .min(1, { message: "Comment must contain at least 1 character(s)" }),
  rating: z
    .string()
    .min(1, { message: "Rating must contain at least 1 character(s)" }),
  date: z.string(),
  reviewViaWeb: z.boolean(),
});
export { LoginSchema, ReviewSchema };
