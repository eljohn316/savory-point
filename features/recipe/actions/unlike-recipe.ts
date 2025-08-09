'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function unLikeRecipe(recipeId: string, userId: string) {
  await prisma.likedRecipes.deleteMany({ where: { AND: [{ recipeId }, { userId }] } });
  revalidatePath('/recipes/[slug]', 'page');
}
