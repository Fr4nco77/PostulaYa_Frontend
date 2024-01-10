'use server';

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { validateApplication, validateCreateNote, validateUpdateUser, validateUpdateApplication, validateUpdateNote, validateFeedback } from "./schemas";
import { RawFormData, User } from "./definitions";
import { removeEmptyStrings } from "./utils";

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



export async function updateApplication({ rawFormData, skills, token, applicationID }: { rawFormData: RawFormData, skills: string[], token: string, applicationID: string }) {
    noStore();

    const data = removeEmptyStrings(rawFormData);
    const dataVerified = validateUpdateApplication.safeParse({ ...data, skills });
    if (!dataVerified.success) {
        return {
            errors: dataVerified.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos invalidos",
                message: 'Creacion de applicacion fallida',
            }
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/application/${applicationID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ data: dataVerified.data })
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
                name: "Error interno",
                message: 'Actualizacion de applicacion fallida',
            }
        }
    }
}

export async function createNote({ rawFormData, applicationID }: { rawFormData: RawFormData, applicationID: string }) {
    noStore();

    const dataVerified = validateCreateNote.safeParse({ ...rawFormData, applicationID });
    if (!dataVerified.success) {
        return {
            errors: dataVerified.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos invalidos",
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
