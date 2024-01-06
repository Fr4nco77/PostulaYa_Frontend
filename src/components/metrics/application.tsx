import { fetchApplicationsMetrics } from "@/lib/data";

export default async function Applications({ token }: { token: string }) {
  const { success, data } = await fetchApplicationsMetrics({ token });

  if (!success) {
    return (
      <div>
        <h1>{data.name}</h1>
        <span>{data.message}</span>
      </div>
    );
  }
  const {
    total,
    averagePostulationsPerDay,
    fullTimeApplications,
    partTimeApplications,
  } = data.response;

  return (
    <div className="flex flex-col flex-wrap">
      <span>Total de postulaciones: {total}</span>
      <span>Promedio diario de Postulaciones: {averagePostulationsPerDay}</span>
      <span>Porcentaje de Postulaciones Full-Time: {fullTimeApplications}</span>
      <span>Porcentaje de Postulaciones Part-Time: {partTimeApplications}</span>
    </div>
  );
}
