import GoogleButton from "@/components/auth/GoogleButton";
import Form from "@/components/auth/form-signIn";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inicio de Sesión",
  description:
    "Inicia sesión en PostulaYa para acceder a oportunidades laborales, organizar tu búsqueda de empleo y avanzar en tu carrera. ¡Bienvenido de nuevo a tu camino hacia el éxito profesional!",
};

export default function SingIn() {
  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center p-10 lg:max-w-lg">
      <header className="w-full">{/* Agregar mb-4 al div cuando termine el proceso de verificacion de google */}
        <Link href="/">
          <Image
            src="/Logo.svg"
            alt="Logo dePostulaYa"
            width={172.5}
            height={52.5}
            priority={true}
          />
        </Link>
        <h1 className="mt-3 text-4xl ">
          <strong>¡Hola de nuevo! 👋</strong>
        </h1>
      </header>
      {/* <GoogleButton className="my-5 w-full" />
      <Separator /> */}
      <Form />
      <div className="w-full text-center">
        <span>
          ¿Aún no tienes una cuenta?{" "}
          <Link
            href="/sign_up"
            className="group relative inline-block cursor-pointer text-slate-900"
          >
            <strong className="relative">
              Regístrate aquí
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-bottom scale-x-0 transform bg-slate-900 transition-transform duration-300 group-hover:scale-x-100"></span>
            </strong>
          </Link>
        </span>
      </div>
    </div>
  );
}
