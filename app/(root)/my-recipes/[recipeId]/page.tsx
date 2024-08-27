import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = {
  params: { recipeId: string };
};

const cachedGetRecipeDetails = cache(async function getRecipeDetails(
  recipeId: string
) {
  try {
    const recipe = await db.recipe.findUnique({
      where: { id: recipeId },
      include: {
        ingredients: true,
        instructions: true
      }
    });

    return recipe;
  } catch (error) {
    throw new Error('Error fetching recipe details');
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.recipeId;
  const recipe = await cachedGetRecipeDetails(id);

  if (!recipe) notFound();

  return {
    title: recipe.title
  };
}

export default async function Page({ params }: Props) {
  const recipe = await cachedGetRecipeDetails(params.recipeId);

  if (!recipe) notFound();

  return (
    <div>
      <div className="border-b border-gray-300 pb-6 mb-6">
        <div className="sm:flex sm:items-center sm:justify-between sm:gap-x-4">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
              {recipe.title}
            </h3>
            <p className="text-gray-500 sm:text-sm">
              Uploaded on {formatDate(recipe.uploadedOn)}
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href={`/my-recipes/${recipe.id}/update`}>Update</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
        <div className="col-span-2 sm:col-span-3">
          <dt className="font-medium leading-6 text-gray-500">Description</dt>
          <dd className="mt-1 leading-6 text-gray-900 sm:mt-2">
            {recipe.about}
          </dd>
        </div>
        <div className="col-span-1">
          <dt className="font-medium leading-6 text-gray-500">Prep time</dt>
          <dd className="mt-1 leading-6 text-gray-900 sm:mt-2">
            {recipe.prepTime} {recipe.prepTime > 1 ? 'mins' : 'min'}
          </dd>
        </div>
        <div className="col-span-1">
          <dt className="font-medium leading-6 text-gray-500">Cooking time</dt>
          <dd className="mt-1 leading-6 text-gray-900 sm:mt-2">
            {recipe.prepTime} {recipe.prepTime > 1 ? 'mins' : 'min'}
          </dd>
        </div>
        <div className="col-span-1">
          <dt className="font-medium leading-6 text-gray-500">Servings</dt>
          <dd className="mt-1 leading-6 text-gray-900 sm:mt-2">
            {recipe.servings} {recipe.servings > 1 ? 'persons' : 'person'}
          </dd>
        </div>
      </div>

      {recipe.ingredients.length > 0 && (
        <div className="mt-10">
          <div className="font-medium text-gray-500">Ingredients</div>
          <ul
            role="list"
            className="mt-1 marker:text-gray-400 list-disc pl-5 space-y-3 sm:mt-3">
            {recipe.ingredients.map((ing) => (
              <li key={ing.id} className="text-gray-900">
                {ing.ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recipe.instructions.length > 0 && (
        <div className="mt-10">
          <div className="font-medium text-gray-500">Instructions</div>
          <ul
            role="list"
            className="mt-1 marker:text-gray-500 list-decimal pl-5 space-y-3 sm:mt-3">
            {recipe.instructions.map((ins) => (
              <li key={ins.id} className="text-gray-900">
                {ins.instruction}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10">
        <div className="font-medium text-gray-500">Image</div>
        <div className="relative mt-3 h-72 max-w-96 w-full">
          <Image
            src={recipe.imageUrl!}
            alt={recipe.title}
            fill
            sizes="75vw"
            className="size-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
