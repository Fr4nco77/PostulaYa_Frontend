import Form from "@/components/auth/form-resetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer Contraseña",
};

export default function ResetPassword() {
  return (
    <div className="h-screen w-screen">
      <main className="flex h-full w-full items-center justify-center">
        <div className="flex h-full w-full max-w-md flex-col items-center justify-center p-10 lg:max-w-lg">
          <header className="w-full">
            <h1 className="mt-3 text-4xl font-bold">Restablecer contraseña</h1>
          </header>
          <Form className="my-6 w-full" />
        </div>
      </main>
    </div>
  );
}
