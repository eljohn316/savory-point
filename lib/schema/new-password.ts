import { z } from "zod";

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be 8 or more characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" })
      .min(8, {
        message: "Confirm password must be 8 or more characters long",
      }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
