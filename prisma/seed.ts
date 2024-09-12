import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

import recipes from './recipes.json';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const prisma = new PrismaClient();

async function main() {
  try {
    for (const recipe of recipes) {
      const result = await cloudinary.uploader.upload(recipe.imageUrl);

      const newRecipe = await prisma.recipe.create({
        data: {
          id: recipe.id,
          imageUrl: result.secure_url,
          title: recipe.title,
          description: recipe.about,
          cookingTime: recipe.cookingTime,
          prepTime: recipe.prepTime,
          servings: recipe.servings,
          ingredients: { createMany: { data: recipe.ingredients } },
          instructions: {
            createMany: {
              data: recipe.instructions.map((ins, i) => ({
                step: i + 1,
                instruction: ins.instruction
              }))
            }
          },
          slug: recipe.slug,
          uploadedOn: recipe.uploadedOn,
          uploaderId: 'wi5j7khyq2ea74ct'
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
