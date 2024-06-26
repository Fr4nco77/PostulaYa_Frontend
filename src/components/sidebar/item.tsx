"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Item({
  icon,
  text,
  to,
}: {
  icon: ReactNode;
  text: string;
  to: string;
}) {
  const pathname = usePathname();

  return (
    <Link className={`link ${pathname !== to ? "active" : ""}`} href={to}>
      <li
        className={`
          group relative flex cursor-pointer items-center
          rounded-md px-3 py-2
          font-medium transition-colors
          ${
            pathname === to
              ? "bg-[rgb(8,11,28)] text-yellow-400"
              : "md:text-[rgb(8,11,28)] md:hover:bg-[rgb(8,11,28)] md:hover:text-yellow-400"
          }
      `}
      >
        {icon}
        <div className="ml-6 md:hidden">{text}</div>
        <div
          className="invisible absolute left-full z-10 ml-6 hidden -translate-x-3 rounded-md
            bg-[rgb(8,11,28)] px-2 py-1 text-sm text-yellow-400 opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 lg:block"
        >
          {text}
        </div>
      </li>
    </Link>
  );
}
