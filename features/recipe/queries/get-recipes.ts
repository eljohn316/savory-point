import { prisma } from '@/lib/prisma';

export async function getAllRecipes() {
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      imagePublicId: true,
      name: true,
      slug: true,
      uploader: {
        select: {
          defaultImage: true,
          image: true,
          name: true,
        },
      },
    },
    orderBy: {
      uploadedAt: 'desc',
    },
  });

  return recipes;
}
