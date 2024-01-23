import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full max-w-lg grow flex-col items-center justify-center gap-2 rounded-lg bg-yellow-400 p-3 shadow-xl">
      <div className="flex w-full items-center justify-start">
        <Link
          href="/app/book"
          className={`${buttonVariants({
            variant: "ghost",
            size: "sm",
          })} rounded-3xl hover:bg-slate-900 hover:text-yellow-400`}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver
        </Link>
      </div>
      <h1 className="text-3xl font-bold">Postulación no encontrada</h1>
      <span>
        Estamos trabajando para encontrarla. Mientras tanto, explora otras
        oportunidades interesantes.
      </span>
    </div>
  );
}
