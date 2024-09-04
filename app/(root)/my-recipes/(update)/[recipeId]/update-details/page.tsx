import { db } from '@/lib/db';
import { UpdateDetailsForm } from './update-details-form';
import { notFound } from 'next/navigation';

type PageProps = {
  params: { recipeId: string };
};

export default async function Page({ params }: PageProps) {
  const recipe = await db.recipe.findUnique({
    where: { id: params.recipeId },
    select: {
      id: true,
      title: true,
      description: true,
      prepTime: true,
      cookingTime: true,
      servings: true
    }
  });

  if (!recipe) notFound();

  return <UpdateDetailsForm recipe={recipe} />;
}
