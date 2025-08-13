import { getRecipeByName } from '@/features/recipe/queries/get-recipe-by-name';
import { updateRecipeServerSchema } from './update-recipe';

export const updateRecipeDetailsSchema = updateRecipeServerSchema
  .pick({
    name: true,
    summary: true,
    servings: true,
    cooking: true,
    preparation: true,
    total: true,
  })
  .refine(async (val) => !(await getRecipeByName(val.name)), {
    message: 'Recipe name already taken',
    path: ['name'],
  });
