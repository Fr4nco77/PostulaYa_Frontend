import { fetchAllInterviews } from "@/lib/data/interview";
import Interview from "./interview";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { columns } from "./data";

export default async function Interviews({ query }: { query: string }) {
  const { success, data } = await fetchAllInterviews({ query });

  if (!success) {
    return (
      <div className="flex w-full max-w-7xl grow flex-col items-center justify-center rounded-2xl bg-slate-100 p-3 shadow-xl">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <span>{data.message}</span>
      </div>
    );
  } else if (!data.response.interviews.length) {
    return (
      <div className="flex w-full max-w-7xl grow flex-col items-center justify-center rounded-2xl bg-slate-100 p-3 shadow-xl">
        <h1 className="text-2xl font-bold">No se encontraron coincidencias</h1>
        <span>
          ¡De momento no hay nada por aquí, pero pronto algo aparecera!
        </span>
      </div>
    );
  }

  const { interviews } = data.response;

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
        {interviews?.map((interview: any) => {
          return (
            <TableRow key={interview._id}>
              <TableCell>{interview.company}</TableCell>
              <TableCell>{interview.position}</TableCell>
              <TableCell>{interview.created_at.split("T")[0]}</TableCell>
              <TableCell>
                <Interview interview={interview} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
