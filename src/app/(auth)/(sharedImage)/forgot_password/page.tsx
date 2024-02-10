import Form from "@/components/auth/form-forgotPassword";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Recuperar Contraseña"
};
export default function ForgotPassword() {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center justify-center p-10 lg:max-w-lg">
      <div className="w-full">
        <Link
          href="/sign_in"
          className={`${buttonVariants({
            variant: "ghost",
            size: "sm",
          })} transition duration hover:bg-slate-200`}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver
        </Link>
        <Image
          src="/Logo.svg"
          alt="Logo de PostulaYa"
          width={172.5}
          height={52.5}
          priority={true}
          className="mb-1"
        />
        <h1 className="mt-3 text-4xl font-bold">Recuperar Contraseña</h1>
        <p>
          Ingresa tu correo electrónico para que te enviemos un mensaje para
          restablecer tu contraseña.
        </p>
      </div>
      <Form />
    </div>
  );
}
