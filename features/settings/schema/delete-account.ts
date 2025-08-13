import { z } from 'zod';

export const deleteAccountSchema = z.object({
  password: z.string().min(1, { message: 'Password is required' }).min(8, {
    message: 'Password must be 8 or more characters long',
  }),
});

export type DeleteAccountValues = z.infer<typeof deleteAccountSchema>;
