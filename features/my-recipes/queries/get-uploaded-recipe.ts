'use server';

import { cache } from 'react';
import { prisma } from '@/lib/prisma';

export const getUploadedRecipe = cache(async function getUploadedRecipe(id: string) {
  return await prisma.recipe.findUnique({ where: { id } });
});
