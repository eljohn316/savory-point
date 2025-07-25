'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

type Payload = {
  recipeId: string;
  userId: string;
};

export async function unLikeRecipe(recipeSlug: string, payload: Payload) {
  const { recipeId, userId } = payload;
  await prisma.likedRecipes.deleteMany({ where: { AND: [{ recipeId }, { userId }] } });
  revalidatePath(`/recipes/${recipeSlug}`);
}
