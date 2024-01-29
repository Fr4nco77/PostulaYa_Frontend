import { fetchApplicationsMetrics } from "@/lib/data/metrics";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Skeleton } from "../ui/skeleton";

interface ApplicationsProps extends HTMLAttributes<HTMLDivElement> {
  token: string;
}

export default async function Applications({
  className,
  token,
  ...props
}: ApplicationsProps) {
  const { success, data } = await fetchApplicationsMetrics({ token });

  if (!success) {
    return (
      <div className={cn(className)} {...props}>
        <Skeleton className="h-full w-full" />
      </div>
    );
  }
  const {
    total,
    totalInterviews,
    averagePostulationsPerDay,
    averageResponseTime,
  } = data.response;

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl bg-slate-100 p-3 shadow-lg",
        className,
      )}
      {...props}
    >
      <span>
        <strong>Total de postulaciones: </strong> {total}
      </span>
      <span>
        <strong>Entrevistas totales: </strong> {totalInterviews}
      </span>
      <span>
        <strong>Promedio diario de Postulaciones: </strong>{" "}
        {averagePostulationsPerDay}
      </span>
      <span>
        <strong>Tiempo promedio de respuesta: </strong>
        {averageResponseTime} dia/s
      </span>
    </div>
  );
}
