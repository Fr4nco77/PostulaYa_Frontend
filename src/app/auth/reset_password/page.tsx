import Form from "@/components/auth/form_resetPassword";
import { Suspense } from "react";

export default function ResetPassword() {
  return (
    <div className="h-screen w-screen">
      <main className="flex h-full w-full items-center justify-center">
        <div className="flex h-full w-full max-w-md flex-col items-center justify-center p-10 lg:max-w-lg">
          <header className="w-full">
            <h1 className="mt-3 text-4xl font-bold">Restore password</h1>
          </header>
          <Suspense>
            <Form className="my-6 w-full" />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
