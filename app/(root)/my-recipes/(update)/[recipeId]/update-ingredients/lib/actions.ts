'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export async function addIngredient(recipeId: string, data: FormData) {
  try {
    const ingredient = data.get('ingredient') as string;

    await db.ingredient.create({
      data: {
        ingredient,
        recipeId
      }
    });

    revalidatePath(`/my-recipes/${recipeId}/update-ingredients`);
    cookies().set('toast-message', 'Ingredient successfully added');
  } catch (error) {
    cookies().set('toast-message', 'Unable to add ingredient');
    throw error;
  }
}

export async function deleteMultipleIngredients(
  recipeId: string,
  ids: number[]
) {
  try {
    const promises = ids.map((id) => db.ingredient.delete({ where: { id } }));
    await Promise.all(promises);

    revalidatePath(`/my-recipes/${recipeId}/update-ingredients`);
    cookies().set('toast-message', 'Ingredients successfully deleted');
  } catch (error) {
    cookies().set('toast-message', 'Unable to delete ingredients');
    throw error;
  }
}

export async function updateIngredient(ingredientId: number, data: FormData) {
  try {
    const ingredient = await db.ingredient.update({
      where: {
        id: ingredientId
      },
      data: {
        ingredient: data.get('ingredient') as string
      }
    });

    revalidatePath(`/my-recipes/${ingredient.recipeId}/update-ingredients`);
    cookies().set('toast-message', 'Ingredient successfully updated');
  } catch (error) {
    cookies().set('toast-message', 'Unable to update ingredient');
    throw error;
  }
}

export async function deleteIngredient(ingredientId: number) {
  try {
    const ingredient = await db.ingredient.delete({
      where: {
        id: ingredientId
      }
    });

    revalidatePath(`/my-recipes/${ingredient.recipeId}/update-ingredients`);
    cookies().set('toast-message', 'Ingredient successfully deleted');
  } catch (error) {
    cookies().set('toast-message', 'Unable to delete ingredient');
    throw error;
  }
}
