import { cache } from 'react';
import { prisma } from '@/lib/prisma';

export const getRecipeBySlug = cache(async function getRecipeBySlug(slug: string) {
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    select: {
      id: true,
      imagePublicId: true,
      name: true,
      servings: true,
      slug: true,
      summary: true,
      uploadedAt: true,
      updatedAt: true,
      preparation: true,
      cooking: true,
      total: true,
      ingredients: true,
      instructions: true,
      nutrition: true,
      uploader: {
        select: {
          id: true,
          name: true,
          image: true,
          defaultImage: true,
        },
      },
    },
  });

  return recipe;
});
