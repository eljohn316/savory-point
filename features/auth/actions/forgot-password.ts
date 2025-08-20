'use server';

import { auth } from '@/lib/auth';
import {
  ActionState,
  actionStateSuccess,
  fromErrorToActionState,
} from '@/components/form/utils/action-state-utils';
import { forgotPasswordSchema } from '@/features/auth/schema/forgot-password';

export async function forgotPassword(_actionState: ActionState, formData: FormData) {
  try {
    const { email } = forgotPasswordSchema.parse({
      email: formData.get('email'),
    });

    await auth.api.requestPasswordReset({
      body: {
        email,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return actionStateSuccess('We sent a password reset instructions to your email');
}
