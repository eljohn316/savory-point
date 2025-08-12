'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { createSlug } from '@/lib/utils';
import { setToastCookie } from '@/lib/toast-cookies';
import { upload } from '@/lib/cloudinary';
import { ActionState, fromErrorToActionState } from '@/components/form/utils/action-state-utils';
import { uploadRecipeServerSchema } from '@/features/recipe/schema/upload-recipe';

export async function uploadRecipe(
  _actionState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const {
      name,
      summary,
      servings,
      preparation,
      cooking,
      total,
      ingredients,
      instructions,
      nutrition,
      image,
      uploaderId,
    } = await uploadRecipeServerSchema.parseAsync({
      name: formData.get('name'),
      summary: formData.get('summary'),
      servings: formData.get('servings'),
      preparation: formData.get('cooking'),
      cooking: formData.get('cooking'),
      total: formData.get('total'),
      ingredients: JSON.parse(formData.get('ingredients') as string),
      instructions: JSON.parse(formData.get('instructions') as string),
      nutrition: JSON.parse(formData.get('nutrition') as string),
      image: formData.get('image'),
      uploaderId: formData.get('uploaderId'),
    });

    const publicId = `recipe-img-${Date.now()}`;

    await Promise.all([
      upload(image, {
        public_id: publicId,
        upload_preset: 'savory-point-recipe-preset',
      }),
      prisma.recipe.create({
        data: {
          name,
          summary,
          servings,
          ingredients,
          instructions,
          nutrition,
          cooking,
          preparation,
          total,
          slug: createSlug(name),
          uploaderId,
          imagePublicId: publicId,
        },
      }),
    ]);
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setToastCookie({ type: 'success', message: 'Recipe successfully uploaded' });
  revalidatePath('/');
  redirect('/');
}
