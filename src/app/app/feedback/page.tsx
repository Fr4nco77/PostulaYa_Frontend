import Form from "@/components/feedback/form";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Apoyo",
};

export default function Feedback() {
  const token = cookies().get("authorization")?.value!;
  return (
    <main className="flex w-full flex-col items-start gap-6 md:flex-row lg:max-w-3xl xl:max-w-4xl">
      <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-100 p-3">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">
            Apóyanos
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-gray-500 sm:text-xl">
            ¡Tu opinión es crucial para nosotros en nuestro camino hacia
            convertirnos en la herramienta definitiva para tu búsqueda laboral!
            Queremos ser la plataforma que se adapta a tus necesidades y metas
            profesionales. Comparte tus comentarios, ideas y sugerencias para
            seguir mejorando juntos.
          </p>
        </div>
        <Form token={token} />
      </div>
      <Image
        src="/feedback.jpg"
        alt="Si estas interesado en patrocinarnos escribenos a postulaya@outlook.com"
        width={383}
        height={0}
        priority
        className="h-auto rounded-3xl "
      />
    </main>
  );
}
