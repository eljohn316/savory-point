import { z } from 'zod';

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'Current password is required' })
      .min(8, {
        message: 'Current password must be 8 or more characters long'
      }),
    newPassword: z
      .string()
      .min(1, { message: 'New password is required' })
      .min(8, { message: 'New password must be 8 or more characters long' }),
    confirmNewPassword: z
      .string()
      .min(1, { message: 'Confirm new password is required' })
      .min(8, {
        message: 'Confirm new password must be 8 or more characters long'
      })
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword']
  });
