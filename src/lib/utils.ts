import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { RawFormData } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function configCookies() {
  // Obtener la fecha actual
  const currentDate = new Date();

  // Calcular la fecha de expiración sumando 12 horas en milisegundos
  const expirationTime = currentDate.getTime() + 9 * 60 * 60 * 1000;

  // Crear un nuevo objeto Date con la fecha de expiración
  const expires = new Date(expirationTime);
  return {
    expires,
    secure: false
  }
}

export function formatedQuery(searchParams: { [key: string]: string }) {
  const params = {
    query: searchParams?.query || '',
    modality: searchParams?.modality || '',
    type: searchParams?.type || '',
    page: searchParams?.page || '1',
    order: searchParams?.order || 'desc',
    limit: searchParams?.limit || '6',
  };

  const query = Object.entries(params)
    .filter(([_, value]) => value !== '') // Filtrar solo valores no vacíos
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `?${query}`;
}

export const removeEmptyStrings = (obj: RawFormData) => {
  const newObj = { ...obj } as { [key: string]: string };

  for (const prop in newObj) {
    if (newObj[prop].trim() === '') {
      delete newObj[prop];
    }
  }

  return newObj;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // Si el número total de páginas es 7 o menos,
  // muestra todas las páginas sin puntos suspensivos.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Si la página actual está entre las primeras 3 páginas, 
  // muestra las primeras 3, una elipsis y las últimas 2 páginas.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // Si la página actual está entre las últimas 3 páginas, 
  // muestra las 2 primeras, una elipsis y las 3 últimas páginas.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // Si la página actual está en algún punto intermedio, 
  // muestra la primera página, unos puntos suspensivos, la página actual y sus vecinas, 
  // otros puntos suspensivos y la última página.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

