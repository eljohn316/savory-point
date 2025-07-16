'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { createSlug } from '@/lib/utils';
import {
  ActionState,
  fromErrorToActionState,
} from '@/components/form/utils/action-state-utils';
import { recipeFormSchema } from '@/features/recipe/schema';

const isRecipeNameTaken = async (recipeName: string) =>
  !(await prisma.recipe.findUnique({ where: { name: recipeName } }));

const schema = recipeFormSchema.refine(
  async (val) => await isRecipeNameTaken(val.name),
  { message: 'Recipe name already taken', path: ['name'] },
);

export async function uploadRecipe(
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const {
      name,
      summary,
      servings,
      cooking: { cooking, preparation },
      ingredients,
      instructions,
      nutrition,
    } = await schema.parseAsync({
      name: formData.get('name'),
      summary: formData.get('summary'),
      servings: formData.get('servings'),
      cooking: JSON.parse(formData.get('cooking') as string),
      ingredients: JSON.parse(formData.get('ingredients') as string),
      instructions: JSON.parse(formData.get('instructions') as string),
      nutrition: JSON.parse(formData.get('nutrition') as string),
    });
    await prisma.recipe.create({
      data: {
        name,
        summary,
        servings,
        ingredients,
        instructions,
        nutrition,
        slug: createSlug(name),
        cooking: {
          create: {
            cooking,
            preparation,
            total: cooking + preparation,
          },
        },
        // TEMPORARY
        image: '/beef-tacos.jpg',
        uploaderId: 'cmcj5bljs0005iyc47r4fg5om',
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
  revalidatePath('/');
  redirect('/');
}
