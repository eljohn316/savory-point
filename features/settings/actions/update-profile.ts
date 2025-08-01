'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { destroy, upload } from '@/lib/cloudinary';
import {
  ActionState,
  actionStateSuccess,
  fromErrorToActionState,
} from '@/components/form/utils/action-state-utils';
import { updateProfileSchema } from '@/features/settings/schema/update-profile';

export async function updateProfile(_actionState: ActionState, formData: FormData) {
  try {
    const { firstName, lastName, bio } = updateProfileSchema.parse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      bio: formData.get('bio'),
    });

    await auth.api.updateUser({
      body: {
        firstName,
        lastName,
        bio,
        name: `${firstName} ${lastName}`,
      },
      headers: await headers(),
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath('/settings');
  return actionStateSuccess('Profile successfully updated');
}

export async function updateProfilePhoto(_actionState: ActionState, formData: FormData) {
  try {
    const photo = formData.get('photo') as string;
    const currentPublicId = formData.get('publicId');
    const publicId = `img-${Date.now()}`;

    if (currentPublicId) {
      await Promise.all([
        upload(photo, {
          public_id: publicId,
          upload_preset: 'savory-point-user-preset',
        }),
        destroy(currentPublicId as string),
        auth.api.updateUser({ body: { image: publicId }, headers: await headers() }),
      ]);
    } else {
      await Promise.all([
        upload(photo, {
          public_id: publicId,
          upload_preset: 'savory-point-user-preset',
        }),
        auth.api.updateUser({ body: { image: publicId }, headers: await headers() }),
      ]);
    }
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath('/settings');
  return actionStateSuccess('Profile photo successfully updated');
}

export async function removeProfilePhoto(_actionState: ActionState, formData: FormData) {
  try {
    const photo = formData.get('image');
    if (photo) {
      await Promise.all([
        destroy(photo as string),
        auth.api.updateUser({
          // @ts-ignore
          body: { image: null },
          headers: await headers(),
        }),
      ]);
    } else {
      await auth.api.updateUser({
        // @ts-ignore
        body: { image: null },
        headers: await headers(),
      });
    }
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath('/settings');
  return actionStateSuccess('Profile photo successfully removed');
}
