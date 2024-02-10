'use server';

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { FormValue, RawFormData, User } from "../definitions";
import { validateEmail, validateCredentials, validateRegister, validateRestorePassword, validateUpdateUser, validateFeedback } from "@/lib/schemas/user";

export async function createUser(credentials: RawFormData) {
    noStore();

    // Valida los campos de entrada del usuario
    const validatedFields = validateRegister.safeParse(credentials)

    // Verifica si la validación fue exitosa, caso contrario indica los errores
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos Inválidos",
                message: 'Registro fallido.'
            },
        }
    }

    //Hace una peticion POST para agregar al usuario y maneja la solicitud en caso de exito/error
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedFields.data),
        })
        const { success, data } = await response.json();

        return {
            errors: {},
            success,
            data,
        }
    } catch (error) {
        return {
            errors: {},
            success: false,
            data: {
                name: "Error Interno",
                message: "Registro fallido.",
            }
        }
    }
}

export async function loginUser(credentials: RawFormData) {
    noStore();

    // Valida los campos de entrada del usuario
    const verifiedFields = validateCredentials.safeParse(credentials);

    // Verifica si la validación fue exitosa, caso contrario indica los errores
    if (!verifiedFields.success) {
        return {
            errors: verifiedFields.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos Inválidos",
                message: 'Inicio de sesión fallido.',
            }
        }
    }

    //Hace una peticion POST para logear al usuario y maneja la solicitud en caso de exito/error
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
                message: "Inicio de sesión fallido.",
            }
        }
    }
}

export async function sendResetEmail(email: FormValue) {
    noStore();

    // Valida los campos de entrada del usuario
    const verifiedField = validateEmail.safeParse({ email });

    // Verifica si la validación fue exitosa, caso contrario indica los errores
    if (!verifiedField.success) {
        return {
            errors: verifiedField.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos Inválidos",
                message: 'Envio de email fallido.',
            }
        }
    }

    //Hace una peticion POST para enviar el email de restablecimiento y maneja la solicitud en caso de exito/error
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/reset_password_email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(verifiedField.data)
        })
        const { success, data } = await response.json();

        return {
            errors: {},
            success,
            data,
        }
    } catch (error) {
        return {
            errors: {},
            success: false,
            data: {
                name: "Error Interno",
                message: "Envio de email fallido.",
            }
        }
    }
}


export async function resetPassword(resetData: RawFormData) {
    noStore();

    // Valida los campos de entrada del usuario
    const verifiedFields = validateRestorePassword.safeParse(resetData);

    // Verifica si la validación fue exitosa, caso contrario indica los errores
    if (!verifiedFields.success) {
        return {
            errors: verifiedFields.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos Inválidos",
                message: 'Restablecimiento de contraseña fallido.',
            }
        }
    }

    //Hace una peticion PATCH para restablecer la contraseña y maneja la solicitud en caso de exito/error
    const { token, password } = verifiedFields.data
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/reset_password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, newPassword: password })
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
                message: "Restablecimiento de contraseña fallido.",
            }
        }
    }
}

export async function updateUser({ token, userData }: { token: string, userData: User }) {
    noStore();

    const verifiedFields = validateUpdateUser.safeParse(userData);

    if (!verifiedFields.success) {
        return {
            errors: verifiedFields.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos Inválidos",
                message: 'Actualizacion de usuario fallida.',
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
        revalidatePath("/app");
        
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
                message: "Actualizacion fallida.",
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
                name: "Datos Inválidos",
                message: "Envio de feedback fallido."
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
                message: "Ocurrio un error inesperado."
            }
        }
    }
}