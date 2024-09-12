import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import { db } from '@/lib/db';
import { cache } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

const getRecipe = cache(async function getRecipe(slug: string) {
  return await db.recipe.findFirst({
    where: { slug },
    include: {
      ingredients: true,
      instructions: true,
      uploader: true
    }
  });
});

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const recipe = await getRecipe(params.slug);

  if (!recipe) notFound();

  return {
    title: recipe.title
  };
}

export default async function Page({ params }: PageProps) {
  const recipe = await getRecipe(params.slug);

  if (!recipe) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bold text-2xl leading-9">{recipe.title}</h1>
        <div className="mt-2">
          <div className="flex items-center">
            <div className="shrink-0">
              <Image
                src={recipe.uploader!.image!}
                alt=""
                height={40}
                width={40}
                className="size-10 rounded-full"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {recipe.uploader?.firstName} {recipe.uploader?.lastName}
              </p>
              <div className="text-sm text-gray-500">
                <span>posted on</span>{' '}
                <time dateTime={formatDate(recipe.uploadedOn)}>
                  {formatDate(recipe.uploadedOn)}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-gray-700">{recipe.description}</p>
      </div>

      <div>
        <figure className="h-80 overflow-hidden rounded-md sm:h-96">
          <Image
            src={recipe.imageUrl!}
            alt={recipe.title}
            height={400}
            width={600}
            quality={100}
            className="size-full object-cover"
          />
        </figure>
      </div>

      <div>
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
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Ingredients
        </h3>
        <ul className="list-disc space-y-3 pl-5 text-gray-700 marker:text-gray-400">
          {recipe.ingredients.map(({ id, ingredient }) => (
            <li key={id}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Instructions
        </h3>
        <ul className="list-none space-y-4 text-gray-700 marker:text-gray-400">
          {recipe.instructions.map(({ id, step, instruction }) => (
            <li key={id}>
              <p className="text-emerald-600">Step {step}</p>
              <p className="text-gray-900">{instruction}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
