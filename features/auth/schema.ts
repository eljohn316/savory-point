import { z } from 'zod';

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be 8 or more characters long.' }),
});

export type SigninValues = z.infer<typeof signinSchema>;
