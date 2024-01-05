import { DeleteApplication } from "@/components/book/application/button-deleteApplication";
import EditApplication from "@/components/book/application/button-editApplication";
import CreateNote from "@/components/book/application/createNote";
import Notes from "@/components/book/application/notes";
import Skills from "@/components/book/application/skills";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { fetchApplicationByID } from "@/lib/data";
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
    <div className="flex h-screen w-full items-center justify-center">
      <div className="mx-24 flex h-5/6 w-full rounded-lg bg-yellow-500 p-10">
        <main className="flex h-full w-1/2 flex-col items-start justify-start">
          <div className="flex w-full items-start">
            <h1 className="text-5xl font-bold">{position}</h1>
            <Badge className="ml-3 font-bold text-yellow-400">{status}</Badge>
          </div>
          <Separator className="my-3 bg-black" />
          <div className="mb-2 flex w-full">
            <span className="text-md">
              Empresa: <strong className="text-lg">{company_name}</strong>
            </span>
            <Separator orientation="vertical" className="mx-4 bg-black" />
            <span className="text-md">
              Ubicacion:{" "}
              <strong className="text-lg">{company_ubication}</strong>
            </span>
          </div>
          <span className="text-md mb-2">
            Reclutador: <strong className="text-lg">{recluter}</strong>
          </span>
          <div className="mb-2 flex w-full">
            <span className="text-md">
              Modalidad: <strong className="text-lg">{modality}</strong>
            </span>
            <Separator orientation="vertical" className="mx-2 bg-black" />
            <span className="text-md">
              Tipo: <strong className="text-lg">{type}</strong>
            </span>
          </div>
          <div className="mb-2 flex w-full">
            <span className="text-md">
              Postulacion:{" "}
              <strong className="text-lg">{created_at.split("T")[0]}</strong>
            </span>
            <Separator orientation="vertical" className="mx-2 bg-black" />
            <span className="text-md">
              Ultima actualizacion:{" "}
              <strong className="text-lg">{updated_at.split("T")[0]}</strong>
            </span>
          </div>
          <span className="text-md mb-2">
            Plataforma de postulacion:{" "}
            <strong className="text-lg">{platform}</strong>
          </span>
          <span className="text-md mb-2">
            Más informacion:{" "}
            {url !== "N/A" ? (
              <Link
                href={url}
                target="_blank"
                className="text-lg underline hover:text-white"
              >
                {url}
              </Link>
            ) : (
              <span>{url}</span>
            )}
          </span>
          <Skills skills={skills} token={token} />
          <div className="flex w-full items-center justify-end gap-5">
            <EditApplication
              token={token}
              application={data.response.application}
            />
            <DeleteApplication token={token} applicationID={_id} />
          </div>
        </main>
        <Separator orientation="vertical" className="mx-3 bg-black" />
        <aside className="h-full w-1/2">
          <Notes applicationID={_id} />
          <CreateNote applicationID={_id} />
        </aside>
      </div>
    </div>
  );
}
