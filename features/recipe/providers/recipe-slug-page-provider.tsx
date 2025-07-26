'use client';

import * as React from 'react';

type RecipeSlugPageContext = {
  userId?: string;
  recipeId: string;
};

const RecipeSlugPageContext = React.createContext<RecipeSlugPageContext | null>(null);

export function RecipeSlugPageProvider({
  userId,
  recipeId,
  children,
}: RecipeSlugPageContext & { children: React.ReactNode }) {
  return (
    <RecipeSlugPageContext.Provider value={{ userId, recipeId }}>
      {children}
    </RecipeSlugPageContext.Provider>
  );
}

export function useRecipeSlugContext() {
  const context = React.useContext(RecipeSlugPageContext);
  if (!context)
    throw new Error(
      'useRecipeSlugContext must be used within a <RecipeSlugPageProvider /> component.',
    );
  return context;
}
