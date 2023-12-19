import { validateCredentials, validateEmail, validateRegister } from "./schemas";
import { UserCredentials } from "./definitions";

export async function createUser(credentials: UserCredentials) {
    // Valida los campos de entrada del usuario
    const validatedFields = validateRegister.safeParse(credentials)

    // Verifica si la validación fue exitosa, caso contrario indica los errores
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to registered.',
            success: false
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
            message: data.message,
            success
        }
    } catch (error) {
        return {
            errors: {},
            message: "Internal Error: Failed to registered",
            success: false
        }
    }
}

export async function loginUser(credentials: UserCredentials) {
    const verifiedFields = validateCredentials.safeParse(credentials);

    if (!verifiedFields.success) {
        return {
            errors: verifiedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to registered.',
            success: false
        }
    }

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
            message: data.message,
            success,
            response: data.response
        }
    } catch (error) {
        return {
            errors: {},
            message: "Internal Error: Failed to login",
            success: false
        }
    }
}

export async function sendResetEmail(email: string) {
    const verifiedField = validateEmail.safeParse({email});

    if(!verifiedField.success) {
        return {
            errors: verifiedField.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to registered.',
            success: false
        }
    }

    try {
        const response = await fetch(`${process.env.BACKEND}/user/reset_password_email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(verifiedField.data)
        })
        const { success, data } = await response.json();

        return {
            errors: {},
            data,
            success
        }
    } catch (error) {
        return {
            errors: {},
            message: "Internal Error: Failed to login",
            success: false
        }
    }
}
