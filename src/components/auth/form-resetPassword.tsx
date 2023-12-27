"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Errors } from "@/lib/definitions";
import { resetPassword } from "@/lib/actions";
import ErrorMessage from "../ui/error-message";
import { useToast } from "../ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Form({ className, ...props }: FormProps) {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const { toast } = useToast();

  //Estados del formulario
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  //Manejador del submit del formulario (server action)
  const handleSubmit = useCallback(async (formData: FormData) => {
    const { password, checkPassword } = Object.fromEntries(formData.entries());
    setIsLoading(true);

    //verifica que alla token y que las contraseñas coincidan
    if (!token) return router.push("/auth/sign_in");
    if (password !== checkPassword) {
      setIsLoading(false);
      return toast({
        variant: "destructive",
        description: "Las contraseñas no coinciden",
      });
    }

    //Se utiliza resetPassword para verificar la data y finalmente restablecer la contraseña
    const { errors, success, data } = await resetPassword({ token, password });
    setErrors(errors);
    setIsLoading(false);

    //Dependiendo del resultado anterior se modifica la ui
    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }
    toast({ description: data.message });
    router.push("/auth/sign_in");
  }, []);
  return (
    <div className={cn(className)} {...props}>
      <form action={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Nueva Contraseña</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••••••"
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="checkPassword">Confirmar contraseña</Label>
            <div className="flex w-full items-center space-x-2">
              <Input
                id="checkPassword"
                name="checkPassword"
                placeholder="••••••••••••"
                aria-describedby="password-error"
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                size="icon"
                variant="outline"
                className="border-slate-600"
                disabled={isLoading}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
            <ErrorMessage errors={errors?.password} errorKey="password" />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-400 text-black hover:bg-yellow-300"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
}
