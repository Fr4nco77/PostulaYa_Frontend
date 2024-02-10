import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Postulación no encontrada"
}

export default function NotFound() {
  return (
    <main className="flex w-full max-w-lg grow flex-col items-center justify-center gap-2 rounded-lg bg-slate-100 p-3 shadow-xl">
      <div className="flex w-full items-center justify-start">
        <Link
          href="/app/book"
          className={`${buttonVariants({
            variant: "ghost",
            size: "sm",
          })} rounded-lg transition duration-300 hover:bg-slate-900 hover:text-yellow-400`}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver
        </Link>
      </div>
      <h1 className="text-4xl font-black text-slate-900">Postulación no encontrada</h1>
      <span className="p-3">
        Estamos trabajando para encontrarla. Mientras tanto, explora otras
        oportunidades interesantes.
      </span>
    </main>
  );
}
