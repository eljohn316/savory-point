import * as React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { RecipeImage } from '@/components/recipe-image';
import { formatDate } from '@/lib/helpers';
import { Ingredient, Instruction, Nutrition } from '@/features/recipe/types';
import { getUploadedRecipe } from '@/features/my-recipes/queries/get-uploaded-recipe';
import { DetailItem } from '@/features/my-recipes/components/detail-item';
import { UploadRecipeHeader } from '@/features/my-recipes/components/uploaded-recipe-header';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getUploadedRecipe(id);

  return {
    title: recipe ? recipe.name : 'Recipe not found',
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const recipe = await getUploadedRecipe(id);

  if (!recipe) notFound();

  return (
    <>
      <UploadRecipeHeader recipeId={recipe.id}>{recipe.name}</UploadRecipeHeader>
      <DetailItem
        label="Photo"
        className="mt-8"
        content={
          <RecipeImage
            src={recipe.imagePublicId}
            alt={recipe.name}
            height="600"
            width="960"
            sizes="100vw"
            className="h-80 rounded-md bg-gray-200 object-cover sm:h-96"
          />
        }
      />
      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 min-[25rem]:grid-cols-3 lg:mt-16">
        <DetailItem
          label="Summary"
          className="col-span-2 min-[25rem]:col-span-3"
          content={<div className="leading-relaxed text-gray-900">{recipe.summary}</div>}
        />
        <DetailItem
          label="Servings"
          className="col-span-1"
          content={
            <div className="text-gray-900">
              {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}
            </div>
          }
        />
        <DetailItem
          label="Preparation"
          className="col-span-1"
          content={
            <div className="text-gray-900">
              {recipe.preparation} {recipe.preparation === 1 ? 'minute' : 'minutes'}
            </div>
          }
        />
        <DetailItem
          label="Cooking"
          className="col-span-1"
          content={
            <div className="text-gray-900">
              {recipe.cooking} {recipe.cooking === 1 ? 'minute' : 'minutes'}
            </div>
          }
        />
        <DetailItem
          label="Uploaded on"
          className="col-span-1"
          content={<div className="text-gray-900">{formatDate(recipe.uploadedAt)}</div>}
        />
        <DetailItem
          label="Last updated"
          className="col-span-1"
          content={<div className="text-gray-900">{formatDate(recipe.updatedAt)}</div>}
        />
      </div>
      <DetailItem
        label="Ingredients"
        className="mt-14 space-y-5 lg:mt-16"
        content={
          <ul className="divide-y divide-gray-200">
            {(recipe.ingredients as Ingredient[]).map(({ ingredient }) => {
              const id = crypto.randomUUID();
              return (
                <li key={id} className="py-2 text-gray-900 first:pt-0 last:pb-0">
                  {ingredient}
                </li>
              );
            })}
          </ul>
        }
      />
      <DetailItem
        label="Instructions"
        className="mt-14 space-y-5 lg:mt-16"
        content={
          <ul className="list-inside list-decimal divide-y divide-gray-200">
            {(recipe.instructions as Instruction[]).map(({ instruction }) => {
              const id = crypto.randomUUID();
              return (
                <li key={id} className="py-2 text-gray-900 first:pt-0 last:pb-0">
                  {instruction}
                </li>
              );
            })}
          </ul>
        }
      />
      <DetailItem
        label="Nutrition"
        className="mt-14 space-y-5 lg:mt-16"
        content={
          <ul className="list-inside list-decimal divide-y divide-gray-200">
            {(recipe.nutrition as Nutrition[]).map(({ name, value }) => {
              const id = crypto.randomUUID();
              return (
                <li key={id} className="flex py-2 first:pt-0 last:pb-0">
                  <div className="flex-1 text-gray-700">{name}</div>
                  <div className="flex-1 text-gray-900">{value}</div>
                </li>
              );
            })}
          </ul>
        }
      />
    </>
  );
}
