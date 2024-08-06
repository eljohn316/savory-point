'use server';

import slugify from 'slugify';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { db } from '@/lib/db';
import { getImageUri, validateRecipeFields } from './helpers';

type UploadRecipeImageResponse =
  | {
      success: false;
      message: string;
    }
  | { success: true; data: string };

async function uploadRecipeImage(
  file: File
): Promise<UploadRecipeImageResponse> {
  const imageUri = await getImageUri(file);
  const uploadResult = await uploadImageToCloudinary(imageUri);

  if (!uploadResult.success) {
    return {
      success: false,
      message: uploadResult.error.message
    };
  }

  return {
    success: true,
    data: uploadResult.result.secure_url
  };
}

export async function createRecipe(
  prevState: { errors?: string[]; message?: string },
  formData: FormData
): Promise<{ errors?: string[]; message?: string }> {
  const validationResult = validateRecipeFields(formData);
  if (!validationResult.success)
    return {
      message: validationResult.message,
      errors: validationResult.errors
    };

  const imageFile = formData.get('image') as File;
  const uploadResult = await uploadRecipeImage(imageFile);
  if (!uploadResult.success)
    return {
      message: uploadResult.message
    };

  await db.recipe.create({
    data: {
      imageUrl: uploadResult.data,
      title: validationResult.data.title,
      about: validationResult.data.about,
      servings: validationResult.data.servings,
      prepTime: validationResult.data.prepTime,
      cookingTime: validationResult.data.cookingTime,
      ingredients: {
        createMany: {
          data: validationResult.data.ingredients.map(({ ingredient }) => ({
            ingredient
          }))
        }
      },
      instructions: {
        createMany: {
          data: validationResult.data.instructions.map(({ instruction }) => ({
            instruction
          }))
        }
      },
      slug: slugify(validationResult.data.title, { remove: /[*+~.()'"!:@]/g })
    }
  });

  cookies().set(
    'toast',
    JSON.stringify({
      variant: 'success',
      message: 'Recipe successfully created'
    })
  );

  redirect('/');
}
