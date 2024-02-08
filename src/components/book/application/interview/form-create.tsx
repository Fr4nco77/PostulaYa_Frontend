"use client";

import { HTMLAttributes, useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Errors } from "@/lib/definitions";
import ErrorMessage from "@/components/ui/error-message";
import { ButtonSubmit } from "@/components/ui/button-submit";
import { Textarea } from "@/components/ui/textarea";
import { createInterview } from "@/lib/actions/interview";
import Questions_Answers from "./questions&answers";

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  token: string;
  application: string;
  position: string;
  company: string;
}

export default function FormCreateInterview({
  className,
  token,
  application,
  position,
  company,
  ...props
}: FormProps) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = useCallback(async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());

    const { errors, success, data } = await createInterview({
      token,
      rawFormData,
      application,
    });
    setErrors(errors);

    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }

    toast({
      variant: "warning",
      title: data.message,
    });
  }, []);

  return (
    <form action={handleSubmit} className="grid gap-4 py-4" {...props}>
      <input type="text" hidden name="application" defaultValue={application} />
      <input type="text" hidden name="position" defaultValue={position} />
      <input type="text" hidden name="company" defaultValue={company} />
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="interviewer"
          className={`text-right ${errors?.interviewer && "text-red-500"}`}
        >
          Entrevistador
        </Label>
        <Input
          id="interviewer"
          name="interviewer"
          placeholder="Mary Doe"
          className={`col-span-3 ${errors?.interviewer && "border-red-500"}`}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="duration"
          className={`text-right ${errors?.duration && "text-red-500"}`}
        >
          {"Duración (en minutos)"}
        </Label>
        <Input
          id="duration"
          name="duration"
          type="number"
          placeholder="40"
          className={`col-span-3 ${errors?.duration && "border-red-500"}`}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="feeling"
          className={`text-right ${errors?.feeling && "text-red-500"}`}
        >
          Sentimiento
        </Label>
        <div id="feeling" className="col-span-3">
          <Select name="feeling">
            <SelectTrigger>
              <SelectValue placeholder="¿Cómo te sentias?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inseguro">Inseguro</SelectItem>
              <SelectItem value="Preocupado">Preocupado</SelectItem>
              <SelectItem value="Neutral">Neutral</SelectItem>
              <SelectItem value="Confiado">Confiado</SelectItem>
              <SelectItem value="Muy motivado">Muy motivado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="preparation"
          className={`text-right ${errors?.preparation && "text-red-500"}`}
        >
          {"Preparación (Opcional)"}
        </Label>
        <Textarea
          id="preparation"
          name="preparation"
          placeholder="He enfocado mi tiempo en destacar mi experiencia relevante, resaltar mis logros profesionales y afinar mi capacidad para comunicar mis habilidades"
          className={`col-span-3 resize-none ${errors?.preparation && "border-red-500"}`}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="feedback"
          className={`text-right ${errors?.feedback && "text-red-500"}`}
        >
          {"Feedback (Opcional)"}
        </Label>
        <Textarea
          id="feedback"
          name="feedback"
          placeholder="Tu desempeño durante la entrevista fue impresionante. Destacaron especialmente tu habilidad para comunicar tus logros de manera clara y efectiva, así como tu enfoque proactivo para abordar los desafíos"
          className={`col-span-3 resize-none ${errors?.feedback && "border-red-500"}`}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="observation"
          className={`text-right ${errors?.observation && "text-red-500"}`}
        >
          {"Observaciones (Opcional)"}
        </Label>
        <Textarea
          id="observation"
          name="observation"
          placeholder="En algunos momentos, podría haber proporcionado ejemplos más específicos para respaldar mis experiencias y habilidades."
          className={`col-span-3 resize-none ${errors?.observation && "border-red-500"}`}
        />
      </div>
      <Questions_Answers />
      <ErrorMessage errors={errors?.questions} errorKey="questions" />
      <ButtonSubmit>Agregar</ButtonSubmit>
    </form>
  );
}
