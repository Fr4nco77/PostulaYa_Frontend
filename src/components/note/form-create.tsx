"use client";

import { ButtonSubmit } from "@/components/ui/button-submit";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createNote } from "@/lib/actions/note";
import { Errors } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useCallback, useState } from "react";

interface FormCreateNoteProps extends HTMLAttributes<HTMLFormElement> {
  token: string;
}

export default function FormCreateNote({
  className,
  token,
  ...props
}: FormCreateNoteProps) {
  const [errors, setErrors] = useState<Errors>({});
  const { toast } = useToast();

  const handleCreate = useCallback(async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());

    const { errors, success, data } = await createNote({ token, rawFormData });
    setErrors(errors);

    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }

    toast({ variant: "warning", description: data.message });
  }, []);

  return (
    <form
      action={handleCreate}
      className={cn("flex flex-col gap-2 ", className)}
      {...props}
    >
      <div className="h-auto w-full">
        <Label htmlFor="title" hidden>
          Titulo
        </Label>
        <Input id="title" name="title" placeholder="Recomendaciones de RRHH" />
        <ErrorMessage errors={errors.title} errorKey="Titulo" />
      </div>
      <div className="h-auto w-full">
        <Label htmlFor="body" hidden>
          Nota
        </Label>
        <Textarea
          id="body"
          name="body"
          placeholder="Nota"
          className="resize-none"
        />
        <ErrorMessage errors={errors.body} errorKey="body" />
      </div>
      <ButtonSubmit>Agregar Nota</ButtonSubmit>
    </form>
  );
}
