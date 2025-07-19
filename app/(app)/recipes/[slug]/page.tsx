import Image from 'next/image';
import type { Metadata } from 'next';
import { BookmarkIcon, HeartIcon, MessageCircleIcon } from 'lucide-react';
import { CloudinaryImage } from '@/components/cloudinary-image';
import { List, ListItem } from '@/features/recipe/components/list';
import { getRecipeBySlug } from '@/features/recipe/queries/get-recipe-by-slug';
import type { Ingredient, Instruction, Nutrition } from '@/features/recipe/types';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  return {
    title: recipe.name,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  return (
    <>
      <div className="space-y-4">
        <h2 className="font-serif text-4xl font-bold text-gray-900">{recipe.name}</h2>
        <div className="flex items-center gap-x-2">
          <Image
            src={recipe.uploader.image ?? recipe.uploader.defaultImage}
            alt={recipe.uploader.name}
            height={40}
            width={40}
            className="size-7 rounded-full"
          />
          <p className="text-sm text-gray-600">{recipe.uploader.name}</p>
        </div>
      </div>
      <div className="mt-6 space-y-12">
        <div className="flex items-center gap-x-5 border-y border-gray-200 py-4">
          <button className="group inline-flex cursor-pointer items-center gap-x-2">
            <MessageCircleIcon className="size-5 text-gray-400 group-hover:text-gray-500" />
            <p className="text-sm text-gray-500 group-hover:text-gray-600">41 comments</p>
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
        {recipe.image ? (
          <CloudinaryImage
            src={recipe.image}
            alt={recipe.name}
            height="600"
            width="960"
            sizes="100vw"
            className="h-80 rounded-md object-cover sm:h-96"
            format="webp"
            quality="auto"
          />
        ) : (
          <div className="h-80 rounded-md bg-gray-200 sm:h-96" />
        )}
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
              {recipe.cooking!.cooking} {recipe.cooking!.cooking === 1 ? 'minute' : 'minutes'}
            </ListItem>
            <ListItem>
              <span className="mr-1.5 font-semibold">Total:</span>
              Approximately {recipe.cooking!.total}{' '}
              {recipe.cooking!.total === 1 ? 'minute' : 'minutes'}
            </ListItem>
          </List>
        </div>
        <div className="space-y-6">
          <h3 className="font-serif text-[28px] font-bold text-emerald-800">Ingredients</h3>
          <List as="ul" className="marker:text-green-800">
            {(recipe.ingredients as Ingredient[]).map(({ ingredient }) => {
              const id = crypto.randomUUID();
              return <ListItem key={id}>{ingredient}</ListItem>;
            })}
          </List>
        </div>
        <div className="space-y-6">
          <h3 className="font-serif text-[28px] font-bold text-emerald-800">Instructions</h3>
          <List as="ol" className="marker:text-green-800">
            {(recipe.instructions as Instruction[]).map(({ step, instruction }) => (
              <ListItem key={step} className="text-gray-700">
                {instruction}
              </ListItem>
            ))}
          </List>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-[28px] font-bold text-emerald-800">Nutrition</h3>
            <p className="text-sm font-light text-gray-500">
              The table below shows nutritional values per serving without the additional fillings.
            </p>
          </div>
          <List as="ul" className="list-none space-y-0 divide-y divide-gray-200">
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
