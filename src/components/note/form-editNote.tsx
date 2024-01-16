"use client";

import { ButtonSubmit } from "@/components/ui/button-submit";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { updateNote } from "@/lib/actions/note";
import { Errors, Note } from "@/lib/definitions";
import { useState } from "react";

interface FormProps extends Note {
  token: string;
}

export default function Form({ _id, token, title, body }: FormProps) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors>({});

  const handleEdit = async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());

    const { errors, success, data } = await updateNote({
      _id,
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

    toast({ variant: "warning", description: data.message });
  };

  return (
    <form action={handleEdit} className="flex flex-col gap-2 ">
      <div className="h-auto w-full">
        <Label htmlFor="title" hidden>
          Titulo
        </Label>
        <Input id="title" name="title" defaultValue={title} />
        <ErrorMessage errors={errors.title} errorKey="title" />
      </div>
      <div className="h-auto w-full">
        <Label htmlFor="body" hidden>
          Nota
        </Label>
        <Textarea id="body" name="body" defaultValue={body} />
        <ErrorMessage errors={errors.body} errorKey="body" />
      </div>
      <ButtonSubmit>Guardar Cambios</ButtonSubmit>
    </form>
  );
}
