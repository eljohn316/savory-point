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
      ingredients: {
        select: {
          id: true,
          ingredient: true,
        },
      },
      instructions: {
        select: {
          id: true,
          step: true,
          instruction: true,
        },
        orderBy: {
          step: 'asc',
        },
      },

      nutrition: {
        select: {
          id: true,
          name: true,
          value: true,
        },
      },
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
