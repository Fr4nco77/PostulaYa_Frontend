"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
        <ArrowLeft />
        <div className="md:hidden ml-6">
          Salir
        </div>
        <div
          className="hidden invisible absolute left-full z-10 ml-6 -translate-x-3 rounded-md
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
