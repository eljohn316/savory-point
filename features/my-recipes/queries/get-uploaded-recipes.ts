'use server';

import { prisma } from '@/lib/prisma';

export async function getUploadedRecipes(uploaderId: string) {
  return await prisma.recipe.findMany({
    where: {
      uploaderId,
    },
    select: {
      id: true,
      imagePublicId: true,
      name: true,
      uploadedAt: true,
    },
  });
}
