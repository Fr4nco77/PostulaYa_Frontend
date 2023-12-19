"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ChangeEvent, useCallback, useState } from "react";
import { Errors, Passwords } from "@/lib/definitions";
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
  const [reset, setReset] = useState<Passwords>({
    password: "",
    checkPassword: "",
  });

  //Manejador de cambios de los inputs
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setReset((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  //Manejador del submit del formulario
  const handleSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      
      //se verifica que alla token para evitar problemas
      if (!token) return router.push("/auth/sign_in");

      //Se utiliza resetPassword para verificar la data y finalmente restablecer la contraseña
      const { errors, success, data } = await resetPassword({
        token,
        password: reset.password,
      });
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

      setReset({
        password: "",
        checkPassword: "",
      });
      toast({ description: data.message });
      router.push("/auth/sign_in");
    },
    [reset],
  );
  return (
    <div className={cn(className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Nueva Contraseña</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••••••"
              value={reset.password}
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
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
                value={reset.checkPassword}
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                onChange={handleChange}
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
            disabled={
              reset.password !== reset.checkPassword || isLoading ? true : false
            }
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
