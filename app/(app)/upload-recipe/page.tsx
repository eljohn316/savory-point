import type { Metadata } from 'next';
import { UploadRecipeForm } from '@/features/recipe/components/upload-recipe-form';
import { authRedirect } from '@/features/auth/actions/auth-redirect';
import { getAuthSession } from '@/features/auth/queries/get-auth-session';

export const metadata: Metadata = {
  title: 'Upload recipe',
};

export default async function Page() {
  const session = await getAuthSession();

  if (!session) return await authRedirect('/upload-recipe');

  return <UploadRecipeForm />;
}
