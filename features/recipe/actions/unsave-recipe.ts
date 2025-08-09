'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function unsaveRecipe(recipeId: string, userId: string) {
  await prisma.savedRecipes.deleteMany({ where: { AND: [{ recipeId }, { userId }] } });
  revalidatePath('/recipes/[slug]', 'page');
}
