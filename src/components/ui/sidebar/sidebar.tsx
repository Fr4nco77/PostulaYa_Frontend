"use client";

import { ReactNode, createContext, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export const SidebarContext = createContext();

export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav className="absolute z-10 flex h-full flex-col border-r bg-black shadow-sm">
      <div className="flex items-center justify-between p-4 pb-2">
        <Image
          src="/amarillopng.png"
          alt="PostulaYa logo"
          width={expanded ? 120 : 0}
          height={120}
          className="overflow-hidden transition-all"
        />
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="rounded-lg bg-gray-700 p-1.5 text-yellow-400 hover:bg-yellow-400 hover:text-black"
        >
          {expanded ? <X /> : <Menu />}
        </button>
      </div>

      <SidebarContext.Provider value={{ expanded }}>
        <ul className="flex-1 px-3">{children}</ul>
      </SidebarContext.Provider>

      <div className="flex border-t border-gray-700 p-3">
        <img
          src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
          alt=""
          className="h-10 w-10 rounded-md"
        />
        <div
          className={`
              flex items-center justify-between
              overflow-hidden transition-all ${expanded ? "ml-3 w-52" : "w-0"}
          `}
        >
          <div className="leading-4">
            <h4 className="text-[1vw] font-semibold text-yellow-400">
              John Doe
            </h4>
            <span className="text-[0.8vw] text-white">johndoe@gmail.com</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
