import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Rocket } from "lucide-react";
import Form from "./form-feedback";

export default async function ButtonFeedback({ token }: { token: string }) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <li className="group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium text-[rgb(8,11,28)] transition-colors hover:bg-[rgb(8,11,28)] hover:text-yellow-400">
          <Rocket />
          <div
            className="invisible absolute left-full z-10 ml-6 hidden -translate-x-3 rounded-md
              bg-[rgb(8,11,28)] px-2 py-1
              text-sm text-yellow-400 opacity-20 transition-all
              group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 lg:block"
          >
            Sugerencias
          </div>
        </li>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sugerencias</SheetTitle>
          <SheetDescription>
            El objetivo de PostulaYa es convertirse en la herramienta definitiva
            para medir el progreso de tu búsqueda laboral y, sobre todo,
            ayudarte a conseguir ese trabajo que tanto deseas. 🚀
            <br /> Nos encantaría escucharte: si necesitas algo, encuentras
            algún inconveniente o simplemente quieres saludarnos, estamos aquí
            para ti. 😊 <br />
          </SheetDescription>
        </SheetHeader>
        <Form token={token} className="mt-3 w-full" />
      </SheetContent>
    </Sheet>
  );
}
