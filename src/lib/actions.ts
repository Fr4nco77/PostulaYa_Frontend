import { validateRegister } from "./schemas";
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
        const response = await fetch(`${process.env.BACKEND}/user/create`, {
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
