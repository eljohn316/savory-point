import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { RecipeForm } from '@/features/recipe/components/recipe-form';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Upload recipe',
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/sign-in');
  }

  return <RecipeForm />;
}
