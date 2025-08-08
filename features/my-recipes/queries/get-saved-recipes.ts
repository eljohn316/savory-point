'use server';

import { prisma } from '@/lib/prisma';

export async function getSavedRecipes(userId: string) {
  return await prisma.savedRecipes.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      recipe: {
        select: {
          id: true,
          imagePublicId: true,
          name: true,
        },
      },
      createdAt: true,
    },
  });
}
