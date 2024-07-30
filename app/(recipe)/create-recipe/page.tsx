import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { schema } from './schema';
import { CreateRecipeForm } from './components/create-recipe-form';

type PrevState = {
  success: boolean | null;
  message: string;
  errors?: {
    [key: string]: string;
  };
};

export default function Page() {
  async function createRecipe(prevState: PrevState, formData: FormData) {
    'use server';

    const entries = Object.fromEntries(formData);
    const entryKeys = Object.keys(entries);

    const ingredients = entryKeys
      .filter((data) => data.startsWith('ingredients'))
      .map((ing) => ({
        ingredient: entries[ing]
      }));

    const instructions = entryKeys
      .filter((data) => data.startsWith('instructions'))
      .map((ing) => ({
        instruction: entries[ing]
      }));

    const data = {
      title: entries.title as string,
      about: entries.about as string,
      prepTime: Number(entries.prepTime as string),
      cookingTime: Number(entries.cookingTime as string),
      servings: Number(entries.servings as string),
      ingredients: ingredients as { ingredient: string }[],
      instructions: instructions as { instruction: string }[]
    };

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const errors: { [key: string]: string } = {};

      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });

      return {
        success: false,
        message: 'Invalid data',
        errors
      };
    }

    await db.recipe.create({
      data: {
        title: data.title,
        about: data.about,
        cookingTime: data.cookingTime,
        prepTime: data.prepTime,
        servings: data.servings,
        slug: 'hello-world-new',
        ingredients: {
          createMany: {
            data: data.ingredients
          }
        },
        instructions: {
          createMany: {
            data: data.instructions
          }
        }
      }
    });

    const toast = JSON.stringify({
      variant: 'success',
      message: 'Recipe successfully created'
    });

    cookies().set('toast', toast);
    redirect('/create-recipe/image-upload');
  }

  return (
    <div className="my-12 max-w-3xl mx-auto px-4 lg:px-8">
      <h2 className="text-base font-semibold leading-7 text-emerald-700">
        Create recipe
      </h2>
      <p className="text-sm text-gray-700 leading-6">
        Fill in the fields below to upload to a recipe.
      </p>
      <div className="mt-6 sm:mt-8">
        <CreateRecipeForm action={createRecipe} />
      </div>
    </div>
  );
}
