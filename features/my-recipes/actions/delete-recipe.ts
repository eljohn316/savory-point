'use server';

import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { setToastCookie } from '@/lib/toast-cookies';
import { destroy } from '@/lib/cloudinary';

export async function deleteRecipe(id: string) {
  const recipe = await prisma.recipe.delete({
    where: { id },
  });
  await destroy(recipe.imagePublicId);
  revalidatePath('/');
  revalidatePath('/my-recipes/uploads');
  await setToastCookie({ type: 'success', message: 'Recipe successfully deleted!' });
  redirect('/my-recipes/uploads', RedirectType.replace);
}
