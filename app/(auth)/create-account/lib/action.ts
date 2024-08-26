'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import { db } from '@/lib/db';
import { lucia } from '@/lib/lucia';
import { generateAvatar } from '@/lib/utils';
import { schema } from '@/app/(auth)/create-account/lib/schema';

export type PrevState = {
  errors: {
    firstName?: string[] | undefined;
    lastName?: string[] | undefined;
    email?: string[] | undefined;
    password?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  };
};

export async function createAccountAction(
  prevState: PrevState,
  formData: FormData
): Promise<PrevState> {
  const fields = Object.fromEntries(formData);
  const validatedFields = schema.safeParse(fields);

  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };

  const data = validatedFields.data;

  const emailTaken = await db.user.findUnique({
    where: { email: data.email }
  });

  if (emailTaken)
    return {
      errors: { email: ['Email already taken'] }
    };

  const passwordHash = await hash(data.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });

  const userId = generateIdFromEntropySize(10);

  await db.user.create({
    data: {
      id: userId,
      image: generateAvatar(data.firstName),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: passwordHash
    }
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  cookies().set('toast-message', `Welcome to Savory Point! ${data.firstName}`);

  redirect('/');
}
