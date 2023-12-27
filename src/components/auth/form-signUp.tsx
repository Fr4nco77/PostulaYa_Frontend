"use client";

import { useCallback, useState } from "react";
import ErrorMessage from "../ui/error-message";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { createUser } from "@/lib/actions";
import { Errors } from "@/lib/definitions";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Form({ className, ...props }: FormProps) {
  const { toast } = useToast();

  // Estados del formulario
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  // Manejador de envío del formulario (server action)
  const handleSubmit = useCallback(async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());
    setIsLoading(true);

    //Envio los datos para su verificacion y posteriormente registrar al usuario
    const { errors, success, data } = await createUser(rawFormData);
    setErrors(errors);
    setIsLoading(false);

    //Manejo la ui dependiendo del resultado de la solicitud
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
    <div className={cn(className)} {...props}>
      <form action={handleSubmit}>
        <div className="grid gap-4">
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
              disabled={isLoading}
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
              disabled={isLoading}
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
                disabled={isLoading}
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="border-slate-600"
                disabled={isLoading}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
            <ErrorMessage errorKey="password" errors={errors?.password} />
          </div>
          <Button
            className="bg-yellow-400 text-black hover:bg-yellow-300"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Registrarme
          </Button>
        </div>
      </form>
    </div>
  );
}
