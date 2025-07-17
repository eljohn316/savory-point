import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import slugify from 'slugify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(payload: string) {
  return slugify(payload, { lower: true, remove: /[*+~.()'"!:@/]/g });
}

export function generateDefaultUserAvatar({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const firstNameInitial = firstName.at(0)!;
  const lastNameInitial = lastName.at(0)!;
  return `https://api.dicebear.com/9.x/initials/svg?seed=${firstNameInitial}%20${lastNameInitial}`;
}
