import { z } from 'zod';

const ACCEPTED_FILES = ['image/png', 'image/jpg', 'image/jpeg'];
const MAX_IMAGE_SIZE = 5; // megabytes

const sizeInMb = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const schema = z.object({
  title: z.string().trim().min(1, { message: 'Title is required' }),
  about: z.string().trim().min(1, { message: 'About is required' }),
  prepTime: z.coerce
    .number()
    .int()
    .gte(1, { message: 'Prep time is required' }),
  cookingTime: z.coerce
    .number()
    .int()
    .gte(1, { message: 'Cooking time is required' }),
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
    .nonempty({ message: 'Recipe must atleast have one instruction' }),
  image: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0;
    }, 'Image is required')
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMb(file.size) <= MAX_IMAGE_SIZE
      );
    }, `Image file size exceeded the maximum accepted file size. (${MAX_IMAGE_SIZE} mb)`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) => {
        return ACCEPTED_FILES.includes(file.type);
      });
    }, 'Image file type unsupported')
});
