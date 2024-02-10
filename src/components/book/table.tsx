import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  columnsBook,
  modalitysNames,
  modalitysValues,
  statusNames,
  statusValues,
} from "@/lib/dataComponents";
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
        {applications?.map((application: any) => {
          return (
            <TableRow key={application._id}>
              <TableCell>{application.created_at.split("T")[0]}</TableCell>
              <TableCell>{application.position}</TableCell>
              <TableCell>{application.company}</TableCell>
              <TableCell>{application.location}</TableCell>
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
                <Badge
                  className={clsx("max-h-7 w-auto cursor-default", {
                    "bg-green-200 text-green-600 hover:bg-green-200":
                      application.status === "In Progress",
                    "bg-red-200 text-red-600 hover:bg-red-200":
                      application.status === "Completed",
                    "bg-yellow-300 text-slate-600 hover:bg-yellow-300":
                      application.status === "Applied",
                  })}
                >
                  {application.status === "In Progress" ? (
                    <Clock4 className="mr-1 max-h-5 w-auto" />
                  ) : application.status === "Completed" ? (
                    <XCircle className="mr-1 max-h-5 w-auto" />
                  ) : (
                    <CheckCircle2 className="mr-1 max-h-5 w-auto" />
                  )}
                  {statusNames[statusValues.indexOf(application.status)]}
                </Badge>
              </TableCell>
              <TableCell>
                <Actions token={token} applicationID={application._id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
