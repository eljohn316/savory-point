'use server';

import { auth } from '@/lib/auth';
import {
  ActionState,
  actionStateSuccess,
  fromErrorToActionState,
} from '@/components/form/utils/action-state-utils';
import { resetPasswordSchema } from '@/features/auth/schema/reset-password';

export async function resetPassword(token: string, _actionState: ActionState, formData: FormData) {
  try {
    const { newPassword } = resetPasswordSchema.parse(Object.fromEntries(formData));
    await auth.api.resetPassword({
      body: {
        newPassword,
        token,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
  return actionStateSuccess('Your password has been successfully reset');
}
