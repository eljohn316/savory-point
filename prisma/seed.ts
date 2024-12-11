import { Prisma, PrismaClient } from '@prisma/client';
import recipes from './data/recipes.json';

const prisma = new PrismaClient();

const createRecipe = (data: Prisma.RecipeCreateInput) =>
  prisma.recipe.create({
    data
  });

const recipesPromises = recipes.map((recipe) => {
  return createRecipe({
    imageUrl: recipe.imageUrl,
    title: recipe.title,
    description: recipe.description,
    prepTimeHours: recipe.prepTimeHours,
    prepTimeMins: recipe.prepTimeMins,
    cookingTimeHours: recipe.cookingTimeHours,
    cookingTimeMins: recipe.cookingTimeMins,
    servings: recipe.servings,
    slug: recipe.slug,
    ingredients: { createMany: { data: recipe.ingredients } },
    instructions: { createMany: { data: recipe.instructions } },
    source: {
      create: {
        url: recipe.source.url,
        imageId: recipe.source.imageId,
        name: recipe.source.name
      }
    }
  });
});

async function main() {
  try {
    await Promise.all(recipesPromises);
    console.log('Database successfully seeded!');
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

main();
