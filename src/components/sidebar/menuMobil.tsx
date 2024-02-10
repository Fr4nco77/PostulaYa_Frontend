import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import { ReactNode } from "react";

export default async function MobilMenu({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Image
              src="/Logo.svg"
              alt="PostulaYa"
              width={157.61}
              height={47.98}
              priority
            />
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col py-6 gap-2">{children}</ul>
      </SheetContent>
    </Sheet>
  );
}
