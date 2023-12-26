"use client";

import { ReactNode, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarContext } from "./sidebar";

export default function Item({
  icon,
  text,
  to,
}: {
  icon: ReactNode;
  text: string;
  to: string;
}) {
  const { expanded } = useContext(SidebarContext);
  const pathname = usePathname();

  return (
    <Link className={`link ${pathname !== to ? "active" : ""}`} href={to}>
      <li
        className={`
          group relative my-1 flex cursor-pointer items-center
          rounded-md px-3 py-2
          font-medium transition-colors
          ${
            pathname === to
              ? "bg-yellow-400 text-black"
              : "text-yellow-400 hover:bg-yellow-400 hover:text-black"
          }
      `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "ml-3 w-52" : "w-0"
          }`}
        >
          {text}
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
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
