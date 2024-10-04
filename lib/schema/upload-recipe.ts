import { z } from 'zod';
import { ACCEPTED_FILES, MAX_IMAGE_SIZE } from '@/lib/constants';
import { convertToMB } from '@/lib/utils';

const recipeBaseSchema = z.object({
  title: z.string().min(1, { message: 'Recipe title is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
  prepTime: z.coerce
    .number()
    .int()
    .gte(0, { message: 'Prep time is required' }),
  cookingTime: z.coerce
    .number()
    .int()
    .gte(0, { message: 'Cooking time is required' }),
  servings: z.coerce.number().int().gte(1, { message: 'Servings is required' }),
  ingredients: z
    .object({
      ingredient: z.string().trim().min(1, 'Ingredient is required')
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one ingredient' }),
  instructions: z
    .object({
      step: z.number(),
      instruction: z.string().trim().min(1, 'Instruction is required')
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one instruction' })
});

export const recipeClientSchema = recipeBaseSchema.extend({
  image: z
    .custom<FileList>()
    .refine((files) => files.length === 1, 'Image is required')
    .refine(
      (files) =>
        Array.from(files).every((file) => ACCEPTED_FILES.includes(file.type)),
      'Invalid image type. Allowed types are .jpeg, .jpg, .png and .webp'
    )
    .refine(
      (files) =>
        Array.from(files).every(
          (file) => convertToMB(file.size) <= MAX_IMAGE_SIZE
        ),
      'Maximum image size is 5mb.'
    )
});

export const recipeServerSchema = recipeBaseSchema.extend({
  image: z
    .custom<File>()
    .refine((file) => file.size > 0, 'Image is required')
    .refine(
      (file) => ACCEPTED_FILES.includes(file.type),
      'Invalid image type. Allowed types are .jpeg, .jpg, .png and .webp'
    )
    .refine(
      (file) => convertToMB(file.size) <= MAX_IMAGE_SIZE,
      'Maximum image size is 5mb.'
    )
});
