"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import Cookies from "js-cookie";
import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export default function Item({ className, ...props }: ButtonProps) {
  const router = useRouter();

  return (
    <button
      className={className}
      onClick={() => {
        Cookies.remove("authorization");
        router.push("/sign_in");
      }}
      {...props}
    >
      <li className="group relative flex cursor-pointer items-center rounded-md px-3 py-2 font-medium text-[rgb(8,11,28)] transition-colors hover:bg-[rgb(8,11,28)] hover:text-yellow-400">
        <ArrowRight className="md:hidden" />
        <ArrowUp className="hidden md:max-lg:block" />
        <ArrowLeft className="hidden lg:block" />
        <div className="ml-6 md:hidden">Salir</div>
        <div
          className="invisible absolute left-full z-10 ml-6 hidden -translate-x-3 rounded-md
            bg-[rgb(8,11,28)] px-2 py-1
            text-sm text-yellow-400 opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 lg:block"
        >
          Salir
        </div>
      </li>
    </button>
  );
}
