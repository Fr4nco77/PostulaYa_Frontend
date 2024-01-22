import Form from "@/components/auth/form-resetPassword";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Restablecer Contraseña",
};

export default function ResetPassword() {
  return (
      <main className="flex h-screen w-screen items-center justify-center">
        <div className="flex h-full w-full max-w-md flex-col items-center justify-center p-10 lg:max-w-lg">
          <header className="w-full">
            <Image
              src="/Logo_borderBlack.svg"
              alt="logo PostulaYa"
              width={0}
              height={0}
              priority={true}
              className="mb-1 h-auto w-4/6"
            />
            <h1 className="mt-3 text-2xl font-bold">Restablecer contraseña</h1>
            <span>Ingresa tu nueva contraseña</span>
          </header>
          <Form />
        </div>
      </main>
  );
}
