import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(1),
    USER_DEFAULT_USERNAME: z.string().min(1),
    USER_DEFAULT_PASSWORD: z.string().min(1),
    USER_DEFAULT_ID: z.string().min(1),
    API_REQUEST_TIMEOUT: z.number().positive(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_PRODUCT_LIMIT: z.number().positive(),
    NEXT_PUBLIC_PRODUCT_DISPLAY_FIELDS: z.string().min(1),
    NEXT_PUBLIC_DEFAULT_ICON_SIZE: z.number().positive(),
    NEXT_PUBLIC_DEFAULT_RATE_COUNT: z.number().positive(),
    NEXT_PUBLIC_RATE_MAX_VALUE: z.number().positive(),
  },
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    USER_DEFAULT_USERNAME: process.env.USER_DEFAULT_USERNAME,
    USER_DEFAULT_PASSWORD: process.env.USER_DEFAULT_PASSWORD,
    USER_DEFAULT_ID: process.env.USER_DEFAULT_ID,
    API_REQUEST_TIMEOUT: process.env.API_REQUEST_TIMEOUT
      ? Number(process.env.API_REQUEST_TIMEOUT)
      : 1000,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_PRODUCT_LIMIT: process.env.NEXT_PUBLIC_PRODUCT_LIMIT
      ? Number(process.env.NEXT_PUBLIC_PRODUCT_LIMIT)
      : 10,
    NEXT_PUBLIC_PRODUCT_DISPLAY_FIELDS:
      process.env.NEXT_PUBLIC_PRODUCT_DISPLAY_FIELDS,
    NEXT_PUBLIC_DEFAULT_ICON_SIZE: process.env.NEXT_PUBLIC_DEFAULT_ICON_SIZE
      ? Number(process.env.NEXT_PUBLIC_DEFAULT_ICON_SIZE)
      : 18,
    NEXT_PUBLIC_DEFAULT_RATE_COUNT: process.env
      .NEXT_PUBLIC_RATE_COUNT_ASSUMPTION
      ? Number(process.env.NEXT_PUBLIC_RATE_COUNT_ASSUMPTION)
      : 100,
    NEXT_PUBLIC_RATE_MAX_VALUE: process.env.NEXT_PUBLIC_RATE_MAX_VALUE
      ? Number(process.env.NEXT_PUBLIC_RATE_MAX_VALUE)
      : 5,
  },
});
