import { z } from "zod";

export const validateEmail = z.object({
    email:
        z.string({
            required_error: "Email es requerido."
        })
            .trim()
            .toLowerCase()
            .email({
                message: "Email inválido."
            })
});

export const validatePassword = z.object({
    password:
        z.string({
            required_error: "Contraseña es requerida."
        })
            .trim()
            .min(8, {
                message: "Debe tener más de 8 caracteres."
            })
            .max(20, {
                message: "Debe tener menos de 20 caracteres."
            })
});

export const validateCredentials = validateEmail.merge(validatePassword);

export const validateRegister = z.object({
    username:
        z.string({
            required_error: "Nombre es requerido."
        })
            .trim()
            .min(3, {
                message: "Debe tener más de tres caracteres."
            })
            .max(15, {
                message: "Debe tener menos de 15 caracteres."
            })

}).merge(validateEmail).merge(validatePassword);


export const validateRestorePassword = validatePassword.extend({
    token:
        z.string({
            required_error: "Token inválido."
        })
            .trim()
            .uuid({
                message: "Token inválido."
            })
});

export const validateUpdateUser = z.object({
    username:
        z.optional(
            z.string({
                invalid_type_error: "Nombre de usuario inválido."
            })
                .min(3, {
                    message: "Debe tener más de tres caracteres."
                })
                .max(15, {
                    message: "Debe tener menos de 15 caracteres."
                })
        ),
    image:
        z.optional(
            z.string({
                invalid_type_error: "Imagen inválida."
            })
                .trim()
                .url("Imagen invalida.")
        ),
    skills:
        z.optional(
            z.array(
                z.string({
                    invalid_type_error: "Habilidad inválida."
                })
                    .trim()
                    .min(1, "Habilidad inválida.")
            )
        )
})

export const validateFeedback = z.object({
    subject:
        z.string({
            invalid_type_error: "Asunto inválido."
        })
            .trim()
            .min(1, "Asunto inválido."),
    body:
        z.string({
            invalid_type_error: "Contendio inválido."
        })
            .trim()
            .min(1, "Contenido inválido.")
})