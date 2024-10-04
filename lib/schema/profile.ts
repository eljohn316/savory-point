import { z } from 'zod';
import { convertToMB } from '@/lib/utils';
import { ACCEPTED_FILES, MAX_IMAGE_SIZE } from '@/lib/constants';

export const profileSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' })
});

export const userImageClientSchema = z.object({
  image: z
    .custom<FileList>()
    .refine((files) => files.length === 1, 'Image is required')
    .refine(
      (files) =>
        Array.from(files).every((file) => ACCEPTED_FILES.includes(file.type)),
      'Invalid image type. Allowed types are .jpeg, .jpg, .png and .webp'
    )
    .refine(
      (files) =>
        Array.from(files).every(
          (file) => convertToMB(file.size) <= MAX_IMAGE_SIZE
        ),
      'Maximum image size is 5mb.'
    )
});

export const userImageServerSchema = z.object({
  image: z
    .custom<File>()
    .refine((file) => file.size > 0, 'Image is required')
    .refine(
      (file) => ACCEPTED_FILES.includes(file.type),
      'Invalid image type. Allowed types are .jpeg, .jpg, .png and .webp'
    )
    .refine(
      (file) => convertToMB(file.size) <= MAX_IMAGE_SIZE,
      'Maximum image size is 5mb.'
    )
});
