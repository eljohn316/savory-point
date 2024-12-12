import type { Metadata } from 'next';
import { cache } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const recipe = await getRecipe(slug);
  if (!recipe) notFound();

  return {
    title: recipe.title
  };
}

const getRecipe = cache(async function getRecipe(slug: string) {
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
        },
        source: {
          select: {
            imageId: true,
            name: true,
            url: true
          }
        }
      }
    });

    return recipe;
  } catch (error) {
    throw error;
  }
});

export default async function Page({ params }: Props) {
  const recipe = await getRecipe(params.slug);

  if (!recipe) notFound();

  return (
    <div className="md:flex md:gap-x-16 lg:gap-x-24">
      <div className="md:flex-auto">
        <h1 className="font-serif text-2xl font-bold text-gray-900 lg:text-3xl">
          {recipe.title}
        </h1>

        {recipe.uploader && (
          <div className="mt-3 flex items-center">
            <div className="flex-none">
              <Image
                src={
                  recipe.uploader.image
                    ? recipe.uploader.image
                    : recipe.uploader.defaultImage
                }
                alt={`Photo of ${recipe.uploader.firstName}`}
                height={60}
                width={60}
                className="size-8 rounded-full"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                by {recipe.uploader.firstName} {recipe.uploader.lastName}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-10 lg:space-y-12">
          {recipe.description && (
            <p className="text-pretty leading-6 text-gray-600">
              {recipe.description}
            </p>
          )}

          <div className="space-y-4 md:hidden">
            <div className="rounded-md border border-emerald-700 p-1">
              <figure className="h-60 overflow-hidden rounded-md lg:h-72">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  height={200}
                  width={500}
                  quality={100}
                  className="size-full object-cover"
                />
              </figure>
            </div>
            <div className="rounded-md border border-emerald-700 bg-emerald-50 px-6 py-2">
              <dl className="divide-y divide-gray-200 *:py-3">
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">
                    Servings
                  </dt>
                  <dd className="text-sm font-medium text-emerald-900">
                    {recipe.servings > 1
                      ? `${recipe.servings} servings`
                      : `${recipe.servings} serving`}
                  </dd>
                </div>

                {recipe.prepTimeHours > 0 ||
                  (recipe.prepTimeMins > 0 && (
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium text-gray-500">
                        Prep time
                      </dt>
                      <dd className="text-sm font-medium text-emerald-900">
                        {recipe.prepTimeHours > 0 &&
                          `${recipe.prepTimeHours} hr`}{' '}
                        {recipe.prepTimeMins > 0 &&
                          `${recipe.prepTimeMins} min`}
                      </dd>
                    </div>
                  ))}

                {recipe.cookingTimeHours > 0 ||
                  (recipe.cookingTimeMins > 0 && (
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium text-gray-500">
                        Cooking time
                      </dt>
                      <dd className="text-sm font-medium text-emerald-900">
                        {recipe.cookingTimeHours > 0 &&
                          `${recipe.cookingTimeHours} hr`}{' '}
                        {recipe.cookingTimeMins > 0 &&
                          `${recipe.cookingTimeMins} min`}
                      </dd>
                    </div>
                  ))}

                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">
                    Uploaded on
                  </dt>
                  <dd className="text-sm font-medium text-emerald-900">
                    {formatDate(recipe.uploadedOn)}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">
                    Updated on
                  </dt>
                  <dd className="text-sm font-medium text-emerald-900">
                    {formatDate(recipe.uploadedOn)}
                  </dd>
                </div>

                {recipe.source && (
                  <>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium text-gray-500">
                        Source
                      </dt>
                      <dd className="text-sm font-medium text-emerald-900">
                        {recipe.source.name}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-medium text-gray-500">
                        Source URL
                      </dt>
                      <dd>
                        <Link
                          href={recipe.source.url}
                          target="_blank"
                          className="inline-flex items-center gap-x-2 text-sm font-medium text-emerald-900 underline underline-offset-2">
                          Visit source
                          <ArrowTopRightOnSquareIcon
                            className="size-4"
                            aria-hidden="true"
                          />
                        </Link>
                      </dd>
                    </div>
                  </>
                )}
              </dl>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-emerald-700">Ingredients</h3>
            <ul className="list-disc space-y-4 pl-5 text-gray-700 marker:text-gray-400">
              {recipe.ingredients.map(({ id, ingredient }) => (
                <li key={id}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-emerald-700">Instructions</h3>
            <ul className="list-none space-y-5 text-gray-700 marker:text-gray-400">
              {recipe.instructions.map(({ step, instruction }) => (
                <li key={step} className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900">
                    Step {step}
                  </p>
                  <p className="text-gray-700">{instruction}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="hidden flex-none md:block md:w-full md:max-w-80 lg:max-w-96">
        <div className="rounded-md border border-emerald-700 p-2">
          <figure className="h-60 overflow-hidden rounded-md lg:h-72">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              height={200}
              width={500}
              quality={100}
              className="size-full object-cover"
            />
          </figure>
        </div>
        <div className="mt-8 rounded-md border border-emerald-700 bg-emerald-50 px-6 py-2">
          <dl className="divide-y divide-gray-200 *:py-3">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500">Servings</dt>
              <dd className="text-sm font-medium text-emerald-900">
                {recipe.servings > 1
                  ? `${recipe.servings} servings`
                  : `${recipe.servings} serving`}
              </dd>
            </div>

            {recipe.prepTimeHours > 0 ||
              (recipe.prepTimeMins > 0 && (
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">
                    Prep time
                  </dt>
                  <dd className="text-sm font-medium text-emerald-900">
                    {recipe.prepTimeHours > 0 && `${recipe.prepTimeHours} hr`}{' '}
                    {recipe.prepTimeMins > 0 && `${recipe.prepTimeMins} min`}
                  </dd>
                </div>
              ))}

            {recipe.cookingTimeHours > 0 ||
              (recipe.cookingTimeMins > 0 && (
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">
                    Cooking time
                  </dt>
                  <dd className="text-sm font-medium text-emerald-900">
                    {recipe.cookingTimeHours > 0 &&
                      `${recipe.cookingTimeHours} hr`}{' '}
                    {recipe.cookingTimeMins > 0 &&
                      `${recipe.cookingTimeMins} min`}
                  </dd>
                </div>
              ))}

            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500">Uploaded on</dt>
              <dd className="text-sm font-medium text-emerald-900">
                {formatDate(recipe.uploadedOn)}
              </dd>
            </div>

            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500">Updated on</dt>
              <dd className="text-sm font-medium text-emerald-900">
                {formatDate(recipe.uploadedOn)}
              </dd>
            </div>

            {recipe.source && (
              <>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Source</dt>
                  <dd className="text-sm font-medium text-emerald-900">
                    {recipe.source.name}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">
                    Source URL
                  </dt>
                  <dd>
                    <Link
                      href={recipe.source.url}
                      target="_blank"
                      className="inline-flex items-center gap-x-2 text-sm font-medium text-emerald-900 underline underline-offset-2">
                      Visit source
                      <ArrowTopRightOnSquareIcon
                        className="size-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
