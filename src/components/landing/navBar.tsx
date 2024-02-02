import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { buttonVariants } from "../ui/button";
import MobilMenu from "./menu";

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {}

export default function NavBar({ className, ...props }: NavBarProps) {
  return (
    <nav
      className={cn("flex items-end justify-between px-6 py-4", className)}
      {...props}
    >
      <Image
        src="Logo.svg"
        alt="PostulaYa"
        width={157.61}
        height={0}
        priority={true}
        className="h-auto"
      />
      <MobilMenu />
      <ul className="hidden list-none items-center gap-6 text-sm font-semibold lg:flex">
        <Link
          href="/#¿PostulaYa?"
          className="group relative inline-block cursor-pointer text-slate-700 transition-colors duration-300 hover:text-slate-900"
        >
          <li className="relative">
            ¿PostulaYa?
            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-bottom scale-x-0 transform bg-slate-900 transition-transform duration-300 group-hover:scale-x-100"></span>
          </li>
        </Link>
        <Link
          href="/#Caracteristicas"
          className="group relative inline-block cursor-pointer text-slate-700 transition-colors duration-300 hover:text-slate-900"
        >
          <li className="relative">
            Caracteristicas
            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-bottom scale-x-0 transform bg-slate-900 transition-transform duration-300 group-hover:scale-x-100"></span>
          </li>
        </Link>
      </ul>
      <div className="hidden items-end gap-3 lg:flex">
        <Link
          href="/sign_in"
          className="group relative inline-block cursor-pointer text-slate-700 transition-colors duration-300 hover:text-slate-900"
        >
          <span className="relative text-sm font-semibold">
            Ingresar
            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-bottom scale-x-0 transform bg-slate-900 transition-transform duration-300 group-hover:scale-x-100"></span>
          </span>
        </Link>
        <Link
          href="/sign_up"
          className={buttonVariants({
            className:
              "h-6 bg-yellow-400 text-slate-900 hover:bg-slate-900 hover:text-yellow-400",
          })}
        >
          Registrarse
        </Link>
      </div>
    </nav>
  );
}
