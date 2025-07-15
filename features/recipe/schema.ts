import { z } from 'zod';

export const recipeFormSchema = z.object({
  name: z.string().min(1, { message: 'Recipe name is required' }),
  summary: z.string().min(1, { message: 'Summary is required' }),
  servings: z.coerce.number().min(1, { message: 'Servings is required' }),
  cooking: z.object({
    preparation: z.coerce
      .number()
      .min(0, { message: 'Preparation time is required' }),
    cooking: z.coerce.number().min(0, { message: 'Cooking time is required' }),
  }),
  ingredients: z
    .object({
      ingredient: z.string().min(1, { message: 'Ingredient is required' }),
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one ingredient' }),
  instructions: z
    .object({
      step: z.coerce.number(),
      instruction: z.string().min(1, { message: 'Step is required' }),
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one instruction' }),
  nutrition: z
    .object({
      name: z.string().min(1, { message: 'Name is required' }),
      value: z.string().min(1, { message: 'Value is required' }),
    })
    .array(),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;
