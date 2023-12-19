import Form from "@/components/auth/form-forgotPassword";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
title: "Restablecer Contraseña"
}
export default function ForgotPassword() {
  return (
    <div className="h-screen w-screen">
      <main className="flex h-full w-full items-center justify-center">
        <div className="flex h-full w-full max-w-md flex-col items-center justify-center p-10 lg:max-w-lg">
          <div className="w-full">
            <Link
              href="/auth/sign_in"
              className={`${buttonVariants({ variant: "ghost", size: "sm" })} hover:bg-slate-200`}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Go back

            </Link>
            <h1 className="mt-3 text-4xl font-bold">Reset password</h1>
            <p>
              Include the email address associated with your account and we’ll
              send you an email with instructions to reset your password.
            </p>
          </div>
          <Suspense>
            <Form className="my-6 w-full" />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
