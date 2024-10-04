import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { RecipeTitle } from './recipe-title';

async function getRecipe(slug: string) {
  try {
    const recipe = await db.recipe.findUnique({
      where: {
        slug
      },
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
        },
        uploader: {
          select: {
            firstName: true,
            lastName: true,
            defaultImage: true,
            image: true
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
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const recipe = await getRecipe(params.slug);

  if (!recipe) notFound();

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <RecipeTitle title={recipe.title} />
        <div className="flex border-y border-gray-200 py-4">
          <div className="flex-none">
            <Image
              src={
                recipe.uploader!.image
                  ? recipe.uploader!.image
                  : recipe.uploader!.defaultImage
              }
              alt="User profile photo"
              height={60}
              width={60}
              className="size-11 rounded-full"
            />
          </div>
          <div className="ml-4">
            <p className="text-sm">
              by{' '}
              <span className="font-semibold text-gray-900">
                {recipe.uploader!.firstName} {recipe.uploader!.lastName}
              </span>
            </p>
            <div className="sm:flex sm:divide-x sm:divide-gray-300">
              <p className="text-sm sm:pr-4">
                <span className="text-gray-500">Uploaded on </span>
                <span className="text-gray-900">
                  {formatDate(recipe.uploadedOn)}
                </span>
              </p>
              <p className="text-sm sm:pl-4">
                <span className="text-gray-500">Last updated </span>
                <span className="text-gray-900">
                  {formatDate(recipe.updatedOn)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: recipe.description }}
      />

      <div className="mx-auto max-w-xl">
        <figure className="h-64 overflow-hidden rounded-md sm:h-72">
          <Image
            src={recipe.imageUrl!}
            alt={recipe.title}
            height={300}
            width={500}
            quality={100}
            className="size-full object-cover"
          />
        </figure>
      </div>

      <div className="flex flex-col divide-y divide-gray-300 rounded-md border border-gray-300 bg-gray-50 xs:flex-row xs:divide-x xs:divide-y-0">
        <div className="flex-1 py-3 text-center">
          <p className="text-sm font-medium text-gray-500">Servings</p>
          <p className="mt-1 font-medium">
            {recipe.servings} {recipe.servings > 1 ? 'servings' : 'serving'}
          </p>
        </div>
        <div className="flex-1 py-3 text-center">
          <p className="text-sm font-medium text-gray-500">Prep time</p>
          <p className="mt-1 font-medium">
            {recipe.prepTime} {recipe.prepTime > 1 ? 'mins' : 'min'}
          </p>
        </div>
        <div className="flex-1 py-3 text-center">
          <p className="text-sm font-medium text-gray-500">Cooking time</p>
          <p className="mt-1 font-medium">
            {recipe.cookingTime} {recipe.cookingTime > 1 ? 'mins' : 'min'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-serif text-lg font-semibold text-gray-900">
          Ingredients
        </h3>
        <ul className="list-disc space-y-3 pl-5 text-gray-700 marker:text-gray-400 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3 sm:space-y-0">
          {recipe.ingredients.map(({ id, ingredient }) => (
            <li key={id}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <h3 className="font-serif text-lg font-semibold text-gray-900">
          Instructions
        </h3>
        <ul className="list-none space-y-5 text-gray-700 marker:text-gray-400">
          {recipe.instructions.map(({ step, instruction }) => (
            <li key={step} className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">Step {step}</p>
              <p className="text-gray-700">{instruction}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
