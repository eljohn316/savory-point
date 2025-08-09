import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { UploadRecipeForm } from '@/features/recipe/components/upload-recipe-form';
import { authRedirect } from '@/features/auth/actions/auth-redirect';

export const metadata: Metadata = {
  title: 'Upload recipe',
};

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return await authRedirect('/upload-recipe');

  return <UploadRecipeForm />;
}
