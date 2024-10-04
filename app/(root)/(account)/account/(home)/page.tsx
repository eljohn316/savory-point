import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { CakeIcon } from '@heroicons/react/24/outline';

import { db } from '@/lib/db';
import { validateRequest } from '@/lib/auth';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = { title: 'Account' };

async function getUserRecipes(userId: string) {
  try {
    const recipes = await db.recipe.findMany({
      where: { uploaderId: userId },
      orderBy: { uploadedOn: 'desc' },
      select: {
        id: true,
        imageUrl: true,
        title: true,
        uploadedOn: true
      }
    });

    return recipes;
  } catch (error) {
    throw error;
  }
}

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  const recipes = await getUserRecipes(user.id);

  if (recipes.length === 0) {
    return (
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100">
          <CakeIcon className="size-6 text-emerald-700" aria-hidden="true" />
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-gray-700">
            You haven&apos;t uploaded any recipes yet
          </h3>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Click the &ldquo;Upload recipe&rdquo; button to start sharing your
            recipes to the community now
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

interface RecipeItemProps {
  recipe: Prisma.RecipeGetPayload<{
    select: {
      id: true;
      imageUrl: true;
      title: true;
      uploadedOn: true;
    };
  }>;
}

function RecipeItem({ recipe }: RecipeItemProps) {
  return (
    <Link
      href={`/account/recipe/${recipe.id}`}
      className="group flex py-4 first:pt-0 last:pb-0">
      <div className="flex-none">
        <Image
          src={recipe.imageUrl!}
          alt={recipe.title}
          height={60}
          width={60}
          className="size-12 rounded-md object-cover"
        />
      </div>
      <div className="ml-3">
        <h3 className="font-semibold text-gray-700 group-hover:underline group-hover:underline-offset-2">
          {recipe.title}
        </h3>
        <p className="text-sm">
          <span className="text-gray-500">Uploaded on</span>{' '}
          <span className="text-gray-700">{formatDate(recipe.uploadedOn)}</span>
        </p>
      </div>
    </Link>
  );
}
