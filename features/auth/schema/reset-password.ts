import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: 'New password is required' })
      .min(8, { message: 'New password must be 8 or more characters long' }),
    confirmNewPassword: z.string().min(1, { message: 'Confirm new password is required' }).min(8, {
      message: 'Confirm new password must be 8 or more characters long',
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
