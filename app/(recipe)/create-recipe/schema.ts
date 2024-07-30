import { z } from 'zod';

export const schema = z.object({
  title: z.string().trim().min(1, { message: 'This field cannot be empty' }),
  about: z.string().trim().min(1, { message: 'This field cannot be empty' }),
  prepTime: z.coerce
    .number()
    .int()
    .gte(1, { message: 'This field cannot be empty' }),
  cookingTime: z.coerce
    .number()
    .int()
    .gte(1, { message: 'This field cannot be empty' }),
  servings: z.coerce
    .number()
    .int()
    .gte(1, { message: 'This field cannot be empty' }),
  ingredients: z
    .object({
      num: z.optional(z.number()),
      ingredient: z.string().trim().min(1, 'This field cannot be empty')
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one ingredient' }),
  instructions: z
    .object({
      num: z.optional(z.number()),
      instruction: z.string().trim().min(1, 'This field cannot be empty')
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one instruction' })
});
