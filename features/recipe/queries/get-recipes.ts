import { prisma } from '@/lib/prisma';

export async function getAllRecipes() {
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      image: true,
      name: true,
      slug: true,
      uploader: {
        select: {
          profile: {
            select: {
              defaultImage: true,
            },
          },
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return recipes;
}
