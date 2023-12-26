import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeEmptyStrings(obj: { [key: string]: unknown }): { [key: string]: unknown } {
  const result: { [key: string]: unknown } = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== '') {
      result[key] = value;
    }
  });

  return result;
}
