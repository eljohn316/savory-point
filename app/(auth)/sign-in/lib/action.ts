'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verify } from '@node-rs/argon2';
import { db } from '@/lib/db';
import { lucia } from '@/lib/lucia';
import { schema } from '@/app/(auth)/sign-in/lib/schema';

export type PrevState = {
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
  message?: string;
};

export async function signInAction(
  prevState: PrevState,
  formData: FormData
): Promise<PrevState> {
  'use server';

  const fields = Object.fromEntries(formData);
  const validateFields = schema.safeParse(fields);

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors
    };
  }

  const { data } = validateFields;

  const user = await db.user.findUnique({ where: { email: data.email } });

  if (!user)
    return {
      message: 'Invalid email or password'
    };

  const passwordValid = await verify(user.password, data.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });

  if (!passwordValid)
    return {
      message: 'Invalid email or password'
    };

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  cookies().set('toast-message', `Welcome back, ${user.firstName}!`);

  redirect('/');
}
