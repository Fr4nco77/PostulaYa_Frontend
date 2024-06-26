import { unstable_noStore as noStore } from "next/cache";

export async function fetchUserMetrics({ token }: { token: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/user`, {
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
                message: "Ocurrio un error inesperado."
            }
        }
    }
}

export async function fetchApplicationsByTime({ token, period }: { token: string, period: "day" | "month" }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/applicationsByTime?period=${period}`, {
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
                message: "Ocurrio un error inesperado."
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
                message: "Ocurrio un error inesperado."
            }
        }
    }
}

export async function fetchModalityMetrics({ token }: { token: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/modalitys`, {
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
                message: "Ocurrio un error inesperado."
            }
        }
    }
}

export async function fetchWorkdaysMetrics({ token }: { token: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/workdays`, {
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
                message: "Ocurrio un error inesperado."
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
                    message: "Ocurrio un error inesperado."
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
                    message: "Ocurrio un error inesperado."
                }
            }
        }
    }
}

export async function fetchPlatforms({ token }: { token: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/platforms`, {
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
                message: "Ocurrio un error inesperado."
            }
        }
    }
}

export async function fetchFeelings({ token }: { token: string }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/metric/feelings`, {
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
                message: "Ocurrio un error inesperado."
            }
        }
    }
}
