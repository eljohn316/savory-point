import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth';
import { UploadRecipeForm } from '@/app/upload-recipe/upload-recipe-form';

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) return redirect('/sign-in');

  return <UploadRecipeForm />;
}
