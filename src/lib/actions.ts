'use server';

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { validateCreateNote, validateUpdateUser, validateUpdateNote, validateFeedback } from "./schemas";
import { RawFormData, User } from "./definitions";

export async function updateUser({ token, userData }: { token: string, userData: User }) {
    noStore();

    const verifiedFields = validateUpdateUser.safeParse(userData);

    if (!verifiedFields.success) {
        return {
            errors: verifiedFields.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos invalidos",
                message: 'Actualizacion de usuario fallida',
            }
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(verifiedFields.data)
        })
        const { success, data } = await response.json();

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
                name: "Error interno",
                message: "Actualizacion fallida",
            }
        }
    }
}







export async function sendFeedback({ token, rawFormData }: { token: string, rawFormData: RawFormData }) {
    noStore();

    const verifiedFields = validateFeedback.safeParse(rawFormData);

    if (!verifiedFields.success) {
        return {
            errors: verifiedFields.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Campos Invalidos",
                message: "Envio de Feedback Fallido"
            }
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(verifiedFields.data)
        })
        const { success, data } = await response.json();

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
