import { updateRecipeServerSchema } from '@/features/my-recipes/schema/update-recipe';

export const updateRecipeImageSchema = updateRecipeServerSchema.pick({
  image: true,
});
