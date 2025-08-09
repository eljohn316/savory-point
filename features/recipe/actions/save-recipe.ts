'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function saveRecipe(recipeId: string, userId: string) {
  await prisma.savedRecipes.create({ data: { recipeId, userId } });
  revalidatePath('/recipes/[slug]', 'page');
}
