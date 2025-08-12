'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { upload } from '@/lib/cloudinary';
import {
  ActionState,
  actionStateSuccess,
  fromErrorToActionState,
} from '@/components/form/utils/action-state-utils';
import { updateRecipeServerSchema } from '@/features/my-recipes/schema/update-recipe';
import { getRecipeByName } from '@/features/recipe/queries/get-recipe-by-name';

const updateRecipeDetailsSchema = updateRecipeServerSchema
  .pick({
    name: true,
    summary: true,
    servings: true,
    cooking: true,
    preparation: true,
    total: true,
  })
  .refine(async (val) => !(await getRecipeByName(val.name)), {
    message: 'Recipe name already taken',
    path: ['name'],
  });

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
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath('/my-recipes/uploads/[id]', 'page');
  return actionStateSuccess('Recipe successfully updated');
}

const updateRecipeIngredientsSchema = updateRecipeServerSchema.pick({
  ingredients: true,
});

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

const updateRecipeInstructionsSchema = updateRecipeServerSchema.pick({
  instructions: true,
});

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

const updateRecipeImageSchema = updateRecipeServerSchema.pick({
  image: true,
});

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
