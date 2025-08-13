import { updateRecipeServerSchema } from '@/features/my-recipes/schema/update-recipe';

export const updateRecipeIngredientsSchema = updateRecipeServerSchema.pick({
  ingredients: true,
});
