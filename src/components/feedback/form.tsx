"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Errors } from "@/lib/definitions";
import { useToast } from "../ui/use-toast";
import { useCallback, useState } from "react";
import { sendFeedback } from "@/lib/actions/user";
import { ButtonSubmit } from "../ui/button-submit";

export default function Form({ token }: { token: string }) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors>({});

  const handleCreate = useCallback(
    async (formData: FormData) => {
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

      toast({ variant: "success", title: data.message });
    },
    [toast, token],
  );

  return (
    <form
      className="mt-6 flex w-full flex-col items-center gap-3 "
      action={handleCreate}
    >
      <div className="w-full">
        <Label
          htmlFor="subject"
          className={`text-lg ${errors?.subject && "text-red-500"}`}
        >
          Asunto
        </Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Sugerencia de mejora"
          className={errors?.subject && "border-red-500"}
        />
      </div>
      <div className="w-full">
        <Label
          htmlFor="body"
          className={`text-lg ${errors?.body && "text-red-500"}`}
        >
          Contenido
        </Label>
        <Textarea
          id="body"
          name="body"
          placeholder="Comparte tus comentarios y sugerencias..."
          className={`resize-none border-slate-600 ${
            errors?.body && "border-red-500"
          }`}
        />
      </div>
      <ButtonSubmit className="w-full">Enviar</ButtonSubmit>
    </form>
  );
}
