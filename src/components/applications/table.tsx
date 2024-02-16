import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchAllApplications } from "@/lib/data/application";
import { Badge } from "../ui/badge";
import clsx from "clsx";
import { Building, ClipboardList, Home, Timer, TimerOff } from "lucide-react";
import { modalitysNames, modalitysValues } from "@/lib/dataComponents";
import Actions from "./actions";
import { cookies } from "next/headers";

export default async function ApplicationTable({ query }: { query: string }) {
  const token = cookies().get("authorization")?.value!;
  const { success, data } = await fetchAllApplications({ query });

  if (!success) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center rounded-lg bg-slate-50 px-5 py-3 shadow-md lg:grow">
        <h1 className="text-4xl font-black">{data.name}</h1>
        <span className="p-3 text-lg font-medium text-gray-500">
          {data.message}
        </span>
      </div>
    );
  } else if (!data.response.applications.length) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center rounded-lg bg-slate-50 px-5 py-3 shadow-md lg:grow">
        <h1 className="text-4xl font-black">No se encontraron vacantes</h1>
      </div>
    );
  }

  const { applications } = data.response;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            colSpan={8}
            className="cursor-default rounded-tl-lg rounded-tr-lg p-4 text-3xl font-black text-slate-900 md:text-4xl"
          >
            Vacantes Disponibles
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications?.map((application: any) => {
          return (
            <TableRow key={application._id}>
              <TableCell>{application.created_at.split("T")[0]}</TableCell>
              <TableCell>{application.position}</TableCell>
              <TableCell>{application.company}</TableCell>
              <TableCell>{application.location}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="group relative">
                      <ClipboardList className="text-slate-600 transition duration-300 hover:text-slate-400" />
                      <div className="absolute right-0 top-0 group-hover:hidden">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex h-full w-full rounded-full bg-sky-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="flex max-w-xs flex-col gap-2 border-slate-600 bg-slate-50">
                      <h4 className="text-lg font-black text-slate-900">
                        Habilidades Requeridas
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {application.skills.map(
                          ({ _id, name }: { _id: string; name: string }) => {
                            return (
                              <Badge
                                key={_id}
                                className="max-h-7 w-auto cursor-default transition duration-300 hover:bg-slate-900 hover:text-yellow-400"
                              >
                                {name}
                              </Badge>
                            );
                          },
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Badge
                  className={clsx("max-h-7 w-auto cursor-default", {
                    "bg-purple-200 text-purple-600 hover:bg-purple-200":
                      application.modality === "Remote",
                    "bg-orange-200 text-orange-600 hover:bg-orange-200":
                      application.modality === "Hybrid",
                    "bg-slate-200 text-slate-600 hover:bg-slate-200":
                      application.modality === "In-person",
                  })}
                >
                  {application.modality === "Remote" ? (
                    <Home className="mr-1 max-h-5 w-auto" />
                  ) : (
                    <Building className="mr-1 max-h-5 w-auto" />
                  )}
                  {
                    modalitysNames[
                      modalitysValues.indexOf(application.modality)
                    ]
                  }
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={clsx("max-h-7 w-auto cursor-default", {
                    "bg-blue-200 text-blue-600 hover:bg-blue-200":
                      application.workday === "Full-Time",
                    "bg-gray-200 text-gray-600 hover:bg-gray-200":
                      application.workday === "Part-Time",
                  })}
                >
                  {application.workday === "Full-Time" ? (
                    <Timer className="mr-1 max-h-5 w-auto" />
                  ) : (
                    <TimerOff className="mr-1 max-h-5 w-auto" />
                  )}
                  {application.workday}
                </Badge>
              </TableCell>
              <TableCell>
                <Actions application={application} token={token} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
