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
      role="navigation"
      className={cn(
        "flex items-center justify-between bg-slate-100 px-6 py-4 shadow-lg lg:flex-col lg:px-4",
        className,
      )}
      {...props}
    >
      <Image
        src="/Logo.svg"
        alt="PostulaYa"
        width={157.61}
        height={47.98}
        priority
        className="lg:hidden"
      />
      <Image
        src="/Logo_simple.svg"
        alt="PostulaYa"
        width={40}
        height={40}
        priority
        className="mx-auto hidden lg:block"
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
        <Avatar className="mb-1 border border-slate-600">
          <AvatarImage
            src={userImage}
            alt="User Image"
            className="h-auto w-full"
          />
          <AvatarFallback>
            <Skeleton className="h-full w-full rounded-full" />
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
