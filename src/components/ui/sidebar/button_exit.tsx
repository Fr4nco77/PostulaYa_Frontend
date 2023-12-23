"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { SidebarContext } from "./sidebar";
import { ArrowLeft } from "lucide-react";

export default function Item() {
  const { expanded } = useContext(SidebarContext);
  const router = useRouter();

  const exit = () => {
    localStorage.clear();
    router.push("/auth/sign_in");
  };

  return (
    <button className="mt-4" onClick={exit}>
      <li className="group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium text-yellow-400 transition-colors hover:bg-yellow-400 hover:text-black">
        <ArrowLeft />
        <span
          className={`flex overflow-hidden transition-all ${
            expanded ? "ml-3 w-52" : "w-0"
          }`}
        >
          Salir
        </span>
        {!expanded && (
          <div
            className={`
            invisible absolute left-full ml-6 -translate-x-3 rounded-md
            bg-yellow-400 px-2 py-1
            text-sm text-black opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
        `}
          >
            Salir
          </div>
        )}
      </li>
    </button>
  );
}
