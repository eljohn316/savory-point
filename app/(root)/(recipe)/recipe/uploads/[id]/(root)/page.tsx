import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { DeleteSection } from './delete-section';

async function getRecipe(id: string) {
  try {
    const recipe = await db.recipe.findUnique({
      where: { id },
      include: {
        ingredients: {
          orderBy: { id: 'asc' },
          select: {
            id: true,
            ingredient: true
          }
        },
        instructions: {
          orderBy: { step: 'asc' },
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

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const recipe = await getRecipe(params.id);

  if (!recipe) notFound();

  return (
    <>
      <div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Primary details
          </h3>
          <Button variant="outline" asChild>
            <Link href={`/recipe/uploads/${params.id}/update?id=details`}>
              Update
            </Link>
          </Button>
        </div>

        <div className="mt-6">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Title
              </dt>
              <dd className="mt-1 leading-6 text-gray-700 sm:mt-2 sm:text-sm">
                {recipe.title}
              </dd>
            </div>
            <div className="sm:col-span-3">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Description
              </dt>
              <dd
                className="mt-1 leading-6 text-gray-700 sm:mt-2 sm:text-sm"
                dangerouslySetInnerHTML={{ __html: recipe.description }}
              />
            </div>
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Preparation time
              </dt>
              <dd className="mt-1 leading-6 text-gray-700 sm:mt-2 sm:text-sm">
                {recipe.prepTimeHours > 0 && (
                  <span>{recipe.prepTimeHours} hr </span>
                )}
                {recipe.prepTimeMins > 0 && (
                  <span>{recipe.prepTimeMins} min</span>
                )}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Cooking time
              </dt>
              <dd className="mt-1 leading-6 text-gray-700 sm:mt-2 sm:text-sm">
                {recipe.cookingTimeHours > 0 && (
                  <span>{recipe.cookingTimeHours} hr </span>
                )}
                {recipe.cookingTimeMins > 0 && (
                  <span>{recipe.cookingTimeMins} min</span>
                )}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Servings
              </dt>
              <dd className="mt-1 leading-6 text-gray-700 sm:mt-2 sm:text-sm">
                {recipe.servings} {recipe.servings > 1 ? 'servings' : 'serving'}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Uploaded on
              </dt>
              <dd className="mt-1 leading-6 text-gray-700 sm:mt-2 sm:text-sm">
                {formatDate(recipe.uploadedOn)}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="font-medium leading-6 text-gray-900 sm:text-sm">
                Last updated
              </dt>
              <dd className="mt-1 leading-6 text-gray-700 sm:mt-2 sm:text-sm">
                {formatDate(recipe.updatedOn)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Ingredients
          </h3>
          <Button variant="outline" asChild>
            <Link href={`/recipe/uploads/${params.id}/update?id=ingredients`}>
              Update
            </Link>
          </Button>
        </div>

        <div className="mt-6">
          <ul className="list-disc space-y-5 pl-5 marker:text-gray-400">
            {recipe.ingredients.map(({ id, ingredient }) => (
              <li key={id} className="font-medium text-gray-700 sm:text-sm">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Instructions
          </h3>
          <Button variant="outline" asChild>
            <Link href={`/recipe/uploads/${params.id}/update?id=instructions`}>
              Update
            </Link>
          </Button>
        </div>

        <div className="mt-6">
          <ol className="list-none space-y-6 marker:text-gray-400">
            {recipe.instructions.map(({ id, step, instruction }) => (
              <li
                key={id}
                className="space-y-2 sm:flex sm:items-baseline sm:gap-x-6 sm:space-y-0">
                <div className="font-medium text-gray-900 sm:w-full sm:max-w-16 sm:flex-none sm:text-sm">
                  Step {step}
                </div>
                <div className="leading-6 text-gray-700 sm:text-sm">
                  {instruction}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Image
          </h3>
          <Button variant="outline" asChild>
            <Link href={`/recipe/uploads/${params.id}/update?id=image`}>
              Update
            </Link>
          </Button>
        </div>

        <div className="mt-6">
          <div className="max-w-md">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              height={800}
              width={600}
              className="h-64 w-full rounded-md object-cover sm:h-80"
            />
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-gray-200 pt-10">
        <DeleteSection />
      </div>
    </>
  );
}
