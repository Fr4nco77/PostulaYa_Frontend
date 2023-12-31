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

export const validateApplication = z.object({
    position:
        z.string({
            invalid_type_error: "Posición invalida"
        })
            .trim()
            .min(3, 'La posición debe tener al menos 3 caracteres')
            .max(25, 'La posición no puede tener más de 25 caracteres'),
    modality:
        z.enum(["Presencial", "Remoto"]),
    type:
        z.enum(["Full-Time", "Part-Time"]),
    recluter:
        z.optional(
            z.string({
                invalid_type_error: "Reclutador invalido"
            })
                .trim()
                .min(1, 'El nombre del reclutador no puede estar vacío')),
    company_name:
        z.string({
            invalid_type_error: "Empresa invalida"
        })
            .trim()
            .nonempty('El nombre de la empresa no puede estar vacío'),
    company_ubication:
        z.string({
            invalid_type_error: "Ubicacion invalida"
        })
            .trim()
            .nonempty('La ubicación de la empresa no puede estar vacía'),
    url:
        z.optional(
            z.string({
                invalid_type_error: "Url invalido"
            })
                .trim()
                .url("El url no es valido")
        ),
    skills:
        z.array(
            z.string({
                invalid_type_error: 'Habilidad invalida'
            })
                .trim()
                .min(1, 'Habilidad invalida')
        )
            .min(3, "Debes colocar un minimo de tres habilidades"),
})

export const validateUpdateApplication = validateApplication.extend({
    status: 
        z.enum(["Postulado", "En Proceso", "Finalizado"])
})