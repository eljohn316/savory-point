'use client';

import { useState } from 'react';
import { EllipsisVerticalIcon, MessageCircleIcon, ThumbsUpIcon } from 'lucide-react';
import { formatDate } from '@/lib/helpers';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Comment } from './comment-list';

type RecipeCommentProps = {
  comment: Comment;
};

export function CommentListItem({ comment }: RecipeCommentProps) {
  const [toggleReplyForm, setToggleReplyForm] = useState(false);

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
          <p className="text-sm leading-none text-gray-500">{formatDate(comment.createdAt)}</p>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button type="button" className="-m-1 rounded-md p-1 text-gray-400 hover:text-gray-500">
            <EllipsisVerticalIcon className="size-[18px]" />
          </button>
        </div>
      </div>
      <p className="mt-6 text-base text-gray-700">{comment.content}</p>
      <div className="mt-6 flex items-center gap-x-6">
        <button
          type="button"
          className="inline-flex items-center gap-x-2 text-sm text-gray-500 hover:text-emerald-600">
          <ThumbsUpIcon className="size-4" />
          Like
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 text-sm text-gray-500 hover:text-emerald-600">
          <MessageCircleIcon className="size-4" />
          Replies (0)
        </button>
        <button
          type="button"
          className="ml-auto text-sm font-medium text-emerald-700 hover:text-emerald-800"
          onClick={() => setToggleReplyForm(!toggleReplyForm)}>
          {toggleReplyForm ? 'Hide' : 'Reply'}
        </button>
      </div>
      {toggleReplyForm && (
        <div className="mt-6 space-y-4">
          <Textarea placeholder="Write your reply..." rows={3} />
          <Button>Post reply</Button>
        </div>
      )}
    </div>
  );
}
