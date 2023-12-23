"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useCallback, useState } from "react";
import Link from "next/link";
import { Errors, UserCredentials } from "@/lib/definitions";
import { loginUser } from "@/lib/actions";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import ErrorMessage from "../ui/error-message";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Form({ className, ...props }: FormProps) {
  const router = useRouter();
  const { toast } = useToast();

  //Estados del formulario
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  //Manejador de cambios de los inputs
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  //Manejador de submit del formulario
  const handleSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      //Ejecuto "loginUser" para validar los datos provistos por el usuario y logearlo finalmente
      const { errors, success, data } = await loginUser(credentials);
      setErrors(errors);
      setIsLoading(false);

      //Dependiendo de el resultado de exito/error de lo anterior manejo la ui
      if (!success) {
        return toast({
          variant: "destructive",
          title: data.name,
          description: data.message,
        });
      }

      toast({ description: data.message });
      setCredentials({
        email: "",
        password: "",
      });

      //En caso de exito guardo la informacion provista en el localStorage
      const { token, name, email, image } = data.response;
      localStorage.setItem("authorization", token);
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_image", image);
      setTimeout(() => router.push("/app"), 1000);
    },
    [credentials],
  );

  return (
    <div className={cn(className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className={errors?.email && "text-red-500"}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.dev"
              aria-describedby="email-error"
              className={errors?.email && "border-red-500"}
              value={credentials.email}
              onChange={handleChange}
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
                aria-describedby="password-error"
                type={showPassword ? "text" : "password"}
                className={errors?.password && "border-red-500"}
                value={credentials.password}
                onChange={handleChange}
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
          <div className="flex items-end justify-end">
            <Link href="/auth/forgot_password">
              <strong className="text-sm underline">
                Olvidé mi contraseña
              </strong>
            </Link>
          </div>
          <Button
            disabled={isLoading}
            className="bg-yellow-400 text-black hover:bg-yellow-300"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Ingresar
          </Button>
        </div>
      </form>
    </div>
  );
}
