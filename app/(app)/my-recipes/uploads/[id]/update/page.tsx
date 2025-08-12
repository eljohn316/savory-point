import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CloudinaryImage } from '@/components/cloudinary-image';
import { getUploadedRecipe } from '@/features/my-recipes/queries/get-uploaded-recipe';
import { UpdateRecipeDetailsForm } from '@/features/my-recipes/components/update-recipe-details-form';
import { UpdateRecipeIngredientsForm } from '@/features/my-recipes/components/update-recipe-ingredients-form';
import { Ingredient, Instruction } from '@/features/recipe/types';
import { UpdateRecipeInstructionsForm } from '@/features/my-recipes/components/update-recipe-instructions-form';
import { UpdateRecipeImageForm } from '@/features/my-recipes/components/update-recipe-image-form';

export const metadata: Metadata = {
  title: 'Update recipe',
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const recipe = await getUploadedRecipe(id);

  if (!recipe) notFound();

  return (
    <div className="divide-y divide-gray-200 *:py-14 *:first:pt-0 *:last:pb-0">
      <UpdateRecipeDetailsForm recipe={recipe} />
      <UpdateRecipeIngredientsForm ingredients={recipe.ingredients as Ingredient[]} />
      <UpdateRecipeInstructionsForm instructions={recipe.instructions as Instruction[]} />
      <UpdateRecipeImageForm
        currentImage={
          <CloudinaryImage
            src={recipe.imagePublicId}
            alt={recipe.name}
            height="600"
            width="960"
            sizes="100vw"
            className="h-full rounded-md bg-gray-200"
          />
        }
      />
    </div>
  );
}
