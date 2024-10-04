import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';

import { RecipeTitle } from './recipe-title';
import { RecipeActions } from './recipe-actions';

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

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const recipe = await getRecipe(params.id);

  if (!recipe) notFound();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <div className="flex-auto">
          <RecipeTitle title={recipe.title} />
        </div>
        <RecipeActions />
      </div>

      <div className="md:flex md:gap-x-10">
        <div className="flex-1 space-y-10 md:space-y-14">
          <div className="space-y-8">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-gray-900">Description</p>
              <p
                className="text-sm leading-6 text-gray-700"
                dangerouslySetInnerHTML={{ __html: recipe.description }}
              />
            </div>
            <div className="divide-y divide-gray-200 sm:flex sm:gap-x-6 sm:divide-y-0">
              <div className="flex justify-between pb-4 sm:block sm:flex-1 sm:space-y-1.5 sm:pb-0">
                <p className="text-sm font-medium text-gray-900">Prep time</p>
                <p className="text-sm text-gray-700">15 mins</p>
              </div>
              <div className="flex justify-between py-4 sm:block sm:flex-1 sm:space-y-1.5 sm:py-0">
                <p className="text-sm font-medium text-gray-900">
                  Cooking time
                </p>
                <p className="text-sm text-gray-700">30 mins</p>
              </div>
              <div className="flex justify-between pt-4 sm:block sm:flex-1 sm:space-y-1.5 sm:pt-0">
                <p className="text-sm font-medium text-gray-900">Servings</p>
                <p className="text-sm text-gray-700">6 servings</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif font-semibold text-gray-900">
              Ingredients
            </h3>
            <ul className="list-disc space-y-3 pl-5 text-gray-700 marker:text-gray-400 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3 sm:space-y-0">
              {recipe.ingredients.map(({ id, ingredient }) => (
                <li key={id} className="text-sm">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif font-semibold text-gray-900">
              Instructions
            </h3>
            <ul className="list-none space-y-5 text-gray-700 marker:text-gray-400">
              {recipe.instructions.map(({ step, instruction }) => (
                <li key={step} className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900">
                    Step {step}
                  </p>
                  <p className="text-sm text-gray-700">{instruction}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex-none md:mt-0 md:w-full md:max-w-72">
          <Image
            src={recipe.imageUrl!}
            alt={`${recipe.title}`}
            height={240}
            width={300}
            className="h-80 w-full object-cover md:h-44"
          />
          <div className="mt-10 divide-y divide-gray-200">
            <div className="flex justify-between pb-3">
              <p className="text-sm text-gray-700">Date uploaded</p>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(recipe.uploadedOn)}
              </p>
            </div>
            <div className="flex justify-between pt-3">
              <p className="text-sm text-gray-700">Last updated on</p>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(recipe.updatedOn)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
