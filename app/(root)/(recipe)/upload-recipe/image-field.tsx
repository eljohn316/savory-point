'use client';

import * as React from 'react';
import { z } from 'zod';
import { recipeClientSchema } from '@/lib/schema/upload-recipe';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import Image from 'next/image';
import { CameraIcon, PhotoIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';

type TSchema = z.infer<typeof recipeClientSchema>;

interface ImageFieldProps {
  form: UseFormReturn<TSchema>;
  error: string | undefined;
  src: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageField({ form, error, src, onChange }: ImageFieldProps) {
  const imageField = form.register('image', { onChange });

  return (
    <FormField
      control={form.control}
      name="image"
      render={() => (
        <FormItem className="space-y-4 sm:col-span-3">
          <div className="space-y-2">
            <ImagePreview url={src} />
            <FormMessage>{error}</FormMessage>
          </div>

          <Button variant="outline" asChild>
            <FormLabel className="cursor-pointer">
              <CameraIcon
                className="mr-2 size-4 text-gray-400"
                aria-hidden="true"
              />
              Choose image
              <FormControl serverError={error}>
                <input type="file" className="sr-only" {...imageField} />
              </FormControl>
            </FormLabel>
          </Button>
        </FormItem>
      )}
    />
  );
}

interface ImagePreviewProps {
  url: string | null;
}

export function ImagePreview({ url }: ImagePreviewProps) {
  if (!url)
    return (
      <div className="flex h-80 rounded-lg border-2 border-dashed border-gray-300 p-1.5 sm:col-span-3">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto size-12 text-gray-300"
              aria-hidden="true"
            />
            <p className="mt-2 text-xs leading-5 text-gray-600">
              PNG, JPG, JPEG up to 5MB
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex h-80 rounded-lg border-2 border-dashed border-gray-300 p-1.5 sm:col-span-3">
      <div className="relative flex-1 overflow-hidden rounded-lg">
        <Image
          src={url}
          alt="Recipe image preview"
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
