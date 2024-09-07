import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { UpdateImageButton } from './update-image-button';
import { RemoveImageButton } from './remove-image-button';

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
    <div className="lg:flex lg:gap-x-8">
      <div className="space-y-24 lg:flex-1 lg:pr-8 lg:border-r lg:border-gray-200">
        <div>
          <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Primary details
            </h3>
            <Button asChild>
              <Link href={`/my-recipes/${params.recipeId}/update-details`}>
                Update
              </Link>
            </Button>
          </div>
          <div className="mt-6">
            <dl className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8">
              <div className="space-y-2 sm:col-span-2">
                <dt className="text-gray-500 font-medium sm:text-sm">Title</dt>
                <dd className="text-gray-900 font-medium sm:text-sm">
                  {recipe.title}
                </dd>
              </div>
              <div className="space-y-2 sm:col-span-3">
                <dt className="text-gray-500 font-medium sm:text-sm">
                  Description
                </dt>
                <dd className="text-gray-900 font-medium sm:text-sm">
                  {recipe.description}
                </dd>
              </div>
              <div className="space-y-2 sm:col-span-1">
                <dt className="text-gray-500 font-medium sm:text-sm">
                  Preparation time
                </dt>
                <dd className="text-gray-900 font-medium sm:text-sm">
                  {recipe.prepTime} {recipe.prepTime > 1 ? 'mins' : 'min'}
                </dd>
              </div>
              <div className="space-y-2 sm:col-span-1">
                <dt className="text-gray-500 font-medium sm:text-sm">
                  Cooking time
                </dt>
                <dd className="text-gray-900 font-medium sm:text-sm">
                  {recipe.cookingTime} {recipe.cookingTime > 1 ? 'mins' : 'min'}
                </dd>
              </div>
              <div className="space-y-2 sm:col-span-1">
                <dt className="text-gray-500 font-medium sm:text-sm">
                  Servings
                </dt>
                <dd className="text-gray-900 font-medium sm:text-sm">
                  {recipe.servings}{' '}
                  {recipe.servings > 1 ? 'servings' : 'serving'}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div>
          <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Ingredients
            </h3>
            <Button asChild>
              <Link href={`/my-recipes/${params.recipeId}/update-ingredients`}>
                Update
              </Link>
            </Button>
          </div>
          <div className="mt-6">
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
              {recipe.ingredients.map((ing) => (
                <div
                  key={ing.id}
                  className="text-gray-900 font-medium sm:text-sm">
                  {ing.ingredient}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Instructions
            </h3>
            <Button asChild>
              <Link href={`/my-recipes/${params.recipeId}/update-instructions`}>
                Update
              </Link>
            </Button>
          </div>
          <div className="mt-6">
            <div className="space-y-6">
              {recipe.instructions.map((ins) => (
                <div
                  key={ins.id}
                  className="space-y-1.5 sm:space-y-0 sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-6">
                  <div className="text-gray-500 font-medium sm:text-sm">
                    Step {ins.step}
                  </div>
                  <p className="text-gray-900 font-medium sm:text-sm">
                    {ins.instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Image
            </h3>
          </div>
          <div className="mt-6 max-w-80 w-full">
            <div className="h-64 relative flex-1 rounded-lg overflow-hidden">
              <Image
                src={recipe.imageUrl!}
                alt="Recipe image preview"
                fill
                sizes="(min-width: 808px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4">
              <UpdateImageButton imageUrl={recipe.imageUrl!} />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:shrink-0 max-w-80 w-full">
        <div className="h-64 relative flex-1 rounded-lg overflow-hidden">
          <Image
            src={recipe.imageUrl!}
            alt="Recipe image preview"
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-4">
          <UpdateImageButton imageUrl={recipe.imageUrl!} />
        </div>
      </div>
    </div>
  );
}
