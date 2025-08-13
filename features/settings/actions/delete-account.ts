'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import { auth } from '@/lib/auth';
import { setToastCookie } from '@/lib/toast-cookies';
import { ActionState, fromErrorToActionState } from '@/components/form/utils/action-state-utils';
import { deleteAccountSchema } from '@/features/settings/schema/delete-account';

export async function deleteAccount(_actionState: ActionState, formData: FormData) {
  try {
    const { password } = deleteAccountSchema.parse({
      password: formData.get('password'),
    });

    await auth.api.deleteUser({
      body: { password },
      headers: await headers(),
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath('/');
  await setToastCookie({ type: 'success', message: 'Account successfully deleted!' });
  redirect('/?account=deleted', RedirectType.replace);
}
