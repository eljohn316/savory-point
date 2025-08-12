'use client';

import Image from 'next/image';
import { useState, useActionState, startTransition } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CameraIcon, XIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { useSession } from '@/lib/auth-client';
import { FormField } from '@/components/form/form-field';
import { FormItem } from '@/components/form/form-item';
import { FormMessage } from '@/components/form/form-message';
import { FormLabel } from '@/components/form/form-label';
import { FormControl } from '@/components/form/form-control';
import { Form } from '@/components/form/form';
import { INITIAL_ACTION_STATE } from '@/components/form/utils/action-state-utils';
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback';
import { renderFormErrors } from '@/components/form/utils/render-form-errors';
import { errorToast, successToast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { authRedirect } from '@/features/auth/actions/auth-redirect';
import { updateRecipeClientSchema } from '@/features/my-recipes/schema/update-recipe';
import { updateRecipeImage } from '@/features/my-recipes/actions/update-recipe';

type UpdateRecipeImageFormProps = { currentImage: React.ReactNode };
const schema = updateRecipeClientSchema.pick({ image: true });
type SchemaValues = z.infer<typeof schema>;

export function UpdateRecipeImageForm({ currentImage }: UpdateRecipeImageFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm<SchemaValues>({
    resolver: zodResolver(schema),
  });

  const { id: recipeId } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [actionState, action, isPending] = useActionState(
    updateRecipeImage.bind(null, recipeId),
    INITIAL_ACTION_STATE,
  );

  useActionFeedback(actionState, {
    onSuccess: ({ message }) => {
      successToast(message);
      setPreview(null);
    },
    onError: ({ message }) => {
      errorToast(message);
    },
    onFail: ({ fieldErrors }) => {
      renderFormErrors(fieldErrors, form);
    },
  });

  function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.item(0);
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () => {
      setPreview(fileReader.result as string);
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!preview) return;
    if (!session) return await authRedirect('/upload-recipe');

    form.handleSubmit(() => {
      startTransition(() => {
        const formData = new FormData();
        formData.append('image', preview as string);
        action(formData);
      });
    })(e);
  }

  return (
    <Form {...form}>
      <form action={action} onSubmit={handleSubmit}>
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-green-900">Image</h3>
          <FormField
            control={form.control}
            name="image"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-0">
                <div
                  className={cn(
                    fieldState.error ? 'border-red-700' : 'border-gray-300',
                    'h-80 rounded-md border-2 border-dashed p-1 sm:h-96',
                  )}>
                  {preview ? (
                    <div className="relative h-full overflow-hidden rounded-md">
                      <Image
                        src={preview}
                        alt="Recipe image preview"
                        fill
                        sizes="(min-width: 808px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
                        onClick={() => {
                          form.resetField('image');
                          setPreview(null);
                        }}>
                        <XIcon className="size-4" />
                        <span className="sr-only">Remove image</span>
                      </button>
                    </div>
                  ) : (
                    currentImage
                  )}
                </div>
                <FormMessage className="mt-2" />
                <FormLabel className="mt-6 inline-flex cursor-pointer items-center gap-x-2.5 rounded-md border border-emerald-700 px-4 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-700 hover:text-emerald-50 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-2 focus:outline-none">
                  <CameraIcon className="size-4" />
                  Select new image
                  <FormControl>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        handlePreview(e);
                        field.onChange(e.target.files);
                      }}
                    />
                  </FormControl>
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-10">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving changes...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
