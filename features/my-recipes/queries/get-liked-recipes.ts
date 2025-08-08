'use server';

import { prisma } from '@/lib/prisma';

export async function getLikedRecipes(userId: string) {
  return await prisma.likedRecipes.findMany({
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
    orderBy: {
      createdAt: 'desc',
    },
  });
}
