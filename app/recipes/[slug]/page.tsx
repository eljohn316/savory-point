import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  BookmarkIcon,
  HeartIcon,
  ImageIcon,
  MessageCircleIcon,
} from 'lucide-react';

import { Heading } from '@/features/recipe/components/heading';
import { Uploader } from '@/features/recipe/components/uploader';
import { List, ListItem } from '@/features/recipe/components/list';
import { getRecipeBySlug } from '@/features/recipe/queries/get-recipe-by-slug';
import type {
  Ingredient,
  Instruction,
  Nutrition,
} from '@/features/recipe/types';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) notFound();

  return (
    <>
      <div className="space-y-4">
        <Heading>{recipe.name}</Heading>
        <Uploader uploader={recipe.uploader} />
      </div>
      <div className="mt-6 space-y-12">
        <div className="flex items-center gap-x-5 border-y border-gray-200 py-4">
          <button className="group inline-flex cursor-pointer items-center gap-x-2">
            <MessageCircleIcon className="size-5 text-gray-400 group-hover:text-gray-500" />
            <p className="text-sm text-gray-500 group-hover:text-gray-600">
              41 comments
            </p>
          </button>
          <button className="ml-auto cursor-pointer text-gray-400 hover:text-gray-500">
            <HeartIcon className="size-5" />
            <span className="sr-only">Like</span>
          </button>
          <button className="cursor-pointer text-gray-400 hover:text-gray-500">
            <BookmarkIcon className="size-5" />
            <span className="sr-only">Save</span>
          </button>
        </div>
        <div className="relative h-80">
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              sizes="80vw"
              className="rounded-md object-cover"
              quality={100}
            />
          ) : (
            <div className="flex h-full items-center justify-center rounded-md bg-gray-200">
              <ImageIcon className="size-8 text-gray-500" />
            </div>
          )}
        </div>
        <p className="text-gray-700">{recipe.summary}</p>
        <div className="rounded-xl bg-green-50 p-6">
          <List as="ul" className="marker:text-green-800">
            <ListItem>
              <span className="mr-1.5 font-semibold">Servings:</span>
              {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}
            </ListItem>
            <ListItem>
              <span className="mr-1.5 font-semibold">Preparation:</span>
              {recipe.cooking!.preparation}{' '}
              {recipe.cooking!.preparation === 1 ? 'minute' : 'minutes'}
            </ListItem>
            <ListItem>
              <span className="mr-1.5 font-semibold">Cooking:</span>
              {recipe.cooking!.cooking}{' '}
              {recipe.cooking!.cooking === 1 ? 'minute' : 'minutes'}
            </ListItem>
            <ListItem>
              <span className="mr-1.5 font-semibold">Total:</span>
              Approximately {recipe.cooking!.total}{' '}
              {recipe.cooking!.total === 1 ? 'minute' : 'minutes'}
            </ListItem>
          </List>
        </div>
        <div className="space-y-6">
          <Heading className="text-[28px] text-emerald-800">
            Ingredients
          </Heading>
          <List as="ul" className="marker:text-green-800">
            {(recipe.ingredients as Ingredient[]).map(({ ingredient }) => {
              const id = crypto.randomUUID();
              return <ListItem key={id}>{ingredient}</ListItem>;
            })}
          </List>
        </div>
        <div className="space-y-6">
          <Heading className="text-[28px] text-emerald-800">
            Instructions
          </Heading>
          <List as="ol" className="marker:text-green-800">
            {(recipe.instructions as Instruction[]).map(
              ({ step, instruction }) => (
                <ListItem key={step} className="text-gray-700">
                  {instruction}
                </ListItem>
              ),
            )}
          </List>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Heading className="text-[28px] text-emerald-800">
              Nutrition
            </Heading>
            <p className="text-sm font-light text-gray-500">
              The table below shows nutritional values per serving without the
              additional fillings.
            </p>
          </div>
          <List
            as="ul"
            className="list-none space-y-0 divide-y divide-gray-200">
            {(recipe.nutrition as Nutrition[]).map(({ name, value }) => {
              const id = crypto.randomUUID();
              return (
                <ListItem
                  key={id}
                  className="flex items-center gap-x-4 px-8 py-3 first:pt-0 last:pb-0">
                  <p className="flex-1">{name}</p>
                  <p className="flex-1 font-semibold text-green-700">{value}</p>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </>
  );
}
