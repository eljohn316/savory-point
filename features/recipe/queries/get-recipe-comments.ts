'use server';

import { prisma } from '@/lib/prisma';

type Options = {
  take?: number;
  skip?: number;
};

export async function getRecipeComments(recipeId: string, opts?: Options) {
  const comments = await prisma.comment.findMany({
    where: {
      recipeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: opts?.take,
    skip: opts?.skip,
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
  });

  return comments;
}
