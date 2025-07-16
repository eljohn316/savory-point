import type { Metadata } from 'next';
import { RecipeForm } from '@/features/recipe/components/recipe-form';

export const metadata: Metadata = {
  title: 'Upload recipe',
};

export default function Page() {
  return <RecipeForm />;
}
