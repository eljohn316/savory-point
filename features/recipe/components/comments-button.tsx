'use client';

import { MessageCircleIcon } from 'lucide-react';

type CommentsButtonProps = {
  comments: number;
};

export function CommentsButton({ comments }: CommentsButtonProps) {
  function handleScrollToComments() {
    const element = document.querySelector('#recipe-comments');
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <button
      className="group inline-flex cursor-pointer items-center gap-x-2"
      onClick={handleScrollToComments}>
      <MessageCircleIcon className="size-5 text-gray-400 group-hover:text-gray-500" />
      <p className="text-sm text-gray-500 group-hover:text-gray-600">{comments}</p>
    </button>
  );
}
