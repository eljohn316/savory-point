import { createRecipe } from './lib/action';
import { CreateRecipeForm } from './components/create-recipe-form';

export default function Page() {
  return <CreateRecipeForm action={createRecipe} />;
}
