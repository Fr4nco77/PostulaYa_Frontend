import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columnsBook } from "@/lib/dataComponents";
import { ApplicationQuery } from "@/lib/definitions";
import { fetchApplications } from "@/lib/data/application";
import Actions from "./actions";
import { Badge } from "../ui/badge";
import clsx from "clsx";
import {
  Building,
  CheckCircle2,
  Clock4,
  Home,
  Timer,
  TimerOff,
  XCircle,
} from "lucide-react";

export default async function ApplicationTable({
  query,
  token,
}: ApplicationQuery) {
  const { success, data } = await fetchApplications({ query, token });

  if (!success) {
    return (
      <div className="flex w-full grow flex-col items-center justify-center rounded-md bg-slate-100 p-3 shadow-xl">
        <h1 className="text-4xl font-black">{data.name}</h1>
        <span>{data.message}</span>
      </div>
    );
  } else if (!data.response.applications.length) {
    return (
      <div className="flex w-full grow flex-col items-center justify-center rounded-md bg-slate-100 p-3 shadow-xl">
        <h1 className="text-4xl font-black">No se encontraron coincidencias</h1>
        <span>¡Anímate a aplicar y forma parte de nuestro equipo!</span>
      </div>
    );
  }

  const { applications } = data.response;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columnsBook?.map((column) => {
            return <TableHead key={column}>{column}</TableHead>;
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications?.map((row: any) => {
          return (
            <TableRow key={row._id}>
              <TableCell>{row.created_at.split("T")[0]}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>
                <Badge
                  className={clsx("max-h-7 w-auto cursor-default", {
                    "bg-purple-200 text-purple-600 hover:bg-purple-200":
                      row.modality === "Remoto",
                    "bg-orange-200 text-orange-600 hover:bg-orange-200":
                      row.modality === "Hibrido",
                    "bg-slate-200 text-slate-600 hover:bg-slate-200":
                      row.modality === "Presencial",
                  })}
                >
                  {row.modality === "Remoto" ? (
                    <Home className="mr-1 max-h-5 w-auto" />
                  ) : (
                    <Building className="mr-1 max-h-5 w-auto" />
                  )}
                  {row.modality}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={clsx("max-h-7 w-auto cursor-default", {
                    "bg-blue-200 text-blue-600 hover:bg-blue-200":
                      row.type === "Full-Time",
                    "bg-gray-200 text-gray-600 hover:bg-gray-200":
                      row.type === "Part-Time",
                  })}
                >
                  {row.type === "Full-Time" ? (
                    <Timer className="mr-1 max-h-5 w-auto" />
                  ) : (
                    <TimerOff className="mr-1 max-h-5 w-auto" />
                  )}
                  {row.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={clsx("max-h-7 w-auto cursor-default", {
                    "bg-green-200 text-green-600 hover:bg-green-200":
                      row.status === "En Proceso",
                    "bg-red-200 text-red-600 hover:bg-red-200":
                      row.status === "Finalizado",
                    "bg-yellow-300 text-slate-600 hover:bg-yellow-300":
                      row.status === "Postulado",
                  })}
                >
                  {row.status === "En Proceso" ? (
                    <Clock4 className="mr-1 max-h-5 w-auto" />
                  ) : row.status === "Finalizado" ? (
                    <XCircle className="mr-1 max-h-5 w-auto" />
                  ) : (
                    <CheckCircle2 className="mr-1 max-h-5 w-auto" />
                  )}
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Actions token={token} applicationID={row._id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
