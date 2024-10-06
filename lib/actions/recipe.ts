/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { ActionResponse } from '@/lib/types';
import { recipeServerSchema } from '../schema/upload-recipe';
import { createSlug } from '../utils';
import { z } from 'zod';
import { upload } from '../cloudinary';

type CreateRecipeInput = z.infer<typeof recipeServerSchema>;

export async function createRecipe(
  _: any,
  formData: FormData
): Promise<ActionResponse<CreateRecipeInput>> {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  const { success, data, error } = recipeServerSchema.safeParse({
    image: formData.get('image') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    prepTimeHours: +(formData.get('prepTimeHours') as string),
    prepTimeMins: +(formData.get('prepTimeMins') as string),
    cookingTimeHours: +(formData.get('cookingTimeHours') as string),
    cookingTimeMins: +(formData.get('cookingTimeMins') as string),
    servings: +(formData.get('servings') as string),
    ingredients: JSON.parse(formData.get('ingredients') as string),
    instructions: JSON.parse(formData.get('instructions') as string)
  });

  if (!success) {
    const err = error.flatten();

    return {
      success: false,
      errors: {
        title: err.fieldErrors.title?.at(0),
        description: err.fieldErrors.description?.at(0),
        prepTimeHours: err.fieldErrors.prepTimeHours?.at(0),
        prepTimeMins: err.fieldErrors.prepTimeMins?.at(0),
        cookingTimeHours: err.fieldErrors.cookingTimeHours?.at(0),
        cookingTimeMins: err.fieldErrors.cookingTimeMins?.at(0),
        servings: err.fieldErrors.servings?.at(0),
        ingredients: err.fieldErrors.ingredients?.at(0),
        instructions: err.fieldErrors.instructions?.at(0),
        image: err.fieldErrors.image?.at(0)
      }
    };
  }

  if (await db.recipe.findUnique({ where: { title: data.title } }))
    return {
      success: false,
      errors: {
        title: 'Recipe title already taken. Use another title'
      }
    };

  try {
    const imageUrl = await upload(data.image, {
      public_id: createSlug(data.title),
      resource_type: 'auto',
      folder: 'savory-point'
    });

    await db.recipe.create({
      data: {
        imageUrl,
        title: data.title,
        description: data.description,
        prepTimeHours: data.prepTimeHours ?? 0,
        prepTimeMins: data.prepTimeMins ?? 0,
        cookingTimeHours: data.cookingTimeHours ?? 0,
        cookingTimeMins: data.cookingTimeMins ?? 0,
        servings: data.servings,
        ingredients: { createMany: { data: data.ingredients } },
        instructions: { createMany: { data: data.instructions } },
        slug: createSlug(data.title),
        uploaderId: user.id
      }
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong. Could not create recipe'
    };
  }

  revalidatePath('/');
  return {
    success: true,
    message: 'Recipe successfully uploaded'
  };
}

export async function deleteRecipe(
  id: string
): Promise<ActionResponse<{ message?: string; success?: boolean }>> {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  try {
    await db.recipe.delete({
      where: { id }
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Some went wrong. Could not delete recipe'
    };
  }

  cookies().set(
    'toast-message',
    JSON.stringify({
      variant: 'success',
      title: 'Recipe successfully deleted'
    })
  );

  revalidatePath('/account');
  redirect('/account');
}
