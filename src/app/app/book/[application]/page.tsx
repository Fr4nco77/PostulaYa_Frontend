import { DeleteApplication } from "@/components/book/application/button-deleteApplication";
import EditApplication from "@/components/book/application/button-editApplication";
import Skills from "@/components/book/application/skills";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchApplicationByID } from "@/lib/data/application";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Application({
  params,
}: {
  params: { application: string };
}) {
  const token = cookies().get("authorization")?.value!;
  const { success, data } = await fetchApplicationByID({
    token,
    application: params.application,
  });

  if (!success) {
    return (
      <>
        <h1>{data.name}</h1>
        <p>{data.message}</p>
      </>
    );
  }

  const {
    _id,
    position,
    modality,
    type,
    recluter,
    company_name,
    company_ubication,
    platform,
    url,
    status,
    skills,
    created_at,
    updated_at,
  } = data.response.application;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 py-5 md:flex-row">
      <div className="flex w-full flex-col items-center gap-3 md:max-w-sm lg:max-w-md">
        <header className="flex w-full items-center justify-between">
          <Link
            href="/app/book"
            className={`${buttonVariants({
              variant: "ghost",
              size: "sm",
            })} rounded-3xl hover:bg-slate-200`}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Volver
          </Link>
          <div className="flex items-center">
            <EditApplication
              token={token}
              application={data.response.application}
            />
            <DeleteApplication token={token} applicationID={_id} />
          </div>
        </header>
        <main className="flex w-full flex-col gap-2 rounded-lg bg-slate-100 p-3 shadow-xl">
          <div className="flex w-full gap-3">
            <h1 className="text-3xl font-bold">{position}</h1>
            <Badge
              className={clsx("font-bold text-slate-900", {
                "bg-green-600 hover:bg-green-500": status === "En Proceso",
                "bg-red-600 hover:bg-red-500": status === "Finalizado",
                "bg-yellow-400 hover:bg-yellow-300": status === "Postulado",
              })}
            >
              {status}
            </Badge>
          </div>
          <Separator className="bg-gray-500" />
          <span>
            Empresa: <strong>{company_name}</strong>
          </span>
          <span className="col-span-2">
            Ubicacion: <strong>{company_ubication}</strong>
          </span>
          <span className="col-span-2">
            Reclutador: <strong>{recluter}</strong>
          </span>
          <div className="grid grid-cols-4 items-center">
            <span className="col-span-2">
              Modalidad: <strong>{modality}</strong>
            </span>
            <span className="col-span-2">
              Tipo: <strong>{type}</strong>
            </span>
          </div>
          <span>
            Plataforma usada: <strong>{platform}</strong>
          </span>
          <Link
            href={url}
            target="_blank"
            className="text-indigo-700 hover:text-indigo-500"
          >
            Mas Informacion...
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span>
              Creacion: <strong>{created_at.split("T")[0]}</strong>
            </span>
            <span>
              Ultima actualizacion: <strong>{updated_at.split("T")[0]}</strong>
            </span>
          </div>
        </main>
        <Skills
          className="w-full rounded-lg bg-slate-100 shadow-xl"
          skills={skills}
          token={token}
          applicationID={_id}
        />
      </div>
      {/* <div className="flex w-full flex-col gap-3 md:max-w-sm md:flex-col-reverse">
        
      </div> */}
    </div>
  );
}
