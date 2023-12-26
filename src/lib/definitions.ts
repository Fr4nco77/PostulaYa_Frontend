export type UserCredentials = {
    username?: string;
    email: string;
    password: string;
}

export type Passwords = {
    password: string;
    checkPassword: string;
}

export type ResetData = {
    token: string;
    password: string;
}

export type Errors = {
    [key: string]: string[]
}

export type Application = {
    position: string,
    modality: string | null,
    type: string | null,
    recluter?: string,
    company_name: string,
    company_ubication: string,
    url?: string,
    skills: {
        id: string,
        name: string
    }[],
}