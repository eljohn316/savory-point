'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import {
  ActionState,
  actionStateSuccess,
  fromErrorToActionState,
} from '@/components/form/utils/action-state-utils';
import { updateEmailSchema } from '@/features/settings/schema/update-email';

export async function updateEmail(_actionState: ActionState, formData: FormData) {
  try {
    const { email } = updateEmailSchema.parse({
      email: formData.get('email'),
    });

    await auth.api.changeEmail({ body: { newEmail: email }, headers: await headers() });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath('/settings');
  return actionStateSuccess('Email successfully updated');
}
