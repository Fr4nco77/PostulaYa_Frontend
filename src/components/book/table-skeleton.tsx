import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { columns } from "./data";

export default function TableSkeleton() {
  const generateRows = () => {
    const rows = [];
    for (let i = 0; i < 6; i++) {
      rows.push(
        <TableRow key={`row ${i}`}>
          <TableCell>
            <Skeleton className="h-4 w-20 rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-40 rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-40 rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-25 h-4 rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20 rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20 rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20 rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-2 w-10 rounded-lg" />
          </TableCell>
        </TableRow>,
      );
    }
    return rows;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns?.map((column) => {
            return (
              <TableHead key={column}>
                <Skeleton className="h-4 w-20 rounded-lg" />
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>{generateRows()}</TableBody>
    </Table>
  );
}
