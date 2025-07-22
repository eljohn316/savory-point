import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { BookmarkIcon, HeartIcon, MessageCircleIcon, ArrowLeftIcon } from 'lucide-react';
import { formatDate } from '@/lib/helpers';
import { CloudinaryImage } from '@/components/cloudinary-image';
import {
  Placeholder,
  PlaceholderTitle,
  PlaceholderDescription,
  PlaceholderActions,
} from '@/components/ui/placeholder';
import type { Ingredient, Instruction, Nutrition } from '@/features/recipe/types';
import { List, ListItem } from '@/features/recipe/components/list';
import { getRecipeBySlug } from '@/features/recipe/queries/get-recipe-by-slug';
import { CommentListItems } from '@/features/comment/components/comment-list-items';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  return {
    title: recipe ? recipe.name : 'Recipe not found',
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  console.log(recipe);

  if (!recipe)
    return (
      <Placeholder className="py-6">
        <PlaceholderTitle>Recipe not found</PlaceholderTitle>
        <PlaceholderDescription>
          Looks like we could not find the recipe you are looking for.
        </PlaceholderDescription>
        <PlaceholderActions>
          <Link
            href="/"
            className="inline-flex items-center gap-x-2 rounded-md border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-700 hover:text-emerald-50 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none">
            <ArrowLeftIcon className="size-4" />
            Back to Home
          </Link>
        </PlaceholderActions>
      </Placeholder>
    );

  return (
    <>
      <div className="space-y-5">
        <h2 className="font-serif text-4xl font-bold text-gray-900">{recipe.name}</h2>
        <div className="flex items-center gap-x-4">
          {recipe.uploader.image ? (
            <CloudinaryImage
              src={recipe.uploader.image}
              alt={recipe.uploader.name}
              height={40}
              width={40}
              className="size-8 flex-none rounded-full"
            />
          ) : (
            <Image
              src={recipe.uploader.defaultImage}
              alt={recipe.uploader.name}
              height={40}
              width={40}
              className="size-8 flex-none rounded-full"
            />
          )}
          <div className="flex-auto space-y-1">
            <p className="text-sm leading-none text-gray-900">by {recipe.uploader.name}</p>
            <p className="text-sm leading-none text-gray-500">
              uploaded on {formatDate(recipe.uploadedAt)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 space-y-12">
        <div className="flex items-center gap-x-5 border-y border-gray-200 py-4">
          <button className="group inline-flex cursor-pointer items-center gap-x-2">
            <MessageCircleIcon className="size-5 text-gray-400 group-hover:text-gray-500" />
            <p className="text-sm text-gray-500 group-hover:text-gray-600">0</p>
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
        <CloudinaryImage
          src={recipe.imagePublicId}
          alt={recipe.name}
          height="600"
          width="960"
          sizes="100vw"
          className="h-80 rounded-md object-cover sm:h-96"
          format="webp"
          quality="auto"
        />
        <p className="text-gray-700">{recipe.summary}</p>
        <div className="rounded-xl bg-green-50 p-6">
          <List as="ul" className="marker:text-green-800">
            <ListItem>
              <span className="mr-1.5 font-semibold">Servings:</span>
              {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}
            </ListItem>
            <ListItem>
              <span className="mr-1.5 font-semibold">Preparation:</span>
              {recipe.preparation} {recipe.preparation === 1 ? 'minute' : 'minutes'}
            </ListItem>
            <ListItem>
              <span className="mr-1.5 font-semibold">Cooking:</span>
              {recipe.cooking} {recipe.cooking === 1 ? 'minute' : 'minutes'}
            </ListItem>
            <ListItem>
              <span className="mr-1.5 font-semibold">Total:</span>
              Approximately {recipe.total} {recipe.total === 1 ? 'minute' : 'minutes'}
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
                <ListItem key={id} className="flex items-center gap-x-4 py-3 first:pt-0 last:pb-0">
                  <p className="flex-1">{name}</p>
                  <p className="flex-1 font-semibold text-green-700">{value}</p>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
      <CommentListItems />
    </>
  );
}
