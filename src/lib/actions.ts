'use server';

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { validateApplication, validateCredentials, validateEmail, validateRegister, validateRestorePassword } from "./schemas";
import { FormValue, RawFormData } from "./definitions";
import { removeEmptyStrings } from "./utils";

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
                name: "Datos invalidos",
                message: 'Registro fallido'
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
                name: "Error interno",
                message: "Registro fallido",
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
                name: "Datos invalidos",
                message: 'Inicio de sesion fallido',
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
                name: "Error interno",
                message: "Inicio de sesion fallido",
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
                name: "Datos Invalidos",
                message: 'Envio de email fallido',
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
                name: "Error interno",
                message: "Envio de email fallido",
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
                name: "Datos Invalidos",
                message: 'Restablecimiento de contraseña fallido',
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
                name: "Error interno",
                message: "Restablecimiento de contraseña fallido",
            }
        }
    }
}

export const addSkill = async (name: string) => {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/skill`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        })
        const { data } = await response.json();

        return {
            skill: {
                id: data.response._id,
                name: data.response.name
            }
        }
    } catch (error) {
        return {
            error: {
                title: "Error Interno",
                name: "Error al agregar la habilidad"
            }
        }
    }
}

export async function createApplication({ rawFormData, skills, token }: { rawFormData: RawFormData, skills: string[], token: string }) {
    noStore();

    const data = removeEmptyStrings(rawFormData);
    const dataVerified = validateApplication.safeParse({ ...data, skills });
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/application`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataVerified.data)
        })
        const { success, data } = await response.json();
        revalidatePath("/app/book");

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
                message: 'Creacion de applicacion fallido',
            }
        }
    }
}

export async function deleteApplication({ token, applicationID }: { token: string, applicationID: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/application/${applicationID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const { data, success } = await response.json();
        revalidatePath("/app/book")

        return {
            success,
            data
        }
    } catch (error) {
        return {
            success: false,
            data: {
                name: "Error Interno",
                message: "Ocurrio un error al eliminar la postulacion"
            }
        }
    }
}