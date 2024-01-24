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
import { columns } from "./data";
import { fetchAllApplications } from "@/lib/data/application";
import { Badge } from "../ui/badge";
import clsx from "clsx";
import { Info } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function ApplicationTable({ query }: { query: string }) {
  const { success, data } = await fetchAllApplications({ query });

  if (!success) {
    return (
      <div className="flex w-full max-w-7xl grow flex-col items-center justify-center rounded-2xl bg-slate-100 p-3 shadow-xl">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <span>{data.message}</span>
      </div>
    );
  } else if (!data.response.applications.length) {
    return (
      <div className="flex w-full max-w-7xl grow flex-col items-center justify-center rounded-2xl bg-slate-100 p-3 shadow-xl">
        <h1 className="text-2xl font-medium">
          No se encontraron coincidencias
        </h1>
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
                    <TooltipTrigger>
                      <Info />
                    </TooltipTrigger>
                    <TooltipContent className="flex max-w-xs flex-wrap items-center justify-evenly gap-1 border-slate-900 bg-yellow-400">
                      {application.skills.map(
                        ({ _id, name }: { _id: string; name: string }) => {
                          return <Badge key={_id}>{name}</Badge>;
                        },
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Badge
                  className={clsx({
                    "bg-pink-600": application.modality === "Remoto",
                    "bg-emerald-500": application.modality === "Hibrido",
                    "bg-slate-500": application.modality === "Presencial",
                  })}
                >
                  {application.modality}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={clsx({
                    "bg-blue-800": application.type === "Full-Time",
                    "bg-purple-800": application.type === "Part-Time",
                  })}
                >
                  {application.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Link href={application.url} target="_blank">
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-yellow-400"
                  >
                    PostulaYa
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
