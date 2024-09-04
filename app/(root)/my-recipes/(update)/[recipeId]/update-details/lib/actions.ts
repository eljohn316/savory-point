'use server';

import { db } from '@/lib/db';
import { recipeServerSchema } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type PrevState = {
  errors?: {
    title?: string[] | undefined;
    description?: string[] | undefined;
    prepTime?: string[] | undefined;
    cookingTime?: string[] | undefined;
    servings?: string[] | undefined;
  };
  message?: string;
};

const schema = recipeServerSchema.pick({
  title: true,
  description: true,
  prepTime: true,
  cookingTime: true,
  servings: true
});

export async function updateRecipeDetails(
  recipeId: string,
  prevState: PrevState,
  formData: FormData
) {
  const { success, data, error } = schema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return {
      errors: error.flatten().fieldErrors
    };
  }

  try {
    await db.recipe.update({
      where: { id: recipeId },
      data: {
        title: data.title,
        description: data.description,
        prepTime: data.prepTime,
        cookingTime: data.cookingTime,
        servings: data.servings
      }
    });
  } catch (error) {
    console.error(error);
    return { message: 'Could not update. Something went wrong!' };
  }

  cookies().set('toast-message', 'Recipe successfully updated');

  revalidatePath(`/my-recipes/${recipeId}`);
  redirect(`/my-recipes/${recipeId}`);
}
