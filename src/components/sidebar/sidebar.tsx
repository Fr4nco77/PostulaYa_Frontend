import { HTMLAttributes } from "react";
import Image from "next/image";
import Exit from "./button_exit";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import ButtonSkills from "./button_skills";
import MobilMenu from "./menuMobil";

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
        "flex items-center justify-between bg-slate-100 px-6 py-4 shadow-lg lg:flex-col",
        className,
      )}
      {...props}
    >
      <Image
        src="/Logo_simple.svg"
        alt="PostulaYa"
        priority={true}
        width={40}
        height={0}
        className="mx-auto hidden h-auto lg:block"
      />
      <Image
        src="Logo.svg"
        alt="PostulaYa"
        width={157.61}
        height={0}
        priority={true}
        className="h-auto lg:hidden"
      />
      <MobilMenu>
        {children}
        <ButtonSkills token={token} />
        <Exit />
      </MobilMenu>
      <ul className="hidden gap-2 md:flex lg:mt-4 lg:grow lg:flex-col">
        {children}
        <ButtonSkills token={token} />
        <Exit />
      </ul>
      <div className="hidden lg:block">
        <Avatar className="mb-1 border border-[rgb(8,11,28)]">
          <AvatarImage src={userImage} className="h-auto w-full" />
          <AvatarFallback>
            <Skeleton className="h-full w-full rounded-full" />
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
