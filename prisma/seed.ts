import { PrismaClient } from '@prisma/client';
import recipes from './recipes.json';

const prisma = new PrismaClient();

async function main() {
  try {
    for (const recipe of recipes) {
      const newRecipe = await prisma.recipe.create({
        data: {
          id: recipe.id,
          image: {
            create: {
              url: recipe.imageUrl,
              publicId: recipe.slug
            }
          },
          title: recipe.title,
          cookingTime: recipe.cookingTime,
          prepTime: recipe.prepTime,
          servings: recipe.servings,
          about: recipe.about,
          ingredients: { createMany: { data: recipe.ingredients } },
          instructions: { createMany: { data: recipe.instructions } },
          slug: recipe.slug,
          uploadedOn: recipe.uploadedOn
        }
      });

      console.log(`Recipe ID: ${newRecipe.id} successfully created!`);
    }

    console.log('Database successfully seeded');
  } catch (error) {
    console.error(error);
  }
}

main();
