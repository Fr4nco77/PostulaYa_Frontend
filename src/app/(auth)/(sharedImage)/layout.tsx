import Image from "next/image";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      <section className="relative hidden h-full w-1/2 lg:block">
        <Image
          src="/sign_in.svg"
          alt="Sign up page"
          width={undefined}
          height={undefined}
          priority={true}
          fill={true}
          className="object-cover object-right"
        />
      </section>
      <main className="flex h-full w-full items-center justify-center lg:w-1/2">
        {children}
      </main>
    </div>
  );
}
