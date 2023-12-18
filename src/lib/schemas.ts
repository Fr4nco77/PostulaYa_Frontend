import { z } from "zod";

export const validateEmail = z.object({
    email:
        z.string({
            required_error: "Email is required"
        })
            .trim()
            .toLowerCase()
            .email({
                message: "Invalid email"
            })
});

export const validatePassword = z.object({
    password:
        z.string({
            required_error: "Password is required"
        })
            .trim()
            .min(8, {
                message: "Must be 8 or more characters long"
            })
            .max(20, {
                message: "Must be 20 or fewer characters long"
            })
});

export const validateCredentials = validateEmail.merge(validatePassword);

export const validateRegister = z.object({
    username:
        z.string({
            required_error: "Username is required"
        })
            .trim()
            .min(3, {
                message: "Must be 3 or more characters long"
            })
            .max(15, {
                message: "Must be 15 or fewer characters long"
            })

}).merge(validateEmail).merge(validatePassword);


export const validateRestorePassword = validatePassword.extend({
    token:
        z.string({
            required_error: "Token is required"
        })
            .trim()
            .uuid({
                message: "Invalid token"
            })
});
