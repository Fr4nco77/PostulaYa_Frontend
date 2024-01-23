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
      application
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
      title: data.name,
      description: data.message,
    });
  }, []);

  return (
    <form action={handleSubmit} className="grid gap-4 py-4" {...props}>
      <input type="text" hidden name="application" defaultValue={application} />
      <input type="text" hidden name="position" defaultValue={position} />
      <input type="text" hidden name="company" defaultValue={company} />
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="interviewer" className="text-right">
          Entrevistador
        </Label>
        <Input
          id="interviewer"
          name="interviewer"
          placeholder="Mary Doe"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="duration" className="text-right">
          {"Duracion (en minutos)"}
        </Label>
        <Input
          id="duration"
          name="duration"
          type="number"
          placeholder="40"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="preparation" className="text-right">
          {"Preparacion (Opcional)"}
        </Label>
        <Textarea
          id="preparation"
          name="preparation"
          placeholder="Investigar la empresa, contactar con empleados de la empresa"
          className="col-span-3 resize-none"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="feeling" className="text-right">
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
        <Label htmlFor="feedback" className="text-right">
          {"Feedback (Opcional)"}
        </Label>
        <Textarea
          id="feedback"
          name="feedback"
          placeholder="El entrevistador me dijo que..."
          className="col-span-3 resize-none"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="observation" className="text-right">
          {"Observaciones (Opcional)"}
        </Label>
        <Textarea
          id="observation"
          name="observation"
          placeholder="¿Que tal fue la entrevista?"
          className="col-span-3 resize-none"
        />
      </div>
      <Questions_Answers />
      <ErrorMessage errors={errors?.questions} errorKey="questions" />
      <ButtonSubmit>Agregar</ButtonSubmit>
    </form>
  );
}
