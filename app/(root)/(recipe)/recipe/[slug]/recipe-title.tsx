'use client';

import * as React from 'react';

interface RecipeTitleProps {
  title: string;
}

export function RecipeTitle({ title }: RecipeTitleProps) {
  React.useEffect(() => {
    document.title = `${title} | Savory Point`;
  }, [title]);

  return (
    <h1 className="font-serif text-3xl font-bold text-gray-900">{title}</h1>
  );
}
