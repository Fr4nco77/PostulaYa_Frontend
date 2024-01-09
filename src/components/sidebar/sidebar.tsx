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
      className={cn(
        "flex bg-yellow-400 shadow-lg max-md:items-center max-md:justify-between md:flex-col",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center p-2 md:p-4 md:pb-2">
        <Image
          src="/Logo_simple.svg"
          alt="PostulaYa logo"
          width={40}
          height={40}
          className="sm:hidden md:block"
        />
        <Image
          src="/Logo_borderBlack.svg"
          alt="PostulaYa logo"
          width={130}
          height={40}
          className="hidden sm:max-md:block"
        />
      </div>
      <ul className="flex px-3 max-md:items-center max-md:justify-center md:mt-4 md:flex-1 md:flex-col">
        {children}
        <Exit className="ml-6 md:ml-0 md:mt-6" />
      </ul>
      <div className="hidden border-t border-[rgb(8,11,28)] p-3 pl-4 md:flex">
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
