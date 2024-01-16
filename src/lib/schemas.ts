import { z } from "zod";

export const validateEmail = z.object({
    email:
        z.string({
            required_error: "Email es requerido"
        })
            .trim()
            .toLowerCase()
            .email({
                message: "Email invalido"
            })
});

export const validatePassword = z.object({
    password:
        z.string({
            required_error: "Contraseña es requerida"
        })
            .trim()
            .min(8, {
                message: "Debe tener más de 8 caracteres"
            })
            .max(20, {
                message: "Debe tener menos de 20 caracteres"
            })
});

export const validateCredentials = validateEmail.merge(validatePassword);

export const validateRegister = z.object({
    username:
        z.string({
            required_error: "Nombre es requerido"
        })
            .trim()
            .min(3, {
                message: "Debe tener más de tres caracteres"
            })
            .max(15, {
                message: "Debe tener menos de 15 caracteres"
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

export const validateUpdateUser = z.object({
    username:
        z.optional(
            z.string({
                invalid_type_error: "Nombre de usuario invalido"
            })
                .trim()
                .min(1, "Nombre de usuario invalido")
        ),
    image:
        z.optional(
            z.string({
                invalid_type_error: "Imagen invalida"
            })
                .trim()
                .min(1, "Imagen invalida")
        ),
    skills:
        z.optional(
            z.array(
                z.string({
                    invalid_type_error: "Habilidad invalida"
                })
            )
        )
})

export const validateApplication = z.object({
    position:
        z.string({
            invalid_type_error: "Posición Invalida"
        })
            .trim()
            .min(3, 'La posición debe tener al menos 3 caracteres')
            .max(25, 'La posición no puede tener más de 25 caracteres'),
    modality:
        z.enum(["Presencial", "Remoto", "Hibrido"]),
    type:
        z.enum(["Full-Time", "Part-Time"]),
    recluter:
        z.optional(
            z.string({
                invalid_type_error: "Reclutador Invalido"
            })
                .trim()
                .min(1, 'Reclutador Invalido')),
    company_name:
        z.string({
            invalid_type_error: "Empresa Invalida"
        })
            .trim()
            .min(1, 'Empresa Invalida'),
    company_ubication:
        z.string({
            invalid_type_error: "Ubicacion Invalida"
        })
            .trim()
            .min(1, "Ubicacion Invalida"),
    platform:
        z.enum(["Linkedin", "Indeed", "Glassdoor", "Get on Board", "Computrabajo", "Otra"]),
    url:
        z.string({
            invalid_type_error: "Url Invalido"
        })
            .trim()
            .url("Url Invalido")
    ,
    skills:
        z.array(
            z.string({
                invalid_type_error: 'Habilidad/es Invalida'
            })
                .trim()
                .min(1, 'Habilidades Invalidas')
        )
            .min(3, "Debes colocar un minimo de tres habilidades"),
})

export const validateUpdateApplication = validateApplication.extend({
    status:
        z.enum(["Postulado", "En Proceso", "Finalizado"]),
    skills: z.optional(
        z.array(
            z.string({
                invalid_type_error: 'Habilidad/es Invalida'
            })
                .trim()
                .min(1, 'Habilidades Invalidas')
        )
            .min(3, "Debes colocar un minimo de tres habilidades"),
    )
})

export const validateUpdateSkills = z.object({
    skills:
        z.array(
            z.string({
                invalid_type_error: 'Habilidad/es Invalida'
            })
                .trim()
                .min(1, 'Habilidad/es Invalidas')
        )
            .min(3, "Debes colocar un minimo de tres habilidades"),
})

export const validateFeedback = z.object({
    subject:
        z.string({
            invalid_type_error: "Asunto invalido"
        })
            .trim()
            .min(1, "El asunto es invalido"),
    body:
        z.string({
            invalid_type_error: "Contendio invalido"
        })
            .trim()
            .min(1, "Contenido invalido")
})