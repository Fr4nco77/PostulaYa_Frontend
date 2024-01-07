"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Errors } from "@/lib/definitions";
import { useToast } from "../ui/use-toast";
import { useCallback, useState } from "react";
import { sendFeedback } from "@/lib/actions";
import ErrorMessage from "../ui/error-message";

export default function Form({ token }: { token: string }) {
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
    <div className="flex h-full w-1/2 items-center justify-center">
      <form action={handleCreate}>
        <div>
          <Label htmlFor="subject">Asunto</Label>
          <Input id="subject" name="subject" placeholder="Gracias" />
        </div>
        <ErrorMessage errors={errors.subject} errorKey="subject" />
        <div>
          <Label htmlFor="body">Contenido</Label>
          <Textarea
            id="body"
            name="body"
            placeholder="Gracias a ustedes potencie mi busqueda laboral y encontre el trabajo que neesitaba"
          />
        </div>
        <ErrorMessage errors={errors.body} errorKey="body" />
        <Button type="submit"></Button>
      </form>
    </div>
  );
}
