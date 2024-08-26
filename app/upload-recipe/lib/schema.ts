import { z } from 'zod';

const ACCEPTED_FILES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 1;

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

const baseSchema = z.object({
  title: z.string().min(1, { message: 'Recipe title is required' }),
  about: z.string().trim().min(1, { message: 'About is required' }),
  prepTime: z.coerce
    .number()
    .int()
    .gte(0, { message: 'Prep time is required' }),
  cookingTime: z.coerce
    .number()
    .int()
    .gte(0, { message: 'Cooking time is required' }),
  readyTime: z.coerce
    .number()
    .int()
    .gte(0, { message: 'Cooking time is required' }),
  servings: z.coerce.number().int().gte(1, { message: 'Servings is required' }),
  ingredients: z
    .object({
      num: z.optional(z.number()),
      ingredient: z.string().trim().min(1, 'Ingredient is required')
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one ingredient' }),
  instructions: z
    .object({
      num: z.optional(z.number()),
      instruction: z.string().trim().min(1, 'Instruction is required')
    })
    .array()
    .nonempty({ message: 'Recipe must atleast have one instruction' })
});

export const clientSchema = baseSchema.extend({
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
          (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
        ),
      'Maximum image size is 5mb.'
    )
});

export const serverSchema = baseSchema.extend({
  image: z
    .custom<File>()
    .refine((file) => file.size > 0, 'Image is required')
    .refine(
      (file) => ACCEPTED_FILES.includes(file.type),
      'Invalid image type. Allowed types are .jpeg, .jpg, .png and .webp'
    )
    .refine(
      (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE,
      'Maximum image size is 5mb.'
    )
});

export type TClientSchema = z.infer<typeof clientSchema>;
export type TServerSchema = z.infer<typeof serverSchema>;
