'use client';

import { useState } from 'react';
import { BookmarkIcon } from 'lucide-react';

type SaveButtonProps = {
  saved: boolean;
};

export function SaveButton({ saved }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(saved);

  return (
    <button className="cursor-pointer text-gray-400 hover:text-gray-500">
      <BookmarkIcon className="size-5" />
      <span className="sr-only">{isSaved ? 'Unsave' : 'Save'}</span>
    </button>
  );
}
