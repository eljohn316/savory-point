import slugify from 'slugify';
import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createUserAvatar(firstName: string, lastName: string) {
  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`;
}

export function convertToMB(sizeInBytes: number, decimalsNum = 2) {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
}

export async function convertFiletoBase64(file: File) {
  const bufferFile = await file.arrayBuffer();
  const fileBase64 = Buffer.from(bufferFile).toString('base64');

  return `data:${file.type};base64,${fileBase64}`;
}

export function range(start: number, end?: number, step: number = 1) {
  const output = [];

  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
}

export function formatDate(date: Date) {
  return format(date, 'MMM dd, yyyy');
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, label] = key.split(/\.\d+\./);
      values.push({ [label]: value });
    }
  }

  return values;
}

export function createSlug(value: string) {
  return slugify(value, { lower: true, remove: /[*+~.()'"!:@]/g });
}
