import { z } from 'zod';
import { schema } from './schema';

const recipeSchema = schema.omit({ image: true });

type ValidateRecipeFieldsResponse =
  | {
      success: false;
      message: string;
      errors: string[];
    }
  | { success: true; data: z.infer<typeof recipeSchema> };

export const validateRecipeFields = (
  formData: FormData
): ValidateRecipeFieldsResponse => {
  const title = formData.get('title') as string;
  const about = formData.get('about') as string;

  const prepTime = Number(formData.get('prepTime') as string);
  const cookingTime = Number(formData.get('cookingTime') as string);
  const servings = Number(formData.get('servings') as string);

  const ingredients = Array.from(formData.keys())
    .filter((key) => key.startsWith('ingredients'))
    .map((item) => ({ ingredient: formData.get(item) as string }));

  const instructions = Array.from(formData.keys())
    .filter((key) => key.startsWith('instructions'))
    .map((item) => ({ instruction: formData.get(item) as string }));

  const validatedFields = recipeSchema.safeParse({
    title,
    about,
    prepTime,
    cookingTime,
    servings,
    ingredients,
    instructions
  });

  if (!validatedFields.success) {
    const numErrors = validatedFields.error.issues.length;

    return {
      success: false,
      message: `There were ${numErrors} ${
        numErrors > 1 ? 'errors' : 'error'
      } with your submission`,
      errors: validatedFields.error.issues.map((issue) => issue.message)
    };
  }

  return { success: true, data: validatedFields.data };
};

export const getImageUri = async (file: File): Promise<string> => {
  const fileBuffer = await file.arrayBuffer();
  const mimeType = file.type;
  const encoding = 'base64';
  const base64Data = Buffer.from(fileBuffer).toString(encoding);
  const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data;

  return fileUri;
};
