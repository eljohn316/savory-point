'use client';

import Image from 'next/image';
import React, { startTransition, useActionState, useState } from 'react';
import { CameraIcon } from 'lucide-react';
import { useSession, type User } from '@/lib/auth-client';
import { redirectToast } from '@/lib/actions';
import { CloudinaryImage } from '@/components/cloudinary-image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { errorToast, successToast } from '@/components/ui/sonner';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { removeProfilePhoto, updateProfilePhoto } from '@/features/settings/actions/update-profile';

type UpdateUserPhotoProps = {
  user: User;
};

export function UpdateUserPhoto({ user }: UpdateUserPhotoProps) {
  const [showUpload, setShowUpload] = useState(false);
  const [showRemove, setShowRemove] = useState(false);

  return (
    <>
      <UploadPhotoDialog user={user} open={showUpload} onOpenChange={setShowUpload} />
      <RemovePhotoDialog user={user} open={showRemove} onOpenChange={setShowRemove} />
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-900">Photo</p>
        <div className="mt-2 flex items-center gap-x-6">
          {user.image ? (
            <CloudinaryImage
              src={user.image}
              alt={`${user.firstName}'s profile photo`}
              height={48}
              width={48}
              className="size-12 rounded-full object-cover"
            />
          ) : (
            <Image
              src={user.defaultImage}
              alt={`${user.firstName}'s profile photo`}
              height={48}
              width={48}
              className="size-12 rounded-full object-cover"
            />
          )}
          <div className="flex gap-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowUpload(true)}>
              Change
            </Button>
            {user.image && (
              <Button variant="ghost" onClick={() => setShowRemove(true)}>
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

type UploadPhotoDialogProps = React.ComponentProps<typeof Dialog> & {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function UploadPhotoDialog({ user, open, onOpenChange, ...props }: UploadPhotoDialogProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [actionState, action, isPending] = useActionState(updateProfilePhoto, INITIAL_ACTION_STATE);
  const { data: session, refetch } = useSession();

  useActionFeedback(actionState, {
    onSuccess: ({ message }) => {
      refetch();
      onOpenChange(false);
      setPreview(null);
      successToast(message);
    },
    onError: ({ message }) => {
      onOpenChange(false);
      setPreview(null);
      errorToast(message);
    },
  });

  function handleOnOpenChange(open: boolean) {
    onOpenChange(open);
    setPreview(null);
  }

  function handleSetImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.item(0);
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () => {
      setPreview(fileReader.result as string);
    });
  }

  function handleUpdateUserPhoto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!preview) return;
    if (!session) return redirectToast('/sign-in', 'You need to sign in to continue');

    const formData = new FormData();
    formData.set('photo', preview);
    if (session.user.image) formData.set('publicId', session.user.image);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange} {...props}>
      <DialogContent className="sm:max-w-sm" aria-describedby={undefined}>
        <form onSubmit={handleUpdateUserPhoto} className="space-y-6">
          <DialogHeader className="gap-3">
            <DialogTitle>Update photo</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-y-6">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                height={100}
                width={100}
                className="size-32 rounded-full border border-gray-200 object-cover"
              />
            ) : user.image ? (
              <CloudinaryImage
                src={user.image}
                alt={`${user.firstName}'s photo`}
                height={100}
                width={100}
                className="size-32 rounded-full border border-gray-200 object-cover"
              />
            ) : (
              <Image
                src={user.defaultImage}
                alt={`${user.firstName}'s profile photo`}
                height={100}
                width={100}
                className="size-32 rounded-full border border-gray-200 object-cover"
              />
            )}
            <label
              htmlFor="photo"
              className="inline-flex cursor-pointer items-center gap-x-2 rounded-full border border-gray-900 bg-transparent px-4 py-1.5 text-sm leading-none font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800">
              <CameraIcon className="size-4" /> Choose image
              <input
                type="file"
                name="photo"
                id="photo"
                className="sr-only"
                onChange={handleSetImage}
              />
            </label>
          </div>
          <DialogFooter>
            <Button className="w-full" size="lg" disabled={!preview || isPending}>
              {isPending ? 'Uploading...' : 'Upload'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type RemovePhotoDialogProps = React.ComponentProps<typeof Dialog> & {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function RemovePhotoDialog({ user, open, onOpenChange, ...props }: RemovePhotoDialogProps) {
  const [actionState, action, isPending] = useActionState(removeProfilePhoto, INITIAL_ACTION_STATE);
  const { data: session, refetch } = useSession();

  useActionFeedback(actionState, {
    onSuccess: ({ message }) => {
      refetch();
      onOpenChange(false);
      successToast(message);
    },
    onError: ({ message }) => {
      onOpenChange(false);
      errorToast(message);
    },
  });

  function handleRemoveUserPhoto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!session) return redirectToast('/sign-in', 'You need to sign in to continue');

    const formData = new FormData();
    if (user.image) formData.set('image', user.image);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="gap-4 sm:max-w-md">
        <DialogHeader className="gap-3">
          <DialogTitle>Confirm remove</DialogTitle>
          <DialogDescription className="text-base">
            Are you sure you want to remove your photo?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form onSubmit={handleRemoveUserPhoto} className="flex gap-x-3">
            <Button type="button" variant="ghost" disabled={isPending} {...props}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Removing...' : 'Remove'}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
