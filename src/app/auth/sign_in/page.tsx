import GoogleButton from "@/components/auth/GoogleButton";
import Form from "@/components/auth/form-signIn";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Inicio de Sesion",
};

export default function SingIn() {
  return (
    <div className="flex h-screen w-screen">
      <section className="hidden h-full w-1/2 bg-yellow-500 lg:block">
        <div className="flex h-full w-full items-center justify-center">
          <span>
            <strong>Diseño Pendiente</strong>
          </span>
        </div>
      </section>
      <main className="flex h-full w-full items-center justify-center lg:w-1/2">
        <div className="flex w-full max-w-md flex-col items-center justify-center p-10 lg:max-w-lg">
          <div className="w-full ">
            <Image
              src="/amarillopng.png"
              width={200}
              height={50}
              alt="PostulaYa Logo"
            />
            <h1 className="mt-3 text-4xl ">
              <strong>Hello again 👋</strong>
            </h1>
            <span>Let's continue from where you left off 💪</span>
          </div>
          <GoogleButton className="my-5 w-full" />
          <Separator />
          <Suspense fallback={<span>Loading Form</span>}>
            <Form className="my-5 w-full" />
          </Suspense>
          <div className="w-full  ">
            <span>
              Don't have an account?{" "}
              <Link href="/auth/sign_up">
                <strong className="underline">Sign up</strong>
              </Link>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
