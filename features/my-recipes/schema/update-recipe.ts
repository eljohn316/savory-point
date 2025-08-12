import { z } from 'zod';

export const ACCEPTED_FILES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const MAX_IMAGE_SIZE = 5;

function convertToMB(sizeInBytes: number, decimalsNum = 2) {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
}

const baseSchema = z.object({
  name: z.string().min(1, { message: 'Recipe name is required' }),
  summary: z.string().min(1, { message: 'Summary is required' }),
  servings: z.coerce.number().min(1, { message: 'Servings is required' }),
  cooking: z.coerce.number().min(0, { message: 'Cooking is required' }),
  preparation: z.coerce.number().min(0, { message: 'Cooking is required' }),
  total: z.coerce.number().min(0, { message: 'Cooking is required' }),
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

export const updateRecipeClientSchema = baseSchema.extend({
  image: z.custom<FileList | undefined>().superRefine((val, ctx) => {
    if (typeof val === 'undefined' || val.length < 1) {
      ctx.addIssue({
        code: 'custom',
        message: 'Image is required',
      });

      return z.NEVER;
    }

    if (!Array.from(val).every((file) => ACCEPTED_FILES.includes(file.type))) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid image type. Allowed types are .jpeg, .jpg, .png and .webp',
      });

      return z.NEVER;
    }

    if (Array.from(val).every((val) => convertToMB(val.size) > MAX_IMAGE_SIZE)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Image is too large. Max image size is 5MB',
      });
    }
  }),
});

export const updateRecipeServerSchema = baseSchema.extend({
  uploaderId: z.string(),
  image: z.string().min(1, { message: 'Image is required' }),
});
