import { z } from 'zod';

export const updateEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email format' }),
});

export type UpdateEmailValues = z.infer<typeof updateEmailSchema>;
