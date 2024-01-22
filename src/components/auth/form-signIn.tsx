"use client";

import { configCookies } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useState } from "react";
import Link from "next/link";
import { Errors } from "@/lib/definitions";
import { loginUser } from "@/lib/actions/user";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import ErrorMessage from "../ui/error-message";
import Cookies from "js-cookie";
import { ButtonSubmit } from "../ui/button-submit";

export default function Form() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  //Manejador de submit del formulario
  const handleSubmit = useCallback(async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());

    //Ejecuto "loginUser" para validar los datos provistos por el usuario y logearlo finalmente
    const { errors, success, data } = await loginUser(rawFormData);
    setErrors(errors);

    //Dependiendo de el resultado de exito/error de lo anterior manejo la ui
    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }
    toast({ variant: "warning", description: data.message });

    //En caso de exito guardo la informacion provista en cookies
    const config = configCookies();
    const { token, image } = data.response;
    Cookies.set("authorization", token, config);
    Cookies.set("_image", image, config);
    setTimeout(() => router.push("/app"), 1000);
  }, []);

  return (
    <form className="my-5 grid w-full gap-4" action={handleSubmit}>
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
          />
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            size="icon"
            variant="outline"
            className="border-slate-600"
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </Button>
        </div>
        <ErrorMessage errors={errors?.password} errorKey="password" />
      </div>
      <div className="flex items-end justify-end">
        <Link href="/forgot_password">
          <strong className="text-sm underline">Olvidé mi contraseña</strong>
        </Link>
      </div>
      <ButtonSubmit>Ingresar</ButtonSubmit>
    </form>
  );
}
