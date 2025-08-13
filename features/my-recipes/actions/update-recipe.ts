'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { upload } from '@/lib/cloudinary';
import { createSlug } from '@/lib/utils';
import {
  ActionState,
  actionStateSuccess,
  fromErrorToActionState,
} from '@/components/form/utils/action-state-utils';
import { updateRecipeDetailsSchema } from '@/features/my-recipes/schema/update-recipe-details';
import { updateRecipeIngredientsSchema } from '@/features/my-recipes/schema/update-recipe-ingredients';
import { updateRecipeInstructionsSchema } from '@/features/my-recipes/schema/update-recipe-instructions';
import { updateRecipeImageSchema } from '@/features/my-recipes/schema/update-recipe-image';

export async function updateRecipeDetails(
  id: string,
  _actionState: ActionState,
  formData: FormData,
) {
  try {
    const { name, summary, preparation, cooking, servings, total } =
      await updateRecipeDetailsSchema.parseAsync(Object.fromEntries(formData));

    await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        name,
        summary,
        preparation,
        cooking,
        servings,
        total,
        slug: createSlug(name),
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath('/my-recipes/uploads/[id]', 'page');
  return actionStateSuccess('Recipe successfully updated');
}

export async function updateRecipeIngredients(
  id: string,
  _actionState: ActionState,
  formData: FormData,
) {
  try {
    const { ingredients } = updateRecipeIngredientsSchema.parse({
      ingredients: JSON.parse(formData.get('ingredients') as string),
    });

    await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        ingredients,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath('/my-recipes/uploads/[id]', 'page');
  return actionStateSuccess('Recipe successfully updated');
}

export async function updateRecipeInstructions(
  id: string,
  _actionState: ActionState,
  formData: FormData,
) {
  try {
    const { instructions } = updateRecipeInstructionsSchema.parse({
      instructions: JSON.parse(formData.get('instructions') as string),
    });

    await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        instructions,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath('/my-recipes/uploads/[id]', 'page');
  return actionStateSuccess('Recipe successfully updated');
}

export async function updateRecipeImage(id: string, _actionState: ActionState, formData: FormData) {
  try {
    const { image } = updateRecipeImageSchema.parse({
      image: formData.get('image'),
    });
    const newPublicId = `recipe-img-${Date.now()}`;

    await Promise.all([
      upload(image, { public_id: newPublicId, upload_preset: 'savory-point-recipe-preset' }),
      prisma.recipe.update({
        where: { id },
        data: {
          imagePublicId: newPublicId,
        },
      }),
    ]);
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath('/my-recipes/uploads/[id]', 'page');
  return actionStateSuccess('Recipe successfully updated');
}
