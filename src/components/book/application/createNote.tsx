"use client";

import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createNote } from "@/lib/actions";
import { Errors } from "@/lib/definitions";
import { useState } from "react";

export default function CreateNote({
  applicationID,
}: {
  applicationID: string;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleCreate = async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());
    setIsLoading(true);

    const { errors, success, data } = await createNote({
      rawFormData,
      applicationID,
    });
    setErrors(errors);
    setIsLoading(false);

    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }

    toast({ description: data.message });
  };
  return (
    <div className="mt-3 h-1/3 w-full rounded-xl bg-black p-4 shadow-xl">
      <form
        action={handleCreate}
        className="flex h-full w-full flex-col items-center justify-center gap-2 "
      >
        <div className="h-1/4 w-full">
          <Label htmlFor="title" hidden className="text-right">
            Titulo
          </Label>
          <Input id="title" name="title" placeholder="Titulo" />
          <ErrorMessage errors={errors.title} errorKey="title" />
        </div>
        <div className="h-2/4 w-full">
          <Label htmlFor="body" hidden className="text-right">
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
        <Button
          type="submit"
          className="h-1/4 w-full  bg-yellow-400 text-black"
        >
          Agregar Nota
        </Button>
      </form>
    </div>
  );
}
