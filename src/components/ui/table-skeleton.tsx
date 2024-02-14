import { Skeleton } from "./skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export default function TableSkeleton({
  rowCount,
  cellCount,
  displayHeader,
}: {
  rowCount: number;
  cellCount: number;
  displayHeader: boolean;
}) {
  const rows = [];

  // Generar filas del cuerpo de la tabla
  for (let i = 0; i < rowCount; i++) {
    const cells = [];

    for (let j = 0; j < cellCount; j++) {
      cells.push(
        <TableCell key={`cell ${j}`} className="h-[73px] xl:h-[62px]">
          <Skeleton className="h-3 w-28 rounded-xl" />
        </TableCell>,
      );
    }

    rows.push(<TableRow key={`row ${i}`}>{cells}</TableRow>);
  }

  // Generar la fila de encabezado
  const headerRow = displayHeader && (
    <TableHeader>
      <TableRow>
        {Array.from({ length: cellCount }, (_, index) => (
          <TableHead key={`head ${index}`}>
            <Skeleton className="h-3 w-16 rounded-lg" />
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );

  return (
    <Table>
      {headerRow}
      <TableBody>{rows}</TableBody>
    </Table>
  );
}
