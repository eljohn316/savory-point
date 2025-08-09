'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function likeRecipe(recipeId: string, userId: string) {
  await prisma.likedRecipes.create({ data: { recipeId, userId } });
  revalidatePath('/recipes/[slug]', 'page');
}
