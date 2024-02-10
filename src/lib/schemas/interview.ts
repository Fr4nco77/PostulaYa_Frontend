import { z } from "zod";

export const validateCreate = z.object({
    application:
        z.string({
            invalid_type_error: "Aplicacion inválida."
        })
            .trim()
            .min(1, "Aplicacion inválida."),
    position:
        z.string({
            invalid_type_error: "Posición inválida."
        })
            .trim()
            .min(1, "Posición inválida."),
    company:
        z.string({
            invalid_type_error: "Empresa inválida."
        })
            .trim()
            .min(1, "Empresa inválida."),
    category:
        z.string({
            invalid_type_error: "Categoria inválida."
        })
            .trim()
            .min(1, "Categoria inválida."),
    interviewer:
        z.string({
            invalid_type_error: "Entrevistador inválido."
        })
            .trim()
            .min(1, "Entrevistador inválido."),
    duration:
        z.custom((value) => {
            const number = Number(value);
            if (isNaN(number) || number < 1) {
                return { message: "Duración inválida." };
            }

            return true
        })
            .transform(value => `${value} Min`),
    preparation:
        z.optional(
            z.string({
                invalid_type_error: "Preparación inválida."
            })
                .trim()
                .min(1, "Preparación inválida.")
        ),
    feeling:
        z.enum(["Insecure", "Worried", "Neutral", "Confident", "Very motivated"]),
    feedback:
        z.optional(
            z.string({
                invalid_type_error: "Feedback inválido."
            })
                .trim()
                .min(1, "Feedback inválido.")
        ),
    observation:
        z.optional(
            z.string({
                invalid_type_error: "Observación inválida."
            })
                .trim()
                .min(1, "Observación inválida.")
        ),
    questions:
        z.array(
            z.string({
                invalid_type_error: "Pregunta inválida."
            })
                .trim()
                .min(1, "Pregunta inválida.")
        )
            .min(3, "Por lo menos debes registrar tres preguntas y respuestas."),
    answers:
        z.array(
            z.string({
                invalid_type_error: "Respuesta inválida."
            })
                .trim()
                .min(1, "Respuesta inválida.")
        )
            .min(3, "Por lo menos debes registrar tres preguntas y respuestas."),
})
