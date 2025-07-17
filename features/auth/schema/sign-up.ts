import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must be 8 or more characters long.' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must be 8 or more characters long.' }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: "Passwords dont' match",
        path: ['confirmPassword'],
      });
    }
  });

export type SignupValues = z.infer<typeof signupSchema>;
