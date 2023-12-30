import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./data";
import { ApplicationQuery } from "@/lib/definitions";
import { fetchApplications } from "@/lib/data";
import Actions from "./actions";

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
      <TableCaption>A list of your recent applications.</TableCaption>
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
              <TableCell>{row.modality}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.recluter}</TableCell>
              <TableCell>{row.company_name}</TableCell>
              <TableCell>{row.status}</TableCell>
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
