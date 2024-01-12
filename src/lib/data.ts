import { unstable_noStore as noStore } from "next/cache";

export async function fetchUser({ token }: { token: string }) {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user`, {
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
                name: "Eror Interno",
                message: "Ocurrio un error inesperado"
            }
        }
    }
}

export async function fetchApplicationsMetrics({ token }: { token: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/application`, {
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
                message: "Ocurrio un error inesperado"
            }
        }
    }
}

export async function fetchApplicationsByTime({ token, period }: { token: string, period: "day" | "month" }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/applicationByTime?period=${period}`, {
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
                message: "Ocurrio un error inesperado"
            }
        }
    }
}

export async function fetchStatusMetrics({ token }: { token: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/status`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const { success, data } = await response.json();
        return {
            success,
            data,
        }
    } catch (error) {
        return {
            success: false,
            data: {
                name: "Eror Interno",
                message: "Ocurrio un error inesperado"
            }
        }
    }
}

export async function fetchModalityMetrics({ token }: { token: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/modality`, {
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
                message: "Ocurrio un error inesperado"
            }
        }
    }
}

export async function fetchSkillsMetrics({ token }: { token: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/skills`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const { success, data } = await response.json();
        return {
            success,
            data,
        }
    } catch (error) {
        return {
            success: false,
            data: {
                data: {
                    name: "Error Interno",
                    message: "Ocurrio un error inesperado"
                }
            }
        }
    }
}

export async function fetchTopSkills({ token }: { token: string }) {
    noStore();

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/topskills`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const { success, data } = await response.json();
        return {
            success,
            data,
        }
    } catch (error) {
        return {
            success: false,
            data: {
                data: {
                    name: "Error Interno",
                    message: "Ocurrio un error inesperado"
                }
            }
        }
    }
}

export async function fetchPlatforms({ token, period }: { token: string, period: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/platform?period=${period}`, {
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
                message: "Ocurrio un error inesperado"
            }
        }
    }
}
