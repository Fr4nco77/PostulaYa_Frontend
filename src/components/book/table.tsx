import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./data";
import { ApplicationQuery } from "@/lib/definitions";
import { fetchApplications } from "@/lib/data";
import Actions from "./actions";
import { Badge } from "../ui/badge";
import clsx from "clsx";

export default async function ApplicationTable({
  query,
  token,
}: ApplicationQuery) {
  const { success, data } = await fetchApplications({ query, token });

  if (!success) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>{data.name}</h1>
        <p>{data.message}</p>
      </div>
    );
  }

  const { applications } = data.response;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns?.map((column) => {
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
              <TableCell>{row.company_name}</TableCell>
              <TableCell>{row.company_ubication}</TableCell>
              <TableCell>{row.recluter}</TableCell>
              <TableCell>
                <Badge
                  className={clsx({
                    "bg-pink-600": row.modality === "Remoto",
                    "bg-emerald-500": row.modality === "Hibrido",
                    "bg-slate-500": row.modality === "Presencial",
                  })}
                >
                  {row.modality}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={clsx({
                    "bg-blue-800": row.type === "Full-Time",
                    "bg-purple-800": row.type === "Part-Time",
                  })}
                >
                  {row.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={clsx("font-bold text-[rgb(8,11,28)]", {
                    "bg-green-600": row.status === "En Proceso",
                    "bg-red-600": row.status === "Finalizado",
                    "bg-yellow-400": row.status === "Postulado",
                  })}
                >
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
