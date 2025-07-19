'use server';

import { prisma } from '@/lib/prisma';

export async function getRecipeByName(name: string) {
  return await prisma.recipe.findUnique({ where: { name } });
}
