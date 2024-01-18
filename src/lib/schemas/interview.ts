import { z } from "zod";

export const validateCreate = z.object({
    application:
        z.string({
            invalid_type_error: "Aplicacion Invalida"
        })
            .trim()
            .min(1, "Aplicacion Invalida"),
    position:
        z.string({
            invalid_type_error: "Posicion Invalida"
        })
            .trim()
            .min(1, "Posicion Invalida"),
    company:
        z.string({
            invalid_type_error: "Empresa Invalida"
        })
            .trim()
            .min(1, "Empresa Invalida"),
    interviewer:
        z.string({
            invalid_type_error: "Entrevistador Invalido"
        })
            .trim()
            .min(1, "Entrevistador"),
    duration:
        z.custom((value) => {
            const number = Number(value);
            if (isNaN(number) || number < 1) {
                return { message: "Duracion Invalida" };
            }

            return true
        })
            .transform(value => `${value} Min`),
    preparation:
        z.optional(
            z.string({
                invalid_type_error: "Preparacion Invalida"
            })
                .trim()
                .min(1, "Preparacion Invalida")
        ),
    feeling:
        z.enum(["Inseguro", "Preocupado", "Neutral", "Confiado", "Muy motivado"]),
    feedback:
        z.optional(
            z.string({
                invalid_type_error: "Feedback Invalido"
            })
                .trim()
                .min(1, "Feedback Invalido")
        ),
    observation:
        z.optional(
            z.string({
                invalid_type_error: "Observacion Invalida"
            })
                .trim()
                .min(1, "Observacion Invalida")
        ),
    questions:
        z.array(
            z.string({
                invalid_type_error: "Pregunta Invalida"
            })
                .trim()
                .min(1, "Pregunta Invalida")
        )
            .min(3, "Por lo menos debes registrar tres preguntas y respuestas"),
    answers:
        z.array(
            z.string({
                invalid_type_error: "Respuesta Invalida"
            })
                .trim()
                .min(1, "Respuesta Invalida")
        )
            .min(3, "Por lo menos debes registrar tres preguntas y respuestas"),
})
