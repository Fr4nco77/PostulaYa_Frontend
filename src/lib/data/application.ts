import { unstable_noStore as noStore } from "next/cache";
import { ApplicationQuery } from "../definitions";

export async function fetchApplications({ query, token }: ApplicationQuery) {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/application${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const { success, data } = await response.json();
        return {
            success,
            data
        }
    } catch (error) {
        // console.log(error)
        return {
            success: false,
            data: {
                name: "Error Interno",
                message: "Ocurrio un error inesperado intenta acceder a tus postulaciones en otro momento. Si el error persiste comunicate con el administrador"
            }
        }
    }
}

export async function fetchApplicationByID({ token, application }: { token: string, application: string }) {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/application/${application}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const { success, data } = await response.json();

        return {
            success,
            data
        }
    } catch (error) {
        return {
            success: false,
            data: {
                name: "Error Interno",
                message: "Ocurrio un error al acceder a la postulacion"
            }
        }
    }
}

export async function fetchApplicationsPages({ query, token }: ApplicationQuery) {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/application/pages${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const { data } = await response.json();
        return {
            totalPages: data.response.totalPages
        }
    } catch (error) {
        // console.log(error);
        throw new Error('Failed to fetch total number of pages.');
    }
}