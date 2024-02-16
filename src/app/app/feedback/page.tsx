import Form from "@/components/feedback/form";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Apóyanos",
  description:
    "Apóyanos en nuestra misión para ofrecerte la mejor experiencia de búsqueda laboral. Comparte tus valiosos comentarios, ideas y sugerencias a través de nuestro formulario. En PostulaYa, valoramos tu opinión y nos esforzamos por evolucionar continuamente para satisfacer tus necesidades profesionales.",
};

export default function Feedback() {
  const token = cookies().get("authorization")?.value!;
  return (
    <main className="flex w-full flex-col items-start gap-5 md:flex-row lg:max-w-3xl xl:max-w-4xl">
      <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-5 shadow-md">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Apóyanos
          </h1>
          <p className="mt-3 text-lg leading-relaxed font-medium text-gray-500">
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
        src="/feedback.webp"
        alt="¿Interesado en patrocinar el éxito de nuestra comunidad? Contáctanos en postulaya@outlook.com"
        width={383}
        height={575}
        priority
        className="rounded-lg"
      />
    </main>
  );
}
