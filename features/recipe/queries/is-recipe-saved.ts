'use server';

import { prisma } from '@/lib/prisma';

export async function isRecipeSaved(recipeId: string, userId?: string) {
  if (!userId) return false;

  return !!(await prisma.savedRecipes.findFirst({
    where: {
      AND: [{ recipeId }, { userId }],
    },
  }));
}
