'use server';

import { prisma } from '@/lib/prisma';

export async function getTotalRecipeComments(id: string) {
  return await prisma.comment.count({ where: { recipeId: id } });
}
