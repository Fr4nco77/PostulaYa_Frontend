"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import GoogleLogo from "./GoogleLogo";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function GoogleButton({ className, ...props }: ButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  // Uso el hook useGoogleLogin para manejar la autenticación con Google
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        // Envío una solicitud POST con el código de autorización para autenticar al usuario
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/user/authenticateByGoogle`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          },
        );
        const { success, data } = await response.json();

        // Manejo la respuesta del backend en caso de exito y error
        if (!success) {
          return toast({
            variant: "destructive",
            title: data.name,
            description: data.message,
          });
        }

        toast({
          description: data.message,
        });
        localStorage.setItem("authorization", data.response);
        setTimeout(() => router.push("/"), 2000);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Ha ocurrido un error",
          description:
            "Si el problema persiste, comunícate con el administrador.",
        });
      }
    },
    flow: "auth-code",
  });

  return (
    <div className={cn(className)} {...props}>
      <Button
        variant="outline"
        type="button"
        className="w-full border-slate-600"
        onClick={googleLogin}
      >
        <GoogleLogo />
        <span className="ml-2">Continua con Google</span>
      </Button>
    </div>
  );
}
