import CreateApplication from "@/components/book/button-create";
import { Briefcase } from "lucide-react";

export default function CardApplication({
  data,
  token,
}: {
  data: string;
  token: string;
}) {
  return (
    <article className="relative flex rounded-lg bg-slate-50  px-5 py-4 text-slate-900 shadow-md">
      <div className="my-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-900">
        <Briefcase className="h-8 w-8 text-yellow-400" />
      </div>
      <div className="my-auto ml-4 flex grow flex-col text-sm font-bold ">
        <span>Postulaciones</span>
        <span className="text-3xl font-black">{data}</span>
      </div>
      <div className="z-11 absolute right-1 top-1 2xl:hidden">
        <CreateApplication token={token} basicStyle={true} />
      </div>
      <div className="z-11 absolute bottom-1 right-1 hidden 2xl:block">
        <CreateApplication token={token} basicStyle={true} />
      </div>
    </article>
  );
}
