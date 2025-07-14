import { prisma } from '@/lib/prisma';

export async function getRecipeBySlug(slug: string) {
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    select: {
      id: true,
      image: true,
      name: true,
      servings: true,
      slug: true,
      summary: true,
      uploadedAt: true,
      cooking: {
        select: {
          preparation: true,
          cooking: true,
          total: true,
        },
      },
      ingredients: true,
      instructions: true,
      nutrition: true,
      uploader: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profile: {
            select: {
              defaultImage: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return recipe;
}
