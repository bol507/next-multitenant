import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string()
    .min(3,"Username must be at least 3 characters")
    .max(63,"Username must be less than 63 characters")
    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/,"Username must be alphanumeric")
    .refine(
      (value) => !value.includes("--"),
      "Username cannot contain two consecutive hyphens"
    )
    .transform((value) => value.toLowerCase()),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})