'use client';

import Image from 'next/image';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CameraIcon, PhotoIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Prisma } from '@prisma/client';

import { useToast } from '@/hooks/use-toast';
import { useFormAction } from '@/hooks/use-form-action';
import { updateRecipeImage } from '@/lib/actions/recipe';
import { recipeClientSchema } from '@/lib/schema/upload-recipe';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';

interface UpdateImageFormProps {
  recipe: Prisma.RecipeGetPayload<{
    select: {
      id: true;
      imageUrl: true;
    };
  }>;
}

const schema = recipeClientSchema.pick({ image: true });
type TSchema = z.infer<typeof schema>;

export function UpdateImageForm({ recipe }: UpdateImageFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    recipe.imageUrl
  );

  const form = useForm<TSchema>({ resolver: zodResolver(schema) });
  const imageField = form.register('image', {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      const file = files?.item(0);

      if (!file) return;

      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', () => {
        setImagePreview(fileReader.result as string);
      });
    }
  });

  const { toast } = useToast();
  const { isPending, formAction, formState, onSubmit } = useFormAction(
    updateRecipeImage.bind(null, recipe.id),
    {}
  );

  useEffect(() => {
    if (formState.success) {
      toast({
        variant: 'success',
        title: formState.message
      });
    }

    if (formState.success === false) {
      toast({
        variant: 'danger',
        title: formState.message
      });
    }
  }, [toast, formState]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!imagePreview || imagePreview === recipe.imageUrl) return;

    const formData = new FormData();

    formData.set('image', imagePreview);

    onSubmit(() => {
      form.handleSubmit(() => formAction(formData))(e);
    });
  }

  return (
    <div className="max-w-lg">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem className="mb-12">
                <div className="mb-4 space-y-2">
                  <ImagePreview url={imagePreview} />
                  <FormMessage />
                </div>

                <Button variant="outline" asChild>
                  <FormLabel className="cursor-pointer">
                    <CameraIcon
                      className="mr-2 size-4 text-gray-400"
                      aria-hidden="true"
                    />
                    Choose another image
                    <FormControl>
                      <input type="file" className="sr-only" {...imageField} />
                    </FormControl>
                  </FormLabel>
                </Button>
              </FormItem>
            )}
          />
          <Button disabled={isPending || imagePreview === recipe.imageUrl}>
            {isPending && <Spinner className="mr-2" aria-hidden="true" />}
            {isPending ? 'Updating image' : 'Update image'}
          </Button>
        </form>
      </Form>
    </div>
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
