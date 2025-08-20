import { prisma } from '@/lib/prisma';

type GetAllRecipeOptions = Partial<{
  take: number;
  skip: number;
}>;

export async function getAllRecipes({ take, skip }: GetAllRecipeOptions) {
  const [recipes, totalRecipes] = await prisma.$transaction([
    prisma.recipe.findMany({
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
      take,
      skip,
    }),
    prisma.recipe.count(),
  ]);

  return { recipes, totalRecipes };
}
