import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { User } from "lucide-react";
import { fetchUser } from "@/lib/data/user";
import Form from "./form-skills";

export default async function ButtonUser({ token }: { token: string }) {
  const { data } = await fetchUser({ token });
  const { skills } = data.response;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <li className="group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium text-[rgb(8,11,28)] transition-colors hover:bg-[rgb(8,11,28)] hover:text-yellow-400">
          <User />
          <div
            className="invisible absolute left-full z-10 ml-6 hidden -translate-x-3 rounded-md
            bg-[rgb(8,11,28)] px-2 py-1
            text-sm text-yellow-400 opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 lg:block"
          >
            Habilidades
          </div>
        </li>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Habilidades</SheetTitle>
          <SheetDescription>
            En este apartado podras agregar todas tus habilidades y
            conocimientos
          </SheetDescription>
        </SheetHeader>
        <Form token={token} currentSkills={skills} className="w-full" />
      </SheetContent>
    </Sheet>
  );
}
