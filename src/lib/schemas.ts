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
            invalid_type_error: "Posición invalida"
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
    platform:
        z.enum(["Linkedin", "Indeed", "Glassdoor", "Get on Board", "Computrabajo", "Otra"]),
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

export const validateUpdateNote = z.object({
    title: z.string({
        invalid_type_error: "Titulo invalido"
    })
        .min(1, "Titulo invalido")
    ,
    body: z.string({
        invalid_type_error: "Nota invalida"
    })
        .min(1, "Nota invalida")
})

export const validateCreateNote = validateUpdateNote.extend({
    applicationID: z.string({
        invalid_type_error: "AplicationID invalido"
    })
        .min(1, "AplicationID invalido")
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