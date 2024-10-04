import type { Metadata } from 'next';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ProfileForm } from './profile-form';

export const metadata: Metadata = { title: 'Profile' };

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) redirect('/sign-in');

  return <ProfileForm user={user} />;
}
