'use server';

import { prisma } from '@/lib/prisma';

export async function isRecipeLiked(recipeId: string, userId?: string) {
  if (!userId) return false;

  return !!(await prisma.likedRecipes.findFirst({
    where: {
      AND: [{ recipeId }, { userId }],
    },
  }));
}
