"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCallback, useState } from "react";
import { Errors } from "@/lib/definitions";
import { useToast } from "../ui/use-toast";
import ErrorMessage from "../ui/error-message";
import { sendResetEmail } from "@/lib/actions/user";
import { ButtonSubmit } from "../ui/button-submit";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Form({ className, ...props }: FormProps) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors>({});

  //Manejador del submit del formulario
  const handleSubmit = useCallback(async (formData: FormData) => {
    const email = formData.get("email");

    //se ejecuta sendResetEmail para validar la informacion y enviar el email de restablecimiento
    const { errors, success, data } = await sendResetEmail(email);
    setErrors(errors);

    //Dependiendo del resultado anterior se maneja la ui
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
    <div className={className} {...props}>
      <form action={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className={errors?.email && "text-red-500"}>
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="john@example.dev"
              aria-describedby="email-error"
              className={errors?.email && "border-red-500"}
            />
          </div>
          <ErrorMessage errors={errors?.email} errorKey="email" />
          <ButtonSubmit>Enviar</ButtonSubmit>
        </div>
      </form>
    </div>
  );
}
