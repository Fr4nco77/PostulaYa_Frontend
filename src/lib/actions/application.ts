import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { removeEmptyStrings } from "../utils";
import { validateApplication } from "../schemas";
import { RawFormData } from "../definitions";

export const addSkill = async (name: string) => {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/skill/findOrCreate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        })
        const { data } = await response.json();

        return {
            skill: {
                _id: data.response._id,
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
                name: "Datos invalidos/incompletos",
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
    noStore();

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
