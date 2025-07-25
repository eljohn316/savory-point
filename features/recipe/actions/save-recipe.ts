'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

type Payload = {
  recipeId: string;
  userId: string;
};

export async function saveRecipe(recipeSlug: string, payload: Payload) {
  const { recipeId, userId } = payload;
  await prisma.savedRecipes.create({ data: { recipeId, userId } });
  revalidatePath(`/recipes/${recipeSlug}`);
}
