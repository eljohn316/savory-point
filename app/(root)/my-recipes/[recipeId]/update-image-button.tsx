'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useParams } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Modal, ModalTitle } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';
import { updateImageAction } from './lib/action';

interface UpdateImageButtonProps {
  imageUrl: string;
}

export function UpdateImageButton({ imageUrl }: UpdateImageButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const params = useParams<{ recipeId: string }>();
  const [preview, setPreview] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [formState, formAction] = useFormState(
    updateImageAction.bind(null, params.recipeId),
    null
  );

  useEffect(() => {
    if (formState?.success) handleClose();
  }, [formState]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    const file = files?.item(0);

    if (!file) return;

    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () => {
      setPreview(fileReader.result as string);
    });
  }

  function handleClose() {
    setOpen(false);
    setPreview(null);
    formRef.current?.reset();
  }

  return (
    <>
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => setOpen(true)}>
        Update
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-between items-center mb-6">
          <ModalTitle as="h3" className="text-base text-gray-900 font-semibold">
            Update recipe image
          </ModalTitle>
          <button
            type="button"
            className="p-1 -m-1 rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:outline-none focus:ring-emerald-600"
            onClick={handleClose}>
            <span className="sr-only">Close</span>
            <XMarkIcon className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mb-6 h-48 sm:h-60 p-1.5 border-2 border-gray-300 border-dashed flex rounded-lg">
          <div className="relative flex-1 rounded-lg overflow-hidden">
            <Image
              src={preview ?? imageUrl}
              alt="Recipe image preview"
              fill
              sizes="(min-width: 808px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <form ref={formRef} action={formAction}>
          <Button variant="secondary" className="w-full cursor-pointer" asChild>
            <label htmlFor="image">
              Choose new Image
              <input
                type="file"
                id="image"
                name="image"
                className="sr-only"
                onChange={handleChange}
              />
            </label>
          </Button>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <SubmitButton disabled={!preview} />
          </div>
        </form>
      </Modal>
    </>
  );
}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  if (disabled)
    return (
      <Button type="submit" className="w-full" disabled={disabled}>
        Update image
      </Button>
    );

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Updating image' : 'Update image'}
      {pending && <Spinner className="ml-2 size-4" />}
    </Button>
  );
}
