import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import slugify from 'slugify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(payload: string) {
  return slugify(payload, { lower: true, remove: /[*+~.()'"!:@/]/g });
}
