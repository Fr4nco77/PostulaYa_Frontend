"use client";

import { useRouter } from "next/navigation";
import { configCookies } from "@/lib/utils";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import GoogleLogo from "./GoogleLogo";
import Cookies from "js-cookie";

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
          variant: "warning",
          description: data.message,
        });
        //En caso de exito seteo las cookies
        const { token, name, email, image } = data.response;

        const config = configCookies();
        Cookies.set("authorization", token, config);
        Cookies.set("_username", name, config);
        Cookies.set("_email", email, config);
        Cookies.set("_image", image, config);
        setTimeout(() => router.push("/app"), 1000);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error Interno",
          description:
            "Si el problema persiste, comunícate con el administrador.",
        });
      }
    },
    flow: "auth-code",
  });

  return (
    <div className={className} {...props}>
      <Button
        variant="outline"
        type="button"
        className="w-full border-slate-600 hover:bg-slate-900 hover:text-yellow-400"
        onClick={googleLogin}
      >
        <GoogleLogo />
        <span className="ml-2">Continua con Google</span>
      </Button>
    </div>
  );
}
