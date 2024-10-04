/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { passwordSchema as updatePasswordSchema } from '@/lib/schema/update-password';
import { passwordSchema } from '@/lib/schema/password';
import { hashPassword, validateRequest, verifyPassword } from '@/lib/auth';
import { ActionResponse } from '@/lib/types';

type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

export async function updatePassword(
  _: any,
  formData: FormData
): Promise<ActionResponse<UpdatePasswordInput>> {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  const { success, data, error } = updatePasswordSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    const err = error.flatten();

    return {
      success: false,
      errors: {
        currentPassword: err.fieldErrors.currentPassword?.at(0),
        newPassword: err.fieldErrors.newPassword?.at(0),
        confirmNewPassword: err.fieldErrors.confirmNewPassword?.at(0)
      }
    };
  }

  const passwordValid = await verifyPassword(
    user.passwordHashed,
    data.currentPassword
  );

  if (!passwordValid)
    return {
      success: false,
      message: 'Incorrect password'
    };

  const newHashedPassword = await hashPassword(data.newPassword);

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        password: newHashedPassword
      }
    });
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Something went wrong! Could not update password'
    };
  }

  revalidatePath('/settings');

  return {
    success: true,
    message: 'Password updated successfully'
  };
}

type DeleteAccountInput = z.infer<typeof passwordSchema>;
export async function deleteAccount(
  _: any,
  formData: FormData
): Promise<ActionResponse<DeleteAccountInput>> {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  const { success, data, error } = passwordSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    const err = error.flatten();

    return {
      success: false,
      errors: {
        password: err.fieldErrors.password?.at(0)
      }
    };
  }

  const passwordValid = await verifyPassword(
    user.passwordHashed,
    data.password
  );

  if (!passwordValid) {
    return {
      success: false,
      message: 'Invalid password'
    };
  }

  try {
    await db.user.delete({
      where: {
        id: user.id
      }
    });
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Something went wrong. Could not delete user account'
    };
  }

  revalidatePath('/');

  return {
    success: true,
    message: 'Account successfully deleted'
  };
}
