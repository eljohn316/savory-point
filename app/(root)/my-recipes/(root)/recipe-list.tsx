import Link from 'next/link';
import Image from 'next/image';
import { Prisma } from '@prisma/client';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import {
  Dropdown,
  DropdownItem,
  DropdownItems,
  DropdownTrigger
} from '@/components/ui/dropdown';
import { formatDate } from '@/lib/utils';

type Recipe = Prisma.RecipeGetPayload<{
  select: {
    id: true;
    imageUrl: true;
    title: true;
    uploadedOn: true;
  };
}>;

function RecipeListItem({ recipe }: { recipe: Recipe }) {
  return (
    <div className="py-5 first:pt-0 last:pb-0 flex items-center gap-x-4">
      <div className="shrink-0">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={`${recipe.title}`}
            height={100}
            width={100}
            className="size-12 object-cover sm:size-14 rounded-md"
          />
        ) : (
          <div className="size-12 bg-gray-200 rounded-md sm:size-14" />
        )}
      </div>
      <div className="flex-1">
        <div className="text-base text-gray-900 font-semibold">
          {recipe.title}
        </div>
        <div className="text-sm text-gray-500">
          uploaded on{' '}
          <span className="text-gray-900">{formatDate(recipe.uploadedOn)}</span>
        </div>
      </div>
      <div className="shrink-0">
        <Dropdown as="div" className="relative">
          <DropdownTrigger className="-m-2 p-2 inline-flex items-center rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="size-5" aria-hidden="true" />
          </DropdownTrigger>
          <DropdownItems className="w-44 divide-y divide-gray-100">
            <div className="py-1">
              <DropdownItem>
                <Link
                  href={`/my-recipes/${recipe.id}`}
                  className="block px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                  View
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link
                  href={`/my-recipes/${recipe.id}/update`}
                  className="block px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                  Update
                </Link>
              </DropdownItem>
            </div>
            <div className="py-1">
              <DropdownItem>
                <Link
                  href="#"
                  className="block px-4 py-2 text-left text-sm text-red-700 data-[focus]:bg-red-100 data-[focus]:text-red-900">
                  Delete
                </Link>
              </DropdownItem>
            </div>
          </DropdownItems>
        </Dropdown>
      </div>
    </div>
  );
}

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0)
    return (
      <div className="text-center">
        <p className="text-base font-semibold text-gray-700">
          You haven&apos;t uploaded any recipes yet
        </p>
      </div>
    );

  return (
    <div className="divide-y divide-gray-200">
      {recipes.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
