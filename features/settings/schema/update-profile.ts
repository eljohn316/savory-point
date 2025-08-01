import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  bio: z.string(),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;
