export type UserCredentials = {
    username?: string;
    email: string;
    password: string;
}  

export type FormState = {
    errors?: { [key: string]: string[] };
    message: null | string;
}
