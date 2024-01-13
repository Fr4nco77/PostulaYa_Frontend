"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Errors } from "@/lib/definitions";
import { useToast } from "../ui/use-toast";
import { HTMLAttributes, useCallback, useState } from "react";
import { sendFeedback } from "@/lib/actions/user";
import ErrorMessage from "../ui/error-message";
import { ButtonSubmit } from "../ui/button-submit";
import { cn } from "@/lib/utils";

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  token: string;
}

export default function Form({ className, token, ...props }: FormProps) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors>({});

  const handleCreate = useCallback(async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());
    const { errors, success, data } = await sendFeedback({
      token,
      rawFormData,
    });
    setErrors(errors);

    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }

    toast({ description: data.message });
  }, []);

  return (
    <form
      action={handleCreate}
      className={cn("flex flex-col items-center justify-center gap-1", className)}
      {...props}
    >
      <div className="w-full">
        <Label htmlFor="subject">Asunto</Label>
        <Input id="subject" name="subject" placeholder="Gracias" />
      </div>
      <ErrorMessage errors={errors.subject} errorKey="subject" />
      <div className="w-full">
        <Label htmlFor="body">Contenido</Label>
        <Textarea
          id="body"
          name="body"
          placeholder="Gracias a ustedes potencie mi busqueda laboral y encontre el trabajo que neesitaba"
        />
      </div>
      <ErrorMessage errors={errors.body} errorKey="body" />
      <ButtonSubmit className="w-full">Enviar</ButtonSubmit>
    </form>
  );
}
