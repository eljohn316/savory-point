import { getRecipeBySlug } from '@/features/recipe/queries/get-recipes';
import { BookmarkIcon, HeartIcon, MessageCircleIcon } from 'lucide-react';
import Image from 'next/image';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) return <div>No recipe found</div>;

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-serif text-4xl font-bold text-gray-900">
          {recipe.name}
        </h2>
        <div className="flex items-center gap-x-2">
          <>
            <Image
              src={
                recipe.uploader!.profile!.image ||
                recipe.uploader!.profile!.defaultImage!
              }
              alt={recipe.uploader!.firstName!}
              height={40}
              width={40}
              className="size-7 rounded-full"
            />
            <p className="text-gray-600">{recipe.uploader!.firstName}</p>
          </>
        </div>
      </div>
      <div className="mt-6 space-y-8">
        <div className="flex items-center gap-x-5 border-y border-gray-200 py-4">
          <button className="group inline-flex cursor-pointer items-center gap-x-2">
            <MessageCircleIcon className="size-5 text-gray-400 group-hover:text-gray-500" />
            <p className="text-sm text-gray-600 group-hover:text-gray-700">
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
          {recipe.image && (
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              sizes="80vw"
              className="rounded-md object-cover"
              quality={100}
            />
          )}
        </div>
        <p className="text-gray-700">{recipe.summary}</p>
        <div className="rounded-xl bg-green-50 p-6">
          <p className="text-lg font-semibold text-green-900">
            Preparation time
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-green-800">
            <li>
              <span className="font-semibold text-gray-700">Total:</span>{' '}
              <span className="text-gray-600">
                Approximately {recipe.cooking!.total}{' '}
                {recipe.cooking!.total === 1 ? 'minute' : 'minutes'}
              </span>
            </li>
            <li>
              <span className="font-semibold text-gray-700">Preparation:</span>{' '}
              <span className="text-gray-600">
                {recipe.cooking!.preparation}{' '}
                {recipe.cooking!.preparation === 1 ? 'minute' : 'minutes'}
              </span>
            </li>
            <li>
              <span className="font-semibold text-gray-700">Cooking:</span>{' '}
              <span className="text-gray-600">
                {recipe.cooking!.cooking}{' '}
                {recipe.cooking!.cooking === 1 ? 'minute' : 'minutes'}
              </span>
            </li>
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="font-serif text-[28px] font-semibold text-green-800">
            Ingredients
          </h3>
          <ul className="list-inside list-disc space-y-2">
            {recipe.ingredients.map(({ id, ingredient }) => (
              <li key={id} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="font-serif text-[28px] font-semibold text-green-900">
            Instructions
          </h3>
          <ol className="list-inside list-decimal space-y-2 marker:font-semibold marker:text-green-900">
            {recipe.instructions.map(({ id, instruction }) => (
              <li key={id} className="text-gray-700">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-[28px] font-semibold text-green-900">
              Nutrition
            </h3>
            <p className="text-sm font-light text-gray-500">
              The table below shows nutritional values per serving without the
              additional fillings.
            </p>
          </div>
          <div className="divide-y divide-gray-200">
            {recipe.nutrition.map(({ id, name, value }) => (
              <div
                key={id}
                className="flex items-center gap-x-4 px-8 py-3 first:pt-0 last:pb-0">
                <p className="flex-1 text-gray-700">{name}</p>
                <p className="flex-1 font-semibold text-green-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
