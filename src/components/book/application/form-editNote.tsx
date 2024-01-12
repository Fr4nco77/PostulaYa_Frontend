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

export default function Form({ _id, title, body }: Note) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors>({});

  const handleEdit = async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());

    const { errors, success, data } = await updateNote({ _id, rawFormData });
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
    <form action={handleEdit} className="grid gap-4 py-4">
      <div className="grid grid-cols-5 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Titulo
        </Label>
        <Input
          id="title"
          name="title"
          defaultValue={title}
          className="col-span-4"
        />
      </div>
      <ErrorMessage errors={errors.title} errorKey="title" />
      <div className="grid grid-cols-5 items-center gap-4">
        <Label htmlFor="body" className="text-right">
          Nota
        </Label>
        <Textarea
          id="body"
          name="body"
          defaultValue={body}
          className="col-span-4"
        />
      </div>
      <ErrorMessage errors={errors.body} errorKey="body" />
      <ButtonSubmit>Guardar Cambios</ButtonSubmit>
    </form>
  );
}
