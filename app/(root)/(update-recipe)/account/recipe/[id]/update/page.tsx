import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { UpdateRecipeForm } from './update-recipe-form';
import { notFound } from 'next/navigation';
import { RecipeIngredients } from './recipe-ingredients';
import { RecipeInstructions } from './recipe-instructions';

interface PageProps {
  params: { id: string };
}

export const metadata: Metadata = { title: 'Update recipe' };

async function getRecipe(id: string) {
  try {
    const recipe = await db.recipe.findUnique({
      where: { id },
      include: {
        ingredients: {
          select: {
            id: true,
            ingredient: true
          }
        },
        instructions: {
          select: {
            id: true,
            step: true,
            instruction: true
          }
        }
      }
    });

    return recipe;
  } catch (error) {
    throw error;
  }
}

export default async function Page({ params }: PageProps) {
  const recipe = await getRecipe(params.id);

  if (!recipe) notFound();

  return (
    <div className="">
      <div className="mt-12">
        {/* <RecipeIngredients ingredients={recipe.ingredients} /> */}
        <RecipeInstructions instructions={recipe.instructions} />
      </div>
    </div>
  );
}
