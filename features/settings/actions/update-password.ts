'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import {
  ActionState,
  actionStateSuccess,
  fromErrorToActionState,
} from '@/components/form/utils/action-state-utils';
import { updatePasswordSchema } from '@/features/settings/schema/update-password';

export async function updatePassword(_actionState: ActionState, formData: FormData) {
  try {
    const { currentPassword, newPassword } = updatePasswordSchema.parse({
      currentPassword: formData.get('currentPassword'),
      newPassword: formData.get('newPassword'),
      confirmNewPassword: formData.get('confirmNewPassword'),
    });

    await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
      },
      headers: await headers(),
    });
  } catch (error) {
    console.log(error);
    return fromErrorToActionState(error);
  }

  revalidatePath('/settings');
  return actionStateSuccess('Password successfully updated');
}
