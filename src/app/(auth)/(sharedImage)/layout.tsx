import Image from "next/image";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      <section className="relative hidden h-full w-6/12 lg:block">
        <Image
          src="/sign_in.jpg"
          alt="Imagen de una mujer sonriendo mientras usa la plataforma en su computadora con el mensaje 'Transformamos Aspiraciones en Éxitos' en el fondo."
          width={undefined}
          height={undefined}
          priority={true}
          fill={true}
          sizes="(max-width: full) 100vw"
          className="object-cover object-left"
        />
        <div className="absolute left-0 top-16 max-w-xs px-3 xl:left-5 xl:top-10 xl:max-w-sm xl:px-6 2xl:left-0 2xl:top-7 2xl:max-w-xs">
          <span className="text-4xl font-black tracking-tight text-slate-900 ">
            Transformamos Aspiraciones en Éxitos
          </span>
        </div>
      </section>
      <main className="flex h-full w-full items-center justify-center lg:w-6/12">
        {children}
      </main>
    </div>
  );
}
