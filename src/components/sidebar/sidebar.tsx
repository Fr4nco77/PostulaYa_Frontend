import { HTMLAttributes } from "react";
import Image from "next/image";
import Exit from "./button_exit";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({
  children,
  className,
  ...props
}: SidebarProps) {
  const userImage = cookies().get("_image")?.value!;

  return (
    <nav
      className={cn("flex flex-col bg-yellow-400 shadow-lg", className)}
      {...props}
    >
      <div className="flex items-center justify-between p-4 pb-2">
        <Image
          src="/Logo_simple.svg"
          alt="PostulaYa logo"
          width={40}
          height={40}
        />
      </div>
      <ul className="mt-4 flex-1 px-3">
        {children}
        <Exit className="mt-4" />
      </ul>
      <div className="flex border-t border-[rgb(8,11,28)] p-3 pl-4">
        <Avatar className="border border-[rgb(8,11,28)]">
          <AvatarImage src={userImage} />
          <AvatarFallback>
            <Skeleton className="h-10 w-10 rounded-full" />
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
