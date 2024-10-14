import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

import { UpdateDetailsForm } from './update-details-form';
import { UpdateIngredientsForm } from './update-ingredients-form';
import { UpdateInstructionsForm } from './update-instructions-form';
import { UpdateImageForm } from './update-image-form';

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  const updateId = searchParams.id;

  if (updateId === 'details') {
    const recipe = await db.recipe.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        description: true,
        prepTimeHours: true,
        prepTimeMins: true,
        cookingTimeHours: true,
        cookingTimeMins: true,
        servings: true
      }
    });

    if (!recipe) notFound();

    return <UpdateDetailsForm recipe={recipe} />;
  }

  if (updateId === 'ingredients') {
    const recipe = await db.recipe.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        ingredients: {
          orderBy: { id: 'asc' },
          select: {
            id: true,
            ingredient: true,
            recipeId: true
          }
        }
      }
    });

    if (!recipe) notFound();

    return <UpdateIngredientsForm recipe={recipe} />;
  }

  if (updateId === 'instructions') {
    const recipe = await db.recipe.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        instructions: {
          orderBy: { step: 'asc' },
          select: {
            id: true,
            step: true,
            instruction: true
          }
        }
      }
    });

    if (!recipe) notFound();

    return <UpdateInstructionsForm recipe={recipe} />;
  }

  if (updateId === 'image') {
    const recipe = await db.recipe.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        imageUrl: true
      }
    });

    if (!recipe) notFound();

    return <UpdateImageForm recipe={recipe} />;
  }
}
