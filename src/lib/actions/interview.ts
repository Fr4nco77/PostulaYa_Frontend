'use server';

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { RawFormData } from "../definitions";
import { formatedInterviewData, removeEmptyStrings } from "../utils";
import { validateCreate } from "../schemas/interview";

export const createInterview = async ({ token, rawFormData }: { token: string, rawFormData: RawFormData }) => {
    noStore();

    const data = removeEmptyStrings(rawFormData);
    const dataFormated = formatedInterviewData({ data });
    const dataVerified = validateCreate.safeParse(dataFormated);
    if (!dataVerified.success) {
        return {
            errors: dataVerified.error.flatten().fieldErrors,
            success: false,
            data: {
                name: "Datos invalidos/incompletos",
                message: 'Registro de entrevista fallida',
            }
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/interview`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataVerified.data)
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
                message: 'Registro de entrevista fallido',
            }
        }
    }
}

export const deleteInterview = async ({ token, interview, application }: { token: string, interview: string, application: string }) => {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/interview/${interview}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const { success, data } = await response.json();
        revalidatePath(`/app/book/${application}`);

        return {
            success,
            data
        }
    } catch (error) {
        return {
            success: false,
            data: {
                name: "Error interno",
                message: 'Registro de entrevista fallido',
            }
        }
    }
}

// export const updateInterview = async ({ token, interview, application, rawFormData }:
//     { token: string, interview: string, application: string, rawFormData: RawFormData }) => {
//     noStore();

//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/interview/${interview}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//         })
//         const { success, data } = await response.json();
//         revalidatePath(`/app/book/${application}`);

//         return {
//             errors: {},
//             success,
//             data
//         }
//     } catch (error) {
//         return {
//             errors: {},
//             success: false,
//             data: {
//                 name: "Error interno",
//                 message: 'Registro de entrevista fallido',
//             }
//         }
//     }
// }