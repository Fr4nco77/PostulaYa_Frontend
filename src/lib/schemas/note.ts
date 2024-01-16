import { z } from "zod";

export const validateNote = z.object({
    title: z.string({
        invalid_type_error: "Titulo invalido"
    })
        .trim()
        .min(1, "Titulo invalido")
    ,
    body: z.string({
        invalid_type_error: "Nota invalida"
    })
        .min(1, "Nota invalida")
})
