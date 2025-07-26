'use server';

import { prisma } from '@/lib/prisma';

export async function getRecipeComments(recipeId: string, take?: number) {
  const [comments, totalComments] = await prisma.$transaction([
    prisma.comment.findMany({
      where: {
        recipeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: take,
      select: {
        id: true,
        content: true,
        createdAt: true,
        recipeId: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            defaultImage: true,
          },
        },
      },
    }),
    prisma.comment.count(),
  ]);

  return {
    comments,
    totalComments,
  };
}
