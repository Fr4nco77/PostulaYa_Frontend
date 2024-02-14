import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "No encontrada"
}

export default function NotFound() {
  return (
    <main className="flex w-full max-w-xl grow flex-col items-center justify-center gap-2 rounded-lg bg-slate-50 p-5 shadow-md text-center">
      <div className="flex w-full items-center justify-start">
        <Link
          href="/app/book"
          className={`${buttonVariants({
            variant: "ghost",
          })} rounded-lg transition duration-300 hover:bg-slate-200`}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver
        </Link>
      </div>
      <h1 className="text-4xl font-black text-slate-900">Postulación no encontrada</h1>
      <span className="p-3 font-medium text-lg text-gray-500">
        Estamos trabajando para encontrarla. Mientras tanto, explora otras
        oportunidades interesantes.
      </span>
    </main>
  );
}
