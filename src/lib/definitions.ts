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
