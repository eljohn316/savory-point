'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { validateRequest } from '@/lib/auth';
import { createSlug, toBase64, parseArrayValues } from '@/lib/utils';
import { cloudinary } from '@/lib/cloudinary';
import { recipeServerSchema } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export type PrevState = {
  errors: {
    title?: string[] | undefined;
    description?: string[] | undefined;
    prepTime?: string[] | undefined;
    cookingTime?: string[] | undefined;
    servings?: string[] | undefined;
    ingredients?: string[] | undefined;
    instructions?: string[] | undefined;
    image?: string[] | undefined;
  };
  message?: string;
};

export async function createRecipeAction(
  prevState: PrevState,
  formData: FormData
): Promise<PrevState> {
  const { user } = await validateRequest();
  if (!user) return redirect('/sign-in');

  const entries = Object.fromEntries(formData);

  const { success, data, error } = recipeServerSchema.safeParse({
    image: entries.image,
    title: entries.title,
    description: entries.description,
    prepTime: entries.prepTime,
    cookingTime: entries.cookingTime,
    servings: entries.servings,
    ingredients: parseArrayValues('ingredients', entries),
    instructions: parseArrayValues('instructions', entries).map((ins, i) => ({
      step: i + 1,
      instruction: ins.instruction
    }))
  });

  if (!success)
    return {
      errors: error.flatten().fieldErrors
    };

  if (await db.recipe.findUnique({ where: { title: data.title } }))
    return {
      errors: {
        title: ['Recipe title is already taken']
      }
    };

  const recipe = await db.recipe.create({
    data: {
      title: data.title,
      description: data.description,
      prepTime: data.prepTime,
      cookingTime: data.cookingTime,
      servings: data.servings,
      ingredients: { createMany: { data: data.ingredients } },
      instructions: { createMany: { data: data.instructions } },
      slug: createSlug(data.title),
      uploaderId: user.id
    }
  });

  const base64 = await toBase64(data.image);
  const result = await cloudinary.uploader.upload(base64, {
    public_id: recipe.id,
    resource_type: 'auto',
    folder: 'savory-point'
  });

  await db.recipe.update({
    where: { id: recipe.id },
    data: { imageUrl: result.secure_url }
  });

  revalidatePath('/');
  cookies().set('toast-message', 'Recipe successfully uploaded');
  redirect('/');
}
