"use client";

import { useCallback, useState } from "react";
import ErrorMessage from "../ui/error-message";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "../ui/use-toast";
import { createUser } from "@/lib/actions/user";
import { Errors } from "@/lib/definitions";
import { ButtonSubmit } from "../ui/button-submit";

export default function Form() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  // Manejador de envío del formulario
  const handleSubmit = useCallback(async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());

    //Envio los datos para su verificacion y posteriormente registrar al usuario
    const { errors, success, data } = await createUser(rawFormData);
    setErrors(errors);

    //Manejo la ui dependiendo del resultado de la solicitud
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
    <form className="my-5 grid w-full gap-4" action={handleSubmit}>
      <div className="grid gap-2">
        <Label
          htmlFor="username"
          className={errors?.username && "text-red-500"}
        >
          Nombre
        </Label>
        <Input
          id="username"
          name="username"
          placeholder="John Doe"
          aria-describedby="username-error"
          className={errors?.username && "border-red-500"}
        />
        <ErrorMessage errors={errors?.username} errorKey="username" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className={errors?.email && "text-red-500"}>
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="john@example.dev"
          type="email"
          aria-describedby="email-error"
          className={errors?.email && "border-red-500"}
        />
        <ErrorMessage errors={errors?.email} errorKey="email" />
      </div>
      <div className="grid gap-2">
        <Label
          htmlFor="password"
          className={errors?.password && "text-red-500"}
        >
          Contraseña
        </Label>
        <div className="flex w-full items-center space-x-2">
          <Input
            id="password"
            name="password"
            placeholder="••••••••••••"
            type={showPassword ? "text" : "password"}
            aria-describedby="password-error"
            className={errors?.password && "border-red-500"}
          />
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="border-slate-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </Button>
        </div>
        <ErrorMessage errorKey="password" errors={errors?.password} />
      </div>
      <ButtonSubmit>Resgistrarme</ButtonSubmit>
    </form>
  );
}
