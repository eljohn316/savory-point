'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { createSlug } from '@/lib/utils';
import { setCookie } from '@/lib/cookie';
import { upload } from '@/lib/cloudinary';
import { ActionState, fromErrorToActionState } from '@/components/form/utils/action-state-utils';
import { uploadRecipeServerSchema } from '@/features/recipe/schema/upload-recipe';

export async function uploadRecipe(
  uploaderId: string,
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
      image,
    } = await uploadRecipeServerSchema.parseAsync({
      name: formData.get('name'),
      summary: formData.get('summary'),
      servings: formData.get('servings'),
      cooking: JSON.parse(formData.get('cooking') as string),
      ingredients: JSON.parse(formData.get('ingredients') as string),
      instructions: JSON.parse(formData.get('instructions') as string),
      nutrition: JSON.parse(formData.get('nutrition') as string),
      image: formData.get('image'),
    });

    const slug = createSlug(name);

    await Promise.all([
      await upload(image, {
        public_id: slug,
        resource_type: 'image',
        folder: 'savory-point',
      }),
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
          image: slug,
          uploaderId,
        },
      }),
    ]);
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setCookie('toast', 'Recipe successfully uploaded');
  revalidatePath('/');
  redirect('/');
}
