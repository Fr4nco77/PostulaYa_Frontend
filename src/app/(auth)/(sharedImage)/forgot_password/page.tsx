import Form from "@/components/auth/form-forgotPassword";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Restablecer Contraseña",
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
          })} hover:bg-slate-200`}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver
        </Link>
        <Image
          src="/Logo_borderBlack.svg"
          alt="logo PostulaYa"
          width={0}
          height={0}
          priority={true}
          className="mb-1 h-auto w-4/6 lg:hidden"
        />
        <h1 className="mt-3 text-4xl font-bold">Recuperar Contraseña</h1>
        <p>
          Escribí tu email para que te enviemos un correo para restablecer tu
          contraseña.
        </p>
      </div>
      <Form />
    </div>
  );
}
