/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { ActionResponse } from '@/lib/types';
import { db } from '@/lib/db';
import { validateRequest } from '@/lib/auth';
import { profileSchema, userImageServerSchema } from '@/lib/schema/profile';
import { upload } from '../cloudinary';
import { convertFiletoBase64 } from '../utils';

type UpdateUserProfileInput = z.infer<typeof profileSchema>;

export async function updateUserProfile(
  _: any,
  formData: FormData
): Promise<ActionResponse<UpdateUserProfileInput>> {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  const { success, data, error } = profileSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    const err = error.flatten();

    return {
      success: false,
      errors: {
        firstName: err.fieldErrors.firstName?.at(0),
        lastName: err.fieldErrors.lastName?.at(0),
        email: err.fieldErrors.email?.at(0)
      }
    };
  }

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      }
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong. Could not update user profile'
    };
  }

  revalidatePath('/profile');

  return {
    success: true,
    message: 'User profile updated successfully'
  };
}

type UpdateUserImageInput = z.infer<typeof userImageServerSchema>;

export async function updateUserImage(
  _: any,
  formData: FormData
): Promise<ActionResponse<UpdateUserImageInput>> {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  const { success, data, error } = userImageServerSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    const err = error.flatten();

    return {
      success: false,
      errors: {
        image: err.fieldErrors.image?.at(0)
      }
    };
  }

  try {
    const imageBase64URI = await convertFiletoBase64(data.image);
    const imageUrl = await upload(imageBase64URI);

    await db.user.update({
      where: { id: user.id },
      data: {
        image: imageUrl
      }
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong! Could not upload image.'
    };
  }

  revalidatePath('/profile');

  return {
    success: true,
    message: 'Profile photo successfully updated'
  };
}

export async function removeUserImage(): Promise<{
  success?: boolean;
  message?: string;
}> {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        image: ''
      }
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong! Could not remove image.'
    };
  }

  revalidatePath('/profile');

  return {
    success: true,
    message: 'Profile photo successfully removed'
  };
}
