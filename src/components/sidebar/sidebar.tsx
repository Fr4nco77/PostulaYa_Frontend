import { HTMLAttributes } from "react";
import Image from "next/image";
import Exit from "./button_exit";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import ButtonUser from "./button_user";
import ButtonFeedback from "./button_feedback";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({
  children,
  className,
  ...props
}: SidebarProps) {
  const userImage = cookies().get("_image")?.value!;
  const token = cookies().get("authorization")?.value!;

  return (
    <nav
      className={cn(
        "flex bg-yellow-400 shadow-lg max-lg:items-center max-lg:justify-between lg:flex-col",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center p-2 lg:p-4 lg:pb-2">
        <Image
          src="/Logo_simple.svg"
          alt="PostulaYa logo"
          priority
          width={40}
          height={40}
          className="sm:hidden lg:block"
        />
        <Image
          src="/Logo_borderBlack.svg"
          alt="PostulaYa logo"
          priority
          width={130}
          height={40}
          className="hidden sm:max-lg:block"
        />
      </div>
      <ul className="flex items-center max-lg:overflow-x-auto lg:mt-4 lg:grow lg:flex-col">
        {children}
        <ButtonUser token={token} />
        <ButtonFeedback token={token} />
        <Exit className="lg:mt-6" />
      </ul>
      <div className="hidden border-t border-[rgb(8,11,28)] p-3 pl-4 lg:flex">
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
