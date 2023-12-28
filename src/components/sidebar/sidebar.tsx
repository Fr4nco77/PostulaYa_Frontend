"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Exit from "./button_exit";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Cookie from "js-cookie";
export const SidebarContext = createContext();

export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const name = Cookie.get("_username");
    const email = Cookie.get("_email");
    const image = Cookie.get("_image");

    if (name && email && image) {
      setUserInfo({
        name,
        email,
        image,
      });
    }
  }, []);

  const { name, email, image } = userInfo;

  return (
    <nav className="absolute z-10 flex h-full flex-col border-r bg-[#181818] shadow-sm">
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
        <ul className="mt-4 flex-1 px-3">
          {children}
          <Exit />
        </ul>
      </SidebarContext.Provider>

      <div className="flex border-t border-gray-700 p-3 pl-4">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>
            <Skeleton className="h-10 w-10 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div
          className={`
              flex items-center justify-between
              overflow-hidden transition-all ${expanded ? "ml-3 w-52" : "w-0"}
          `}
        >
          <div className="leading-4">
            {name ? (
              <h4 className="text-sm font-semibold text-yellow-400">{name}</h4>
            ) : (
              <Skeleton className="h-3 w-44 rounded-md" />
            )}
            {email ? (
              <span className="text-sm text-white">{email}</span>
            ) : (
              <Skeleton className="mt-2 h-3 w-52 rounded-md" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
