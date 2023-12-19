import GoogleButton from "@/components/auth/GoogleButton";
import Form from "@/components/auth/form_signUp";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function SignUp() {
  return (
    <div className="flex h-screen w-screen">
      <main className="flex h-full w-full items-center justify-center lg:w-1/2">
        <div className="flex w-full max-w-md flex-col items-center justify-center p-10 lg:max-w-lg">
          <div className="w-full">
            <Image
              src="/amarillopng.png"
              width={200}
              height={50}
              alt="PostulaYa Logo"
            />
            <h1 className="mt-3 text-4xl ">
              <strong>Create account</strong>
            </h1>
            <span>it's time to adventure</span>
          </div>
          <GoogleButton className=" my-5 w-full" />
          <Separator />
          <Suspense fallback={<span>Loading Form</span>}>
            <Form className="my-5 w-full" />
          </Suspense>
          <div className=" w-full">
            <span>
              Already have an account?{" "}
              <Link href="/auth/sign_in">
                <strong className="underline">Sign In</strong>
              </Link>
            </span>
          </div>
        </div>
      </main>
      <section className="hidden h-full w-1/2 bg-yellow-500 lg:block">
        <div className="flex h-full w-full items-center justify-center">
          <span>
            <strong>Diseño Pendiente</strong>
          </span>
        </div>
      </section>
    </div>
  );
}
