import { updateRecipeServerSchema } from '@/features/my-recipes/schema/update-recipe';

export const updateRecipeInstructionsSchema = updateRecipeServerSchema.pick({
  instructions: true,
});
