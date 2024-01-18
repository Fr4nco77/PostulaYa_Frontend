import { unstable_noStore as noStore } from "next/cache";

export async function fetchUserInterviews({ token, application }: { token: string, application: string }) {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/interview/${application}`, {
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
                message: "Ocurrio un error inesperado intenta acceder a tus postulaciones en otro momento. Si el error persiste comunicate con el administrador"
            }
        }
    }
}

export async function fetchAllInterviews({ query }: { query: string }) {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/interview${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
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
                message: "Ocurrio un error inesperado intenta acceder a tus postulaciones en otro momento. Si el error persiste comunicate con el administrador"
            }
        }
    }
}

export async function fetchInterviewsPages({ query }: { query: string }) {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/interview/pages${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const { success, data } = await response.json();

        return {
            success,
            totalPages: data.response.totalPages
        }
    } catch (error) {
        return {
            success: false,
            data: {
                name: "Error Interno",
                message: "Ocurrio un error inesperado intenta acceder a tus postulaciones en otro momento. Si el error persiste comunicate con el administrador"
            }
        }
    }
}