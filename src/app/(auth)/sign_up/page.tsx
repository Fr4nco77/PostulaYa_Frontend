import GoogleButton from "@/components/auth/GoogleButton";
import Form from "@/components/auth/form-signUp";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Registro",
  description:
    "Únete a PostulaYa para optimizar tu búsqueda laboral: registra postulaciones, analiza estadísticas y organiza tu historial profesional. Accede a herramientas inteligentes, estadísticas detalladas y preparación asertiva. ¡Descubre el camino hacia tu empleo soñado con PostulaYa!",
};

export default function SignUp() {
  return (
    <div className="flex h-screen w-screen">
      <main className="flex h-full w-full items-center justify-center lg:w-1/2">
        <div className="flex w-full max-w-md flex-col items-center justify-center p-10 lg:max-w-lg">
          <div className="w-full">{/* Agregar mb-4 al div cuando termine el proceso de verificacion de google */}
            <Link href="/">
              <Image
                src="/Logo.svg"
                alt="Logo de PostulaYa"
                width={172.5}
                height={52.5}
                priority={true}
              />
            </Link>
            <h1 className="mt-3 text-4xl ">
              <strong>Crear Cuenta</strong>
            </h1>
          </div>
          {/* <GoogleButton className="my-5 w-full" />
          <Separator /> */}
          <Form />
          <div className="w-full text-center">
            <span>
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/sign_in"
                className="group relative inline-block cursor-pointer text-slate-900"
              >
                <strong className="relative">
                  Ingresa aquí
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-bottom scale-x-0 transform bg-slate-900 transition-transform duration-300 group-hover:scale-x-100"></span>
                </strong>
              </Link>
            </span>
          </div>
        </div>
      </main>
      <section className="relative hidden h-full w-1/2 lg:block">
        <Image
          src="/sign_up.webp"
          alt="Usuarios de PostulaYa interactuando y utilizando la plataforma para mejorar sus búsquedas laborales."
          width={undefined}
          height={undefined}
          priority={true}
          fill={true}
          sizes="(max-width: full) 100vw"
          className="object-cover object-left-top"
        />
        <div className="absolute bottom-11 left-0 max-w-sm px-6 xl:bottom-14 xl:max-w-md 2xl:bottom-6">
          <span className="text-4xl font-black tracking-tight text-yellow-400 2xl:text-5xl">
            Nuestros Usuarios Siguen Eligiéndonos. Descubre por Qué.
          </span>
        </div>
      </section>
    </div>
  );
}
