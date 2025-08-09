'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { EllipsisVerticalIcon } from 'lucide-react';
import { formatDateFromNow } from '@/lib/helpers';
import { useSession } from '@/lib/auth-client';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CloudinaryImage } from '@/components/cloudinary-image';
import { Comment } from '@/features/recipe/components/comment-list';
import { DeleteCommentModal } from '@/features/recipe/components/delete-comment-modal';
import { useUpdateComment } from '@/features/recipe/hooks/use-update-comment';
import { useDeleteComment } from '@/features/recipe/hooks/use-delete-comment';
import { useAuthRedirect } from '@/features/auth/hooks/use-auth-redirect';

type RecipeCommentProps = {
  comment: Comment;
};

export function CommentListItem({ comment }: RecipeCommentProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const authRedirect = useAuthRedirect();
  const [toggleEditForm, setToggleEditForm] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const { data: session } = useSession();
  const { isUpdating, update } = useUpdateComment(comment.id);
  const { isDeleting, deleteComment } = useDeleteComment(comment.id);

  function handleCloseAutofocus(e: Event) {
    e.preventDefault();
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (textareaRef.current) {
      const length = textareaRef.current.value.length;
      textareaRef.current.selectionStart = length;
      textareaRef.current.selectionEnd = length;
      textareaRef.current.focus();
    }
  }

  async function handleUpdateComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session) return await authRedirect();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const content = formData.get('content') as string;

    update(content, {
      onSuccess: () => setToggleEditForm(false),
    });
  }

  async function handleDeleteComment() {
    if (!session) return await authRedirect();
    deleteComment(comment.id);
  }

  return (
    <>
      <DeleteCommentModal
        open={toggleDeleteModal}
        onOpenChange={setToggleDeleteModal}
        isDeleting={isDeleting}
        onDelete={handleDeleteComment}
      />
      <div className="py-8 first:pt-0 last:pb-0">
        <div className="relative flex items-center gap-x-4">
          {comment.user.image ? (
            <CloudinaryImage
              src={comment.user.image}
              alt="User avatar"
              height={40}
              width={40}
              className="size-9 rounded-full"
            />
          ) : (
            <Image
              src={comment.user.defaultImage}
              alt="User avatar"
              height={40}
              width={40}
              className="size-9 rounded-full"
            />
          )}
          <div className="flex-auto space-y-1.5">
            <p className="text-sm leading-none font-medium text-gray-700">{comment.user.name}</p>
            <p className="text-sm leading-none text-gray-500">
              {formatDateFromNow(comment.createdAt)} ago
            </p>
          </div>
          {session && session.user.id === comment.user.id && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="-m-1 rounded-md p-1 text-gray-400 hover:text-gray-500">
                  <EllipsisVerticalIcon className="size-[18px]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-40 p-2"
                  onCloseAutoFocus={handleCloseAutofocus}>
                  <DropdownMenuGroup className="space-y-1">
                    <DropdownMenuItem
                      onSelect={() => setToggleEditForm(true)}
                      className="text-base text-gray-600">
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setToggleDeleteModal(true)}
                      className="text-base text-gray-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        {toggleEditForm ? (
          <form className="mt-4 space-y-4" onSubmit={handleUpdateComment} ref={formRef}>
            <Textarea
              name="content"
              rows={4}
              defaultValue={comment.content}
              ref={textareaRef}
              disabled={isUpdating}
              required
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Update'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                disabled={isUpdating}
                onClick={() => setToggleEditForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <p className="mt-4 text-base text-gray-700">{comment.content}</p>
        )}
      </div>
    </>
  );
}
