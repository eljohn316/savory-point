'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { toBase64 } from '@/lib/utils';
import { cloudinary } from '@/lib/cloudinary';
import { db } from '@/lib/db';

export async function updateImageAction(
  recipeId: string,
  prevState: any,
  formData: FormData
) {
  const base64 = await toBase64(formData.get('image') as File);
  const result = await cloudinary.uploader.upload(base64, {
    public_id: recipeId,
    resource_type: 'auto',
    folder: 'savory-point'
  });

  console.log(result.public_id);

  const recipe = await db.recipe.update({
    where: {
      id: recipeId
    },
    data: {
      imageUrl: result.secure_url
    }
  });

  revalidatePath(`/my-recipes/${recipe.id}`);
  cookies().set('toast-message', 'Recipe image successfully updated');

  return {
    success: true,
    timestamp: Date.now()
  };
}

export async function deleteRecipeAction(recipeId: string, prevState: any) {
  try {
    await db.recipe.delete({
      where: {
        id: recipeId
      }
    });
  } catch (error) {
    return {
      messsage: 'Could not delete recipe something went wrong'
    };
  }

  cookies().set('toast-message', 'Recipe successfully deleted');
  revalidatePath('/my-recipes');
  redirect('/my-recipes');
}
