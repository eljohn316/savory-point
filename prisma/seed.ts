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
    // const result = await uploadImage(data.imageUrl, data.id);
    // console.log('Result');
    // console.log(result);
    // for (const recipe of recipes) {
    //   const newRecipe = await prisma.recipe.create({
    //     data: {
    //       id: recipe.id,
    //       image: {
    //         create: {
    //           url: recipe.imageUrl,
    //           publicId: recipe.slug
    //         }
    //       },
    //       title: recipe.title,
    //       cookingTime: recipe.cookingTime,
    //       prepTime: recipe.prepTime,
    //       servings: recipe.servings,
    //       about: recipe.about,
    //       ingredients: { createMany: { data: recipe.ingredients } },
    //       instructions: { createMany: { data: recipe.instructions } },
    //       slug: recipe.slug,
    //       uploadedOn: recipe.uploadedOn
    //     }
    //   });
    //   console.log(`Recipe ID: ${newRecipe.id} successfully created!`);
    // }
    // console.log('Database successfully seeded');
  } catch (error) {
    console.error(error);
  }
}

main();
