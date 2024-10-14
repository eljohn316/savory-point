/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { ActionResponse } from '@/lib/types';
import { recipeServerSchema } from '../schema/upload-recipe';
import { createSlug, range } from '../utils';
import { z } from 'zod';
import { upload } from '../cloudinary';

type CreateRecipeInput = z.infer<typeof recipeServerSchema>;

export async function createRecipe(
  _: any,
  formData: FormData
): Promise<ActionResponse<CreateRecipeInput>> {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  const { success, data, error } = recipeServerSchema.safeParse({
    image: formData.get('image') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    prepTimeHours: +(formData.get('prepTimeHours') as string),
    prepTimeMins: +(formData.get('prepTimeMins') as string),
    cookingTimeHours: +(formData.get('cookingTimeHours') as string),
    cookingTimeMins: +(formData.get('cookingTimeMins') as string),
    servings: +(formData.get('servings') as string),
    ingredients: JSON.parse(formData.get('ingredients') as string),
    instructions: JSON.parse(formData.get('instructions') as string)
  });

  if (!success) {
    const err = error.flatten();

    return {
      success: false,
      errors: {
        title: err.fieldErrors.title?.at(0),
        description: err.fieldErrors.description?.at(0),
        prepTimeHours: err.fieldErrors.prepTimeHours?.at(0),
        prepTimeMins: err.fieldErrors.prepTimeMins?.at(0),
        cookingTimeHours: err.fieldErrors.cookingTimeHours?.at(0),
        cookingTimeMins: err.fieldErrors.cookingTimeMins?.at(0),
        servings: err.fieldErrors.servings?.at(0),
        ingredients: err.fieldErrors.ingredients?.at(0),
        instructions: err.fieldErrors.instructions?.at(0),
        image: err.fieldErrors.image?.at(0)
      }
    };
  }

  if (await db.recipe.findUnique({ where: { title: data.title } }))
    return {
      success: false,
      errors: {
        title: 'Recipe title already taken. Use another title'
      }
    };

  try {
    const imageUrl = await upload(data.image, {
      public_id: createSlug(data.title),
      resource_type: 'auto',
      folder: 'savory-point'
    });

    await db.recipe.create({
      data: {
        imageUrl,
        title: data.title,
        description: data.description,
        prepTimeHours: data.prepTimeHours ?? 0,
        prepTimeMins: data.prepTimeMins ?? 0,
        cookingTimeHours: data.cookingTimeHours ?? 0,
        cookingTimeMins: data.cookingTimeMins ?? 0,
        servings: data.servings,
        ingredients: { createMany: { data: data.ingredients } },
        instructions: { createMany: { data: data.instructions } },
        slug: createSlug(data.title),
        uploaderId: user.id
      }
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong. Could not create recipe'
    };
  }

  revalidatePath('/');
  return {
    success: true,
    message: 'Recipe successfully uploaded'
  };
}

type UpdateRecipeDetailsInput = Pick<
  z.infer<typeof recipeServerSchema>,
  | 'title'
  | 'description'
  | 'prepTimeHours'
  | 'prepTimeMins'
  | 'cookingTimeHours'
  | 'cookingTimeMins'
  | 'servings'
>;

export async function updateRecipeDetails(
  recipeId: string,
  _: any,
  formData: FormData
): Promise<ActionResponse<UpdateRecipeDetailsInput>> {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  const schema = recipeServerSchema.pick({
    title: true,
    description: true,
    prepTimeHours: true,
    prepTimeMins: true,
    cookingTimeHours: true,
    cookingTimeMins: true,
    servings: true
  });

  const { success, data, error } = schema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    const err = error.flatten();
    return {
      success: false,
      errors: {
        title: err.fieldErrors.title?.at(0),
        description: err.fieldErrors.description?.at(0),
        prepTimeHours: err.fieldErrors.prepTimeHours?.at(0),
        prepTimeMins: err.fieldErrors.prepTimeMins?.at(0),
        cookingTimeHours: err.fieldErrors.cookingTimeHours?.at(0),
        cookingTimeMins: err.fieldErrors.cookingTimeMins?.at(0),
        servings: err.fieldErrors.servings?.at(0)
      }
    };
  }

  try {
    await db.recipe.update({
      where: { id: recipeId },
      data: {
        title: data.title,
        description: data.description,
        prepTimeHours: data.prepTimeHours,
        prepTimeMins: data.prepTimeMins,
        cookingTimeHours: data.cookingTimeHours,
        cookingTimeMins: data.cookingTimeMins,
        servings: data.servings
      }
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong. Could not update recipe'
    };
  }

  revalidatePath(`recipe/uploads/${recipeId}/update?id=details`);

  return {
    success: true,
    message: 'Recipe successfully updated'
  };
}

export async function deleteRecipe(
  id: string
): Promise<ActionResponse<{ message?: string; success?: boolean }>> {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  try {
    await db.recipe.delete({
      where: { id }
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Some went wrong. Could not delete recipe'
    };
  }

  cookies().set(
    'toast-message',
    JSON.stringify({
      variant: 'success',
      title: 'Recipe successfully deleted'
    })
  );

  revalidatePath('/account');
  redirect('/account');
}

type Ingredient = {
  ingredient: string;
  ingredientId?: number | undefined;
  status?: 'new' | undefined;
};

export async function updateRecipeIngredients(
  recipeId: string,
  _: any,
  formData: FormData
): Promise<ActionResponse<{ success?: boolean; message?: string }>> {
  const ingredients = JSON.parse(
    formData.get('ingredients') as string
  ) as Ingredient[];

  const newIngredients = JSON.parse(
    formData.get('new-ingredients') as string
  ) as Ingredient[];

  const removeIds = JSON.parse(
    formData.get('removed-ingredients') as string
  ) as number[];

  try {
    if (ingredients.length >= 1) {
      const updates = ingredients.map((ing) =>
        db.ingredient.update({
          where: { id: ing.ingredientId! },
          data: { ingredient: ing.ingredient }
        })
      );

      await Promise.all(updates);
    }

    if (newIngredients.length >= 1) {
      const additions = newIngredients.map((ing) =>
        db.ingredient.create({
          data: {
            ingredient: ing.ingredient,
            recipeId
          }
        })
      );

      await Promise.all(additions);
    }

    if (removeIds.length >= 1) {
      const deletions = removeIds.map((id) =>
        db.ingredient.delete({ where: { id } })
      );

      await Promise.all(deletions);
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong. Unable to update recipe ingredients'
    };
  }

  revalidatePath(`/recipe/uploads/${recipeId}/update?id=ingredients`);

  return {
    success: true,
    message: 'Ingredients successfully updated'
  };
}

type Instruction = {
  instruction: string;
  step: number;
  instructionId?: number;
  status?: 'new';
};

export async function updateRecipeInstructions(
  recipeId: string,
  _: any,
  formData: FormData
): Promise<ActionResponse<{ success?: boolean; message?: string }>> {
  const removedIds = JSON.parse(
    formData.get('removed-ids') as string
  ) as number[];

  const instructionLength = JSON.parse(
    formData.get('instruction-length') as string
  ) as number;

  const instructions = range(instructionLength).map((item) =>
    JSON.parse(formData.get(`instruction-${item}`) as string)
  ) as Instruction[];

  const newInstructions = instructions.filter(
    (ins) => ins.status && ins.status === 'new'
  );
  const oldInstructions = instructions.filter((ins) => !ins.status);

  try {
    if (oldInstructions.length >= 1) {
      const updates = oldInstructions.map((ins) =>
        db.instruction.update({
          where: { id: ins.instructionId! },
          data: {
            instruction: ins.instruction,
            step: ins.step
          }
        })
      );

      await Promise.all(updates);
    }

    if (newInstructions.length >= 1) {
      const additions = newInstructions.map((ins) =>
        db.instruction.create({
          data: {
            instruction: ins.instruction,
            step: ins.step,
            recipeId
          }
        })
      );

      await Promise.all(additions);
    }

    if (removedIds.length >= 1) {
      const removeds = removedIds.map((id) =>
        db.instruction.delete({ where: { id } })
      );

      await Promise.all(removeds);
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong. Unable to update recipe instructions'
    };
  }

  revalidatePath(`/recipe/uploads/${recipeId}/update?id=instructions`);

  return {
    success: true,
    message: 'Instructions successfully updated'
  };
}

export async function updateRecipeImage(
  recipeId: string,
  _: any,
  formData: FormData
): Promise<ActionResponse<{ success?: boolean; message?: string }>> {
  const imageUrl = formData.get('image') as string;

  try {
    const newImageUrl = await upload(imageUrl);

    await db.recipe.update({
      where: { id: recipeId },
      data: {
        imageUrl: newImageUrl
      }
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong. Unable to update recipe image'
    };
  }

  revalidatePath(`/recipe/uploads/${recipeId}/update?id=image`);

  return {
    success: true,
    message: 'Recipe image successfully updated'
  };
}
