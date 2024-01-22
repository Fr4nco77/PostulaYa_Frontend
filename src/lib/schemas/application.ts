import { z } from "zod";

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
