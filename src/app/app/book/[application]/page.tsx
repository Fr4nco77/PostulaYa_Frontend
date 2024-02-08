import { DeleteApplication } from "@/components/book/application/button-deleteApplication";
import EditApplication from "@/components/book/application/button-editApplication";
import Skills from "@/components/book/application/skills/skills";
import Interviews from "@/components/book/application/interview/interview";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchApplicationByID } from "@/lib/data/application";
import clsx from "clsx";
import {
  Building,
  CheckCircle2,
  ChevronLeft,
  Clock4,
  Home,
  Timer,
  TimerOff,
  XCircle,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postulación",
};

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
    notFound();
  }

  const {
    _id,
    position,
    modality,
    category,
    type,
    recluter,
    company,
    location,
    platform,
    url,
    status,
    skills,
    created_at,
    updated_at,
  } = data.response.application;

  return (
    <div className="flex w-full flex-col justify-center gap-3 md:flex-row">
      <div className="flex w-full flex-col items-center md:max-w-sm lg:max-w-lg">
        <header className=" flex w-full items-center justify-between">
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
        <main className="mt-1 flex w-full flex-col gap-2 rounded-lg bg-slate-100 p-3 shadow-xl">
          <div className="flex w-full items-start justify-between text-clip">
            <h1 className="text-4xl font-black text-slate-900">{position}</h1>
          </div>
          <Separator className="bg-slate-300" />
          <span>
            <strong>Empresa: </strong>
            {` ${company}`}
          </span>
          <span>
            <strong>Ubicacion:</strong> {` ${location}`}
          </span>
          <span>
            <strong>Reclutador:</strong> {` ${recluter}`}
          </span>
          <span>
            <strong>Rubro: </strong>
            {` ${category}`}
          </span>
          <span>
            <strong>Plataforma usada:</strong> {` ${platform}`}
          </span>
          <Link
            href={url}
            target="_blank"
            className="text-blue-600 hover:text-blue-500"
          >
            Mas Informacion...
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={clsx("max-h-7 cursor-default", {
                "bg-green-200 text-green-600 hover:bg-green-200":
                  status === "En Proceso",
                "bg-red-200 text-red-600 hover:bg-red-200":
                  status === "Finalizado",
                "bg-yellow-300 text-slate-600 hover:bg-yellow-300":
                  status === "Postulado",
              })}
            >
              {status === "En Proceso" ? (
                <Clock4 className="mr-1 max-h-5 w-auto" />
              ) : status === "Finalizado" ? (
                <XCircle className="mr-1 max-h-5 w-auto" />
              ) : (
                <CheckCircle2 className="mr-1 max-h-5 w-auto" />
              )}
              {status}
            </Badge>
            <Badge
              className={clsx("max-h-7 w-auto cursor-default", {
                "bg-purple-200 text-purple-600 hover:bg-purple-200":
                  modality === "Remoto",
                "bg-orange-200 text-orange-600 hover:bg-orange-200":
                  modality === "Hibrido",
                "bg-slate-200 text-slate-600 hover:bg-slate-200":
                  modality === "Presencial",
              })}
            >
              {modality === "Remoto" ? (
                <Home className="mr-1 max-h-5 w-auto" />
              ) : (
                <Building className="mr-1 max-h-5 w-auto" />
              )}
              {modality}
            </Badge>
            <Badge
              className={clsx("max-h-7 w-auto cursor-default", {
                "bg-blue-200 text-blue-600 hover:bg-blue-200":
                  type === "Full-Time",
                "bg-gray-200 text-gray-600 hover:bg-gray-200":
                  type === "Part-Time",
              })}
            >
              {type === "Full-Time" ? (
                <Timer className="mr-1 max-h-5 w-auto" />
              ) : (
                <TimerOff className="mr-1 max-h-5 w-auto" />
              )}
              {type}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Fecha:</strong> {` ${created_at.split("T")[0]}`}
            </span>
            <span>
              <strong>Ultima actualizacion:</strong>{" "}
              {` ${updated_at.split("T")[0]}`}
            </span>
          </div>
        </main>
        <Skills
          className="mt-3 w-full rounded-lg bg-slate-100 shadow-xl"
          skills={skills}
          token={token}
          applicationID={_id}
        />
      </div>
      <Interviews
        token={token}
        application={_id}
        position={position}
        company={company}
        className="flex h-full w-full flex-col md:mt-10 md:max-w-sm"
      />
    </div>
  );
}
