import GoogleButton from "@/components/auth/GoogleButton";
import Form from "@/components/auth/form-signUp";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Registro",
};

export default function SignUp() {
  return (
    <div className="flex h-screen w-screen">
      <main className="flex h-full w-full items-center justify-center lg:w-1/2">
        <div className="flex w-full max-w-md flex-col items-center justify-center p-10 lg:max-w-lg">
          <div className="w-full">
            <Image
              src="/Logo_borderBlack.svg"
              alt="logo PostulaYa"
              width={0}
              height={0}
              priority={true}
              className="mb-1 h-auto w-4/6 lg:hidden"
            />
            <h1 className="mt-3 text-4xl ">
              <strong>Crear Cuenta</strong>
            </h1>
          </div>
          <GoogleButton className="my-5 w-full" />
          <Separator />
          <Form />
          <div className="w-full">
            <span>
              ¿Ya tienes una cuenta?{" "}
              <Link href="/sign_in">
                <strong className="underline">Ingresa aquí</strong>
              </Link>
            </span>
          </div>
        </div>
      </main>
      <section className="relative hidden h-full w-1/2 lg:block">
        <Image
          src="/sign_up.svg"
          alt="Sign up page"
          width={undefined}
          height={undefined}
          priority={true}
          fill={true}
          className="object-cover object-left"
        />
      </section>
    </div>
  );
}
