'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { validateRequest } from '@/lib/auth';
import { createSlug, toBase64, parseArrayValues } from '@/lib/utils';
import { cloudinary } from '@/lib/cloudinary';
import { serverSchema } from '@/app/upload-recipe/lib/schema';

export type PrevState = {
  errors: {
    title?: string[] | undefined;
    about?: string[] | undefined;
    prepTime?: string[] | undefined;
    cookingTime?: string[] | undefined;
    readyTime?: string[] | undefined;
    servings?: string[] | undefined;
    ingredients?: string[] | undefined;
    instructions?: string[] | undefined;
    image?: string[] | undefined;
  };
};

const titleExists = async (title: string) =>
  await db.recipe.findUnique({ where: { title } });

export async function createRecipeAction(
  prevState: PrevState,
  formData: FormData
): Promise<PrevState> {
  const { user } = await validateRequest();

  if (!user) return redirect('/sign-in');

  const entries = Object.fromEntries(formData);
  const validated = serverSchema.safeParse({
    image: entries.image,
    title: entries.title,
    about: entries.about,
    prepTime: entries.prepTime,
    cookingTime: entries.cookingTime,
    readyTime: entries.readyTime,
    servings: entries.servings,
    ingredients: parseArrayValues('ingredients', entries),
    instructions: parseArrayValues('instructions', entries)
  });

  if (!validated.success)
    return {
      errors: validated.error.flatten().fieldErrors
    };

  if (await titleExists(validated.data.title))
    return {
      errors: {
        title: ['Recipe title is already taken']
      }
    };

  const payload = validated.data;

  const recipe = await db.recipe.create({
    data: {
      title: payload.title,
      about: payload.about,
      prepTime: payload.prepTime,
      cookingTime: payload.cookingTime,
      readyTime: payload.readyTime,
      servings: payload.servings,
      ingredients: { createMany: { data: payload.ingredients } },
      instructions: { createMany: { data: payload.instructions } },
      slug: createSlug(payload.title),
      uploaderId: user.id
    }
  });

  const base64 = await toBase64(payload.image);
  const result = await cloudinary.uploader.upload(base64, {
    public_id: recipe.id,
    resource_type: 'auto',
    folder: 'savory-point'
  });

  await db.recipe.update({
    where: { id: recipe.id },
    data: { imageUrl: result.secure_url }
  });

  cookies().set('toast-message', 'Recipe successfully uploaded');
  redirect('/');
}
