import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default async function MobilMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Image
              src="Logo.svg"
              alt="PostulaYa"
              width={157.61}
              height={47.99}
              priority={true}
            />
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-6 py-6">
          <Link
            href="/#¿PostulaYa?"
            aria-label="Ir a la sección ¿PostulaYa?"
            className="group relative inline-block cursor-pointer text-slate-700 transition-colors duration-300 hover:text-slate-900"
          >
            <li className="relative">
              ¿PostulaYa?
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-bottom scale-x-0 transform bg-slate-900 transition-transform duration-300 group-hover:scale-x-100"></span>
            </li>
          </Link>
          <Link
            href="/#Caracteristicas"
            aria-label="Ir a la sección Características"
            className="group relative inline-block cursor-pointer text-slate-700 transition-colors duration-300 hover:text-slate-900"
          >
            <li className="relative">
              Caracteristicas
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-bottom scale-x-0 transform bg-slate-900 transition-transform duration-300 group-hover:scale-x-100"></span>
            </li>
          </Link>
        </ul>
        <div className="flex flex-col gap-3">
          <Link
            href="/sign_in"
            aria-label="Iniciar sesión en PostulaYa"
            className={buttonVariants({
              className: "transition duration-300 hover:text-yellow-400",
            })}
          >
            Ingresar
          </Link>
          <Link
            href="/sign_up"
            aria-label="Registrarse en PostulaYa"
            className={buttonVariants({
              className:
                "bg-yellow-400 text-slate-900 transition duration-300 hover:bg-slate-900 hover:text-yellow-400",
            })}
          >
            Registrarse
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
