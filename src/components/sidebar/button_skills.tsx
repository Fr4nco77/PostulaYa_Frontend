import { Medal } from "lucide-react";
import { fetchUser } from "@/lib/data/user";
import Form from "./form-skills";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function ButtonSkills({ token }: { token: string }) {
  const { success, data } = await fetchUser({ token });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="group relative flex cursor-pointer items-center rounded-md px-3 py-2 font-medium text-[rgb(8,11,28)] transition-colors hover:bg-[rgb(8,11,28)] hover:text-yellow-400">
          <Medal />
          <div className="ml-6 md:hidden">Tus Habilidades</div>
          <div
            className="invisible absolute left-full z-10 ml-6 hidden -translate-x-3 rounded-md
            bg-[rgb(8,11,28)] px-2 py-1
            text-sm text-yellow-400 opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 lg:block"
          >
            Tus Habilidades
          </div>
        </li>
      </DialogTrigger>
      <DialogContent className="bg-slate-50">
        <DialogHeader>
          <DialogTitle className="flex items-end text-slate-900">
            <Medal className="mr-2 h-full w-auto max-h-9" />
            <span className="font-black text-4xl">Tus Habilidades</span>
          </DialogTitle>
          <DialogDescription>
            Edita y personaliza tu lista de habilidades según tu evolución
            profesional. Destaca tus fortalezas y mantén tu perfil siempre
            actualizado.
          </DialogDescription>
        </DialogHeader>
        <Form token={token} currentSkills={success ? data.response.skills : []} />
      </DialogContent>
    </Dialog>
  );
}
