import GoogleButton from "@/components/auth/GoogleButton";
import Form from "@/components/auth/form-signIn";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inicio de Sesion",
};

export default function SingIn() {
  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center p-10 lg:max-w-lg">
      <header className="w-full ">
        <Image
          src="/Logo_borderBlack.svg"
          alt="logo PostulaYa"
          width={0}
          height={0}
          priority={true}
          className="mb-1 h-auto w-4/6 lg:hidden"
        />
        <h1 className="mt-3 text-4xl ">
          <strong>Hola de nuevo 👋</strong>
        </h1>
        <span>¡Listo para continuar! 💪</span>
      </header>
      <GoogleButton className="my-5 w-full" />
      <Separator />
      <Form className="my-5 w-full" />
      <div className="w-full">
        <span>
          ¿Aún no tienes una cuenta?{" "}
          <Link href="/sign_up">
            <strong className="underline">Regístrate aquí</strong>
          </Link>
        </span>
      </div>
    </div>
  );
}
