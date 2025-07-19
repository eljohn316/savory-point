import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { UserProvider } from '@/components/user-provider';
import { UploadRecipeForm } from '@/features/recipe/components/upload-recipe-form';

export const metadata: Metadata = {
  title: 'Upload recipe',
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <UserProvider user={session.user}>
      <UploadRecipeForm />
    </UserProvider>
  );
}
