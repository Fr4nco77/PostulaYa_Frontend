'use server';

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { RawFormData } from "../definitions";
import { validateCreateNote, validateUpdateNote } from "../schemas";

export async function createNote({ rawFormData, applicationID }: { rawFormData: RawFormData, applicationID: string }) {
    noStore();

    const dataVerified = validateCreateNote.safeParse({ ...rawFormData, applicationID });
    if (!dataVerified.success) {
        return {
            errors: dataVerified.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos Invalidos",
                message: 'Creacion de nota fallida',
            }
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataVerified.data)
        })
        const { success, data } = await response.json();
        revalidatePath(`/app/book/${applicationID}`);

        return {
            errors: {},
            success,
            data
        }
    } catch (error) {
        return {
            errors: {},
            success: false,
            data: {
                name: "Error Interno",
                message: "Ocurrio un error inesperado"
            }
        }
    }
}

export async function updateNote({ _id, rawFormData }: { _id: string, rawFormData: RawFormData }) {
    noStore();

    const dataVerified = validateUpdateNote.safeParse(rawFormData);
    if (!dataVerified.success) {
        return {
            errors: dataVerified.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos invalidos",
                message: 'Actualizacion de nota fallida',
            }
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/note/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataVerified.data)
        })
        const { success, data } = await response.json();
        revalidatePath(`/app/book/${_id}`);

        return {
            errors: {},
            success,
            data
        }
    } catch (error) {
        return {
            errors: {},
            success: false,
            data: {
                name: "Error Interno",
                message: "Ocurrio un error inesperado"
            }
        }
    }
}

export async function deleteNote({ _id }: { _id: string }) {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/note/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const { success, data } = await response.json();
        if (!success) {
            return {
                success: success,
                data: data
            }
        }
        revalidatePath(`/app/book/${_id}`)

        return {
            success,
            data
        }
    } catch (error) {
        return {
            success: false,
            data: {
                name: "Error Interno",
                message: "Ocurrio un error inesperado"
            }
        }
    }
}