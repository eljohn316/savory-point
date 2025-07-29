'use client';

import * as React from 'react';
import Image from 'next/image';
import { EllipsisVerticalIcon } from 'lucide-react';
import { formatDateFromNow } from '@/lib/helpers';
import { useSession } from '@/lib/auth-client';
import { Comment } from '@/features/recipe/components/comment-list';

type RecipeCommentProps = {
  comment: Comment;
};

export function CommentListItem({ comment }: RecipeCommentProps) {
  const { data: session } = useSession();

  return (
    <div className="py-8 first:pt-0 last:pb-0">
      <div className="relative flex items-center gap-x-4">
        <Image
          src={comment.user.image ?? comment.user.defaultImage}
          alt="User avatar"
          height={40}
          width={40}
          className="size-9 rounded-full"
        />
        <div className="flex-auto space-y-1.5">
          <p className="text-sm leading-none font-medium text-gray-700">{comment.user.name}</p>
          <p className="text-sm leading-none text-gray-500">
            {formatDateFromNow(comment.createdAt)} ago
          </p>
        </div>
        {session && session.user.id === comment.user.id && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button type="button" className="-m-1 rounded-md p-1 text-gray-400 hover:text-gray-500">
              <EllipsisVerticalIcon className="size-[18px]" />
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-base text-gray-700">{comment.content}</p>
    </div>
  );
}
