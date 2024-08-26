import slugify from 'slugify';
import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAvatar(seed: string) {
  const avatar = createAvatar(initials, { seed });
  return avatar.toDataUri();
}

export function createSlug(value: string) {
  return slugify(value, { lower: true, remove: /[*+~.()'"!:@]/g });
}

export async function toBase64(file: File) {
  const bufferFile = await file.arrayBuffer();
  const fileBase64 = Buffer.from(bufferFile).toString('base64');

  return `data:${file.type};base64,${fileBase64}`;
}

export function formatDate(date: Date) {
  return format(date, 'MMM dd yyyy');
}

export function parseArrayValues(
  pattern: string,
  fieldObject: { [k: string]: FormDataEntryValue }
) {
  const values = [];
  const filteredFields = Object.keys(fieldObject).filter((val) =>
    val.startsWith(pattern)
  );

  for (const [key, value] of Object.entries(fieldObject)) {
    if (filteredFields.includes(key)) {
      const [_, label] = key.split(/\.\d+\./);
      values.push({ [label]: value });
    }
  }

  return values;
}
export function range(start: number, end?: number, step: number = 1) {
  let output = [];

  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
}
