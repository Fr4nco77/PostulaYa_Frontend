'use server';

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { RawFormData } from "../definitions";
import { validateNote } from "../schemas/note";

export async function createNote({ token, rawFormData }: { token: string, rawFormData: RawFormData }) {
    noStore();

    const dataVerified = validateNote.safeParse(rawFormData);
    if (!dataVerified.success) {
        return {
            errors: dataVerified.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos Inválidos",
                message: 'Creacion de nota fallida.',
            }
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataVerified.data)
        })
        const { success, data } = await response.json();
        revalidatePath("app/note");

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
                name: "Error Interno.",
                message: "Ocurrio un error inesperado."
            }
        }
    }
}

export async function updateNote({ _id, token, rawFormData }: { _id: string, token: string, rawFormData: RawFormData }) {
    noStore();

    const dataVerified = validateNote.safeParse(rawFormData);
    if (!dataVerified.success) {
        return {
            errors: dataVerified.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos Inválidos",
                message: 'Actualización de nota fallida.',
            }
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/note/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataVerified.data)
        })
        const { success, data } = await response.json();
        revalidatePath("app/note");

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
                message: "Ocurrio un error inesperado."
            }
        }
    }
}

export async function addFavorite({ _id, token, favorite }: { _id: string, token: string, favorite: boolean }) {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/note/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ favorite })
        })
        const { success } = await response.json();
        revalidatePath("app/note");

        return {
            success
        }
    } catch (error) {
        return {
            success: false,
            data: {
                name: "Error Interno",
                message: "Ocurrio un error inesperado."
            }
        }
    }
}

export async function deleteNote({ _id, token }: { _id: string, token: string }) {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/note/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const { success, data } = await response.json();
        revalidatePath("/app/note")

        return {
            success,
            data
        }
    } catch (error) {
        return {
            success: false,
            data: {
                name: "Error Interno",
                message: "Ocurrio un error inesperado."
            }
        }
    }
}