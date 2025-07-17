'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { generateDefaultUserAvatar } from '@/lib/utils';
import { ActionState, fromErrorToActionState } from '@/components/form/utils/action-state-utils';
import { signupSchema as schema } from '@/features/auth/schema/sign-up';
import { getUserbyEmail } from '@/features/auth/queries/get-user-by-email';
import { setCookie } from '@/lib/cookie';

const signupSchema = schema.superRefine(async (val, ctx) => {
  if (await getUserbyEmail(val.email)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Email already taken',
      path: ['email'],
    });
  }
});

export async function signup(_actionState: ActionState, formData: FormData) {
  try {
    const { firstName, lastName, email, password } = await signupSchema.parseAsync({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    await auth.api.signUpEmail({
      body: {
        defaultImage: generateDefaultUserAvatar({ firstName, lastName }),
        email,
        firstName,
        lastName,
        name: firstName + ' ' + lastName,
        password,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setCookie('toast', 'Account successfully created');
  redirect('/');
}
